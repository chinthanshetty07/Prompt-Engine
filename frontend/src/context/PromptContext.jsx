import { createContext, useContext, useState } from 'react'

const PromptContext = createContext()

export function PromptProvider({ children }) {
  const [inputPrompt, setInputPrompt] = useState('')
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [isRecording, setIsRecording] = useState(false)

  const value = {
    inputPrompt,
    setInputPrompt,
    optimizedPrompt,
    setOptimizedPrompt,
    loading,
    setLoading,
    error,
    setError,
    history,
    setHistory,
    isRecording,
    setIsRecording
  }

  return (
    <PromptContext.Provider value={value}>
      {children}
    </PromptContext.Provider>
  )
}

export function usePrompt() {
  const context = useContext(PromptContext)
  if (!context) {
    throw new Error('usePrompt must be used within PromptProvider')
  }
  return context
}
