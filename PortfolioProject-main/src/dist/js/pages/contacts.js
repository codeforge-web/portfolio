import { contactService } from '../services/contact.service';
class ContactPage {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.statusMessage = document.querySelector('.status-message');
        this.init();
    }
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    async handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        try {
            this.setLoading(true);
            await contactService.submitContactForm(data);
            this.showSuccess();
            this.form.reset();
        }
        catch (error) {
            console.error('Error submitting form:', error);
            this.showError();
        }
        finally {
            this.setLoading(false);
        }
    }
    setLoading(isLoading) {
        this.submitButton.disabled = isLoading;
        this.submitButton.textContent = isLoading ? 'Отправка...' : 'Отправить';
    }
    showSuccess() {
        this.statusMessage.textContent = 'Сообщение успешно отправлено!';
        this.statusMessage.className = 'status-message success';
        setTimeout(() => {
            this.statusMessage.textContent = '';
            this.statusMessage.className = 'status-message';
        }, 3000);
    }
    showError() {
        this.statusMessage.textContent = 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.';
        this.statusMessage.className = 'status-message error';
    }
}
// Инициализация страницы контактов
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});
