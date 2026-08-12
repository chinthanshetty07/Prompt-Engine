const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5001'

export const optimizePrompt = async (prompt) => {
  try {
    const response = await fetch(`${API_URL}/api/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })
    const data = await response.json()
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
