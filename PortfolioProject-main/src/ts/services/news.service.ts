import { API_ENDPOINTS } from '../config/api';

export interface News {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

interface NewsData {
  title: string;
  content: string;
  image?: string;
  isPublished: boolean;
}

class NewsService {
  async getAllNews(): Promise<News[]> {
    try {
      const response = await fetch(API_ENDPOINTS.NEWS);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async getNewsById(id: string): Promise<News> {
    try {
      const response = await fetch(`${API_ENDPOINTS.NEWS}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async createNews(newsData: NewsData, token: string): Promise<News> {
    try {
      const response = await fetch(API_ENDPOINTS.NEWS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newsData)
      });

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  async updateNews(id: string, newsData: NewsData, token: string): Promise<News> {
    try {
      const response = await fetch(`${API_ENDPOINTS.NEWS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newsData)
      });

      if (!response.ok) {
        throw new Error('Failed to update news');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }

  async deleteNews(id: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_ENDPOINTS.NEWS}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  }
}

export const newsService = new NewsService(); 