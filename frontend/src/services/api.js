const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5001'

export const optimizePrompt = async (prompt, domain = null) => {
  try {
    const response = await fetch(`${API_URL}/api/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, domain })
    })
    if (!response.ok) throw new Error('Failed to optimize prompt')
    return await response.json()
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
