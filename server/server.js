
const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Create the SQLite database
const db = new Database(path.join(__dirname, 'fishing-log.db'))

// Create the fishing trips table
db.exec(`
  CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    location TEXT NOT NULL
  )
`)

// Create the fish catches table
db.exec(`
  CREATE TABLE IF NOT EXISTS catches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    species TEXT NOT NULL,
    weight REAL,
    length REAL,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
  )
`)

// Check that the API is running
app.get('/', (req, res) => {
  res.json({ message: 'Fishing Log API is running!' })
})

// Get all fishing trips
app.get('/api/trips', (req, res) => {
  const trips = db.prepare(
    'SELECT * FROM trips ORDER BY date DESC'
  ).all()

  res.json(trips)
})

// Save a fishing trip
app.post('/api/trips', (req, res) => {
  const { date, location } = req.body

  if (!date || !location || !location.trim()) {
    return res.status(400).json({
      error: 'Date and location are required.'
    })
  }

  const result = db.prepare(
    'INSERT INTO trips (date, location) VALUES (?, ?)'
  ).run(date, location.trim())

  const trip = db.prepare(
    'SELECT * FROM trips WHERE id = ?'
  ).get(result.lastInsertRowid)

  res.status(201).json(trip)
})

// Get all fish catches
app.get('/api/catches', (req, res) => {
  const catches = db.prepare(`
    SELECT catches.*, trips.date, trips.location
    FROM catches
    JOIN trips ON catches.trip_id = trips.id
    ORDER BY catches.id DESC
  `).all()

  res.json(catches)
})

// Save a fish catch
app.post('/api/catches', (req, res) => {
  const { trip_id, species, weight, length } = req.body

  if (!trip_id || !species || !species.trim()) {
    return res.status(400).json({
      error: 'A fishing trip and fish species are required.'
    })
  }

  const trip = db.prepare(
    'SELECT * FROM trips WHERE id = ?'
  ).get(trip_id)

  if (!trip) {
    return res.status(404).json({
      error: 'Fishing trip not found.'
    })
  }

  const result = db.prepare(`
    INSERT INTO catches (trip_id, species, weight, length)
    VALUES (?, ?, ?, ?)
  `).run(
    trip_id,
    species.trim(),
    weight === '' || weight == null ? null : Number(weight),
    length === '' || length == null ? null : Number(length)
  )

  const newCatch = db.prepare(
    'SELECT * FROM catches WHERE id = ?'
  ).get(result.lastInsertRowid)

  res.status(201).json(newCatch)
})

// Start the server using the port provided by the hosting platform
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fishing Log API running on port ${PORT}`)
})
