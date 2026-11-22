
import { useState } from 'react'
import './App.css'

function App() {
  const [trips, setTrips] = useState([])
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')

  function addTrip(event) {
    event.preventDefault()

    if (!date || !location.trim()) {
      return
    }

    const newTrip = {
      id: Date.now(),
      date,
      location
    }

    setTrips([...trips, newTrip])
    setDate('')
    setLocation('')
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
          <p>Keep track of your fishing adventures, trips, and catches.</p>
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

            <button type="submit">Save Fishing Trip</button>
          </form>
        </section>

        <section className="card">
          <h2>My Fishing Trips</h2>

          {trips.length === 0 ? (
            <p className="empty">
              No fishing trips recorded yet. Add your first trip above!
            </p>
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
      </main>

      <footer>
        <p>Fishing Log | Track every adventure.</p>
      </footer>
    </div>
  )
}

export default App
