import { useState, useEffect } from 'react'
import { usePrompt } from './context/PromptContext'
import { optimizePrompt, getHistory } from './services/api'
import { InputColumn } from './components/InputColumn'
import { OutputColumn } from './components/OutputColumn'
import './styles/layout.css'
import './styles/App.css'

function App() {
  const {
    inputPrompt,
    setOptimizedPrompt,
    setLoading,
    setError,
    history,
    setHistory
  } = usePrompt()

  useEffect(() => {
    // Load history on component mount
    const loadHistory = async () => {
      try {
        const data = await getHistory()
        setHistory(data)
      } catch (err) {
        console.error('Failed to load history:', err)
      }
    }
    loadHistory()
  }, [setHistory])

  const handleOptimize = async () => {
    if (!inputPrompt.trim()) {
      setError('Please enter a prompt first')
      return
    }

    setLoading(true)
    setError(null)
    setOptimizedPrompt('')

    try {
      const result = await optimizePrompt(inputPrompt)
      setOptimizedPrompt(result.optimizedPrompt)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Prompt Engine</h1>
          <p>Improve coding and software engineering prompts with AI</p>
        </div>
      </header>

      <main className="app-main">
        <div className="columns-container">
          <InputColumn />
          <OutputColumn />
        </div>

        <div className="action-section">
          <button
            className="optimize-button"
            onClick={handleOptimize}
          >
            Optimize Prompt
          </button>
        </div>
      </main>

      <footer className="app-footer">
      <p>Built for coding and software engineering | Powered by AI</p>
      </footer>
    </div>
  )
}

export default App
