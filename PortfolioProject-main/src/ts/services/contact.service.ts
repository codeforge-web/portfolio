import { API_ENDPOINTS } from '../config/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

class ContactService {
  async submitContactForm(data: ContactFormData): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.CONTACTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
}

export const contactService = new ContactService(); 