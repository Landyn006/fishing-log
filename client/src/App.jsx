import { useEffect, useState } from 'react'
import {
  getTrips,
  saveTrip,
  getCatches,
  saveCatch
} from './api'
import './App.css'

function App() {
  const [trips, setTrips] = useState([])
  const [catches, setCatches] = useState([])

  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')

  const [selectedTripId, setSelectedTripId] = useState('')
  const [species, setSpecies] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')

  const [message, setMessage] = useState('Loading fishing log...')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const [savedTrips, savedCatches] = await Promise.all([
          getTrips(),
          getCatches()
        ])

        setTrips(savedTrips)
        setCatches(savedCatches)

        if (savedTrips.length > 0) {
          setSelectedTripId(String(savedTrips[0].id))
        }

        setMessage('')
      } catch (error) {
        setMessage('Could not connect to the fishing database.')
      }
    }

    loadData()
  }, [])

  async function addTrip(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const newTrip = await saveTrip({ date, location })

      setTrips((previousTrips) => [newTrip, ...previousTrips])
      setSelectedTripId(String(newTrip.id))
      setDate('')
      setLocation('')
      setMessage('Fishing trip saved successfully!')
    } catch (error) {
      setMessage('Unable to save trip. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function addCatch(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const newCatch = await saveCatch({
        trip_id: Number(selectedTripId),
        species,
        weight,
        length
      })

      const selectedTrip = trips.find(
        (trip) => trip.id === Number(selectedTripId)
      )

      setCatches((previousCatches) => [
        {
          ...newCatch,
          date: selectedTrip.date,
          location: selectedTrip.location
        },
        ...previousCatches
      ])

      setSpecies('')
      setWeight('')
      setLength('')
      setMessage('Fish catch saved successfully!')
    } catch (error) {
      setMessage('Unable to save fish catch. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎣 Fishing Log</h1>
        <p>Your personal fishing journal</p>
      </header>

      <main className="container">
        <section className="welcome">
          <h2>Welcome, Angler!</h2>
          <p>
            Keep track of your fishing adventures, trips, and catches.
          </p>
        </section>

        <section className="card">
          <h2>Record a Fishing Trip</h2>

          <form onSubmit={addTrip}>
            <label htmlFor="date">Fishing Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />

            <label htmlFor="location">Fishing Location</label>
            <input
              id="location"
              type="text"
              placeholder="Enter lake, river, or location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Fishing Trip'}
            </button>
          </form>
        </section>

        <section className="card">
          <h2>Record a Fish Catch</h2>

          {trips.length === 0 ? (
            <p>Please record a fishing trip before adding a catch.</p>
          ) : (
            <form onSubmit={addCatch}>
              <label htmlFor="trip">Select Fishing Trip</label>
              <select
                id="trip"
                value={selectedTripId}
                onChange={(event) => setSelectedTripId(event.target.value)}
                required
              >
                {trips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.location} - {trip.date}
                  </option>
                ))}
              </select>

              <label htmlFor="species">Fish Species</label>
              <input
                id="species"
                type="text"
                placeholder="Example: Bass"
                value={species}
                onChange={(event) => setSpecies(event.target.value)}
                required
              />

              <label htmlFor="weight">Weight (lbs)</label>
              <input
                id="weight"
                type="number"
                min="0"
                step="any"
                placeholder="Enter weight"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />

              <label htmlFor="length">Length (inches)</label>
              <input
                id="length"
                type="number"
                min="0"
                step="any"
                placeholder="Enter length"
                value={length}
                onChange={(event) => setLength(event.target.value)}
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Fish Catch'}
              </button>
            </form>
          )}
        </section>

        {message && <p>{message}</p>}

        <section className="card">
          <h2>My Fishing Trips</h2>

          {trips.length === 0 ? (
            <p className="empty">No fishing trips recorded yet.</p>
          ) : (
            <div className="trip-list">
              {trips.map((trip) => (
                <article className="trip" key={trip.id}>
                  <h3>{trip.location}</h3>
                  <p>Date: {trip.date}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <h2>My Fish Catches</h2>

          {catches.length === 0 ? (
            <p className="empty">No fish catches recorded yet.</p>
          ) : (
            <div className="trip-list">
              {catches.map((fish) => (
                <article className="trip" key={fish.id}>
                  <h3>{fish.species}</h3>
                  <p>Weight: {fish.weight ?? 'Not recorded'} lbs</p>
                  <p>Length: {fish.length ?? 'Not recorded'} inches</p>
                  <p>Trip location: {fish.location}</p>
                  <p>Trip date: {fish.date}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>Fishing Log | Track every adventure.</p>
      </footer>
    </div>
  )
}

export default App