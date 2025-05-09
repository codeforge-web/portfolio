import { Request, Response, NextFunction } from 'express';
import News from '../models/News';
import { logger } from '../utils/logger';

// Get all published news
export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate('author', 'name');
    
    res.status(200).json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Get single news by ID
export const getNewsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'name');
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Create new news (admin only)
export const createNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.create({
      ...req.body,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Update news (admin only)
export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Delete news (admin only)
export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}; 