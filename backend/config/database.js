import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prompt-engine'

    // Fail fast so a missing MongoDB does not delay startup by 30s, and do not
    // buffer queries while disconnected (that adds a 10s wait to every request).
    mongoose.set('bufferCommands', false)
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 3000 })

    console.log('✅ MongoDB connected successfully')
    return mongoose.connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    throw error
  }
}

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('✅ MongoDB disconnected')
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error.message)
    process.exit(1)
  }
}
