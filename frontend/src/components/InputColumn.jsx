import { usePrompt } from '../context/PromptContext'
import '../styles/components.css'

export function InputColumn() {
  const { inputPrompt, setInputPrompt } = usePrompt()

  return (
    <div className="column input-column">
      <div className="column-header">
        <h3>Your Coding Prompt</h3>
        <span className="column-label">Input</span>
      </div>
      <textarea
        className="prompt-textarea"
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        placeholder="Describe the coding task, bug, architecture, or technical implementation..."
        spellCheck="true"
      />
      <div className="textarea-footer">
        <span className="char-count">{inputPrompt.length} characters</span>
      </div>
    </div>
  )
}
