import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB, disconnectDB } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import promptRoutes from './routes/prompts.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// CORS Configuration - Allow all origins for development/local network
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}))

// Handle preflight requests
app.options('*', cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    env: NODE_ENV,
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api', promptRoutes)

// 404 handler
app.use(notFound)

// Error handler (must be last)
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    // MongoDB is used for optional prompt history. Do not prevent the AI API
    // from starting when a local MongoDB instance is not configured or reachable.
    try {
      await connectDB()
    } catch (error) {
      console.warn('⚠️ MongoDB unavailable; optimization can run, but history will be disabled:', error.message)
    }

    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   Prompt Engine Backend Server        ║
╠════════════════════════════════════════╣
║ Server: http://localhost:${PORT}
║ Environment: ${NODE_ENV}
║ Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Unavailable (history disabled)'}
║ Status: Ready ✅
╚════════════════════════════════════════╝
      `)
    })
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Set PORT in backend/.env to a free port (on macOS, AirPlay Receiver uses 5000).`)
      } else {
        console.error('Server error:', error.message)
      }
      process.exit(1)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 SIGTERM received, shutting down gracefully')
  await disconnectDB()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully')
  await disconnectDB()
  process.exit(0)
})

export default app
