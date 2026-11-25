import mongoose from 'mongoose'
import express from 'express'
import {
  optimizePrompt,
  getHistory,
  getPromptById,
  deletePrompt,
  searchPrompts,
  getStatistics
} from '../controllers/promptController.js'

const router = express.Router()

// History lives in MongoDB, which is optional. Say so plainly when it is down.
const requireDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: 'Prompt history is unavailable because MongoDB is not connected.'
    })
  }
  next()
}

router.post('/optimize', optimizePrompt)
router.get('/history', requireDB, getHistory)
router.get('/search', requireDB, searchPrompts)
router.get('/statistics', requireDB, getStatistics)
router.get('/history/:id', requireDB, getPromptById)
router.delete('/history/:id', requireDB, deletePrompt)

export default router
