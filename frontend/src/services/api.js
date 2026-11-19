// In development, leave this empty so Vite forwards /api to the local backend.
// In production, set VITE_API_URL to the deployed backend origin.
const API_URL = (import.meta.env.VITE_API_URL || '').trim().replace(/\\/$/, '')

async function readApiResponse(response) {
  const raw = await response.text()
  let data

  try {
    data = raw ? JSON.parse(raw) : {}
  } catch {
    const preview = raw.replace(/\\s+/g, ' ').trim().slice(0, 180)
    const location = response.url || 'the configured API URL'
    throw new Error(
      `The API returned a non-JSON response (HTTP ${response.status}) from ${location}. ` +
      `Check VITE_API_URL and make sure it points to the Prompt Engine backend, not the frontend website. ` +
      (preview ? `Response: "${preview}"` : 'The response body was empty.')
    )
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `API request failed (HTTP ${response.status})`)
  }

  return data
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, options)
  } catch (error) {
    throw new Error(`Cannot reach the Prompt Engine API at ${API_URL || 'the local Vite /api proxy'}. Make sure the backend is running. ${error.message}`)
  }
  return readApiResponse(response)
}

export const optimizePrompt = async (prompt) => request('/api/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt })
})

export const getHistory = async () => request('/api/history')

export const deleteHistoryItem = async (id) => request(`/api/history/${encodeURIComponent(id)}`, {
  method: 'DELETE'
})
