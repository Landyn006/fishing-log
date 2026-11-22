
const API_URL = 'http://localhost:3000/api'

export async function getTrips() {
  const response = await fetch(`${API_URL}/trips`)

  if (!response.ok) {
    throw new Error('Could not load fishing trips.')
  }

  return response.json()
}

export async function saveTrip(trip) {
  const response = await fetch(`${API_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trip)
  })

  if (!response.ok) {
    throw new Error('Could not save fishing trip.')
  }

  return response.json()
}
