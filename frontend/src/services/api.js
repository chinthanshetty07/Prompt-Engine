// Use same-origin relative URLs so Vite's /api proxy works on localhost and on any dev port.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

// Read a JSON reply, and say something useful if the server sent a page instead.
const readJson = async (response) => {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`The server is not reachable right now (HTTP ${response.status}). Please try again later.`)
  }
}

export const optimizePrompt = async (prompt) => {
  try {
    const response = await fetch(`${API_URL}/api/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })
    const data = await readJson(response)
    if (!response.ok) throw new Error(data.error || 'Failed to optimize prompt')
    return data
  } catch (err) {
    throw new Error(err.message || 'API Error')
  }
}

export const getHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/api/history`)
    if (!response.ok) throw new Error('Failed to fetch history')
    return await response.json()
  } catch (err) {
    throw new Error(err.message || 'API Error')
  }
}

export const deleteHistoryItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/history/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete item')
    return await response.json()
  } catch (err) {
    throw new Error(err.message || 'API Error')
  }
}
