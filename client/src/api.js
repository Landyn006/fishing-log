
const API_URL = import.meta.env.VITE_API_URL || 'https://fishing-log-82968105186.us-east1.run.app/api'

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

// Get all fish catches
export async function getCatches() {
  const response = await fetch(`${API_URL}/catches`)

  if (!response.ok) {
    throw new Error('Could not load fish catches.')
  }

  return response.json()
}

// Save a fish catch
export async function saveCatch(catchData) {
  const response = await fetch(`${API_URL}/catches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(catchData)
  })

  if (!response.ok) {
    throw new Error('Could not save fish catch.')
  }

  return response.json()
}
