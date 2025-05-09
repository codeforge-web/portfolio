import { contactService, ContactFormData } from '../services/contact.service';

class ContactPage {
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private statusMessage: HTMLElement;

  constructor() {
    this.form = document.querySelector('.contact-form') as HTMLFormElement;
    this.submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.statusMessage = document.querySelector('.status-message') as HTMLElement;
    this.init();
  }

  private init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string
    };

    try {
      this.setLoading(true);
      await contactService.submitContactForm(data);
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      this.showError();
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(isLoading: boolean) {
    this.submitButton.disabled = isLoading;
    this.submitButton.textContent = isLoading ? 'Отправка...' : 'Отправить';
  }

  private showSuccess() {
    this.statusMessage.textContent = 'Сообщение успешно отправлено!';
    this.statusMessage.className = 'status-message success';
    setTimeout(() => {
      this.statusMessage.textContent = '';
      this.statusMessage.className = 'status-message';
    }, 3000);
  }

  private showError() {
    this.statusMessage.textContent = 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.';
    this.statusMessage.className = 'status-message error';
  }
}

// Инициализация страницы контактов
document.addEventListener('DOMContentLoaded', () => {
  new ContactPage();
}); 