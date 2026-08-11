export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: Object.values(err.errors).map(e => e.message)
    })
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    })
  }

  // Generic error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  })
}

export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
}
