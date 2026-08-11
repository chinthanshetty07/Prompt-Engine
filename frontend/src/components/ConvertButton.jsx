import '../styles/components.css'

export function ConvertButton() {

  return (
    <div className="convert-button-container">
      <button
        className="convert-button"
        disabled={true}
        title="Coming soon"
      >
        Convert Audio
      </button>
      <p className="recording-hint" style={{ color: '#999', fontSize: '0.85rem' }}>
        Feature coming soon
      </p>
    </div>
  )
}
