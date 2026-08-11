import React from 'react'
import ReactDOM from 'react-dom/client'
import { PromptProvider } from './context/PromptContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PromptProvider>
      <App />
    </PromptProvider>
  </React.StrictMode>
)
