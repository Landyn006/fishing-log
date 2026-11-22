
const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const path = require('path')

const app = express()
const PORT = 3000

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

app.listen(PORT, () => {
  console.log(`Fishing Log API running at http://localhost:${PORT}`)
})
