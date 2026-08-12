import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import promptRoutes from './routes/prompts.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
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
    // Connect to MongoDB
    await connectDB()

    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   Prompt Engine Backend Server        ║
╠════════════════════════════════════════╣
║ Server: http://localhost:${PORT}
║ Environment: ${NODE_ENV}
║ Database: Connected
║ Status: Ready ✅
╚════════════════════════════════════════╝
      `)
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
  await connectDB().then(conn => conn.disconnect())
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully')
  await connectDB().then(conn => conn.disconnect())
  process.exit(0)
})

export default app
