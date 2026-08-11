import { useState } from 'react'
import { usePrompt } from '../context/PromptContext'
import '../styles/components.css'

export function OutputColumn() {
  const { optimizedPrompt, loading, error } = usePrompt()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="column output-column">
      <div className="column-header">
        <h3>Optimized Prompt</h3>
        <span className="column-label">Output</span>
      </div>

      <div className="output-content">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Optimizing your prompt...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && optimizedPrompt && (
          <div className="optimized-text-container">
            <button
              className={`tiny-copy-button ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title="Copy prompt"
            >
              {copied ? '✓' : '📋'}
            </button>
            <div className="optimized-text">
              <p>{optimizedPrompt}</p>
            </div>
          </div>
        )}

        {!loading && !error && !optimizedPrompt && (
          <div className="empty-state">
            <p>Your optimized prompt will appear here...</p>
          </div>
        )}
      </div>

      {optimizedPrompt && !loading && (
        <div className="output-actions">
          <button
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}
