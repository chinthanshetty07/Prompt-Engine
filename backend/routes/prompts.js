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

router.post('/optimize', optimizePrompt)
router.get('/history', getHistory)
router.get('/search', searchPrompts)
router.get('/statistics', getStatistics)
router.get('/history/:id', getPromptById)
router.delete('/history/:id', deletePrompt)

export default router
