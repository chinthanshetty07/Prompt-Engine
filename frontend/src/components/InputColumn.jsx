import { usePrompt } from '../context/PromptContext'
import '../styles/components.css'

export function InputColumn() {
  const { inputPrompt, setInputPrompt } = usePrompt()

  return (
    <div className="column input-column">
      <div className="column-header">
        <h3>Your Prompt</h3>
        <span className="column-label">Input</span>
      </div>
      <textarea
        className="prompt-textarea"
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        placeholder="Type your prompt here or use the audio converter below..."
        spellCheck="true"
      />
      <div className="textarea-footer">
        <span className="char-count">{inputPrompt.length} characters</span>
      </div>
    </div>
  )
}
