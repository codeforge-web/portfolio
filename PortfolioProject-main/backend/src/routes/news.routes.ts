import express from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/news.controller';

const router = express.Router();

// Public routes
router.get('/', getNews);
router.get('/:id', getNewsById);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'editor'));

router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router; 