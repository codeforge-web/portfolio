import { API_ENDPOINTS } from '../config/api';
class ContactService {
    async submitContactForm(data) {
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
        }
        catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }
}
export const contactService = new ContactService();
