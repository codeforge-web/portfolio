import { newsService } from '../services/news.service';
import { authService } from '../services/auth.service';
class NewsPage {
    constructor() {
        this.newsContainer = document.querySelector('.news-container');
        this.isAdmin = authService.isAuthenticated() && authService.getUser()?.role === 'admin';
        this.init();
    }
    async init() {
        try {
            const news = await newsService.getAllNews();
            this.renderNews(news);
            if (this.isAdmin) {
                this.addAdminControls();
            }
        }
        catch (error) {
            console.error('Error initializing news page:', error);
            this.showError();
        }
    }
    renderNews(news) {
        if (!news.length) {
            this.newsContainer.innerHTML = '<p class="no-news">Новостей пока нет</p>';
            return;
        }
        this.newsContainer.innerHTML = news
            .map((item) => `
        <article class="news-item">
          ${item.image ? `<img src="${item.image}" alt="${item.title}" class="news-image">` : ''}
          <div class="news-content">
            <h3 class="news-title">${item.title}</h3>
            <p class="news-text">${item.content}</p>
            <div class="news-meta">
              <span class="news-author">Автор: ${item.author.name}</span>
              <span class="news-date">${new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </article>
      `)
            .join('');
        if (this.isAdmin) {
            this.attachEventListeners();
        }
    }
    addAdminControls() {
        const adminControls = document.createElement('div');
        adminControls.className = 'mb-6';
        adminControls.innerHTML = `
      <button id="add-news" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
        Add News
      </button>
    `;
        this.newsContainer.insertAdjacentElement('beforebegin', adminControls);
    }
    attachEventListeners() {
        // Add news button
        const addButton = document.getElementById('add-news');
        if (addButton) {
            addButton.addEventListener('click', () => this.showNewsForm());
        }
        // Edit buttons
        document.querySelectorAll('.edit-news').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                if (id)
                    this.showNewsForm(id);
            });
        });
        // Delete buttons
        document.querySelectorAll('.delete-news').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (id && confirm('Are you sure you want to delete this news?')) {
                    try {
                        await newsService.deleteNews(id, authService.getToken());
                        this.init(); // Reload news
                    }
                    catch (error) {
                        console.error('Error deleting news:', error);
                        this.showError('Failed to delete news');
                    }
                }
            });
        });
    }
    async showNewsForm(id) {
        let news = null;
        if (id) {
            try {
                news = await newsService.getNewsById(id);
            }
            catch (error) {
                console.error('Error loading news:', error);
                this.showError('Failed to load news');
                return;
            }
        }
        const form = document.createElement('div');
        form.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
        form.innerHTML = `
      <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4">${id ? 'Edit News' : 'Add News'}</h2>
        <form id="news-form">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Title</label>
            <input type="text" name="title" value="${news?.title || ''}" class="w-full p-2 border rounded" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Content</label>
            <textarea name="content" class="w-full p-2 border rounded h-32" required>${news?.content || ''}</textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Image URL</label>
            <input type="url" name="image" value="${news?.image || ''}" class="w-full p-2 border rounded">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" id="cancel-form">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">
              ${id ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    `;
        document.body.appendChild(form);
        // Handle form submission
        const newsForm = form.querySelector('#news-form');
        newsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(newsForm);
            const newsData = {
                title: formData.get('title'),
                content: formData.get('content'),
                image: formData.get('image'),
                isPublished: true
            };
            try {
                if (id) {
                    await newsService.updateNews(id, newsData, authService.getToken());
                }
                else {
                    await newsService.createNews(newsData, authService.getToken());
                }
                form.remove();
                this.init(); // Reload news
            }
            catch (error) {
                console.error('Error saving news:', error);
                this.showError('Failed to save news');
            }
        });
        // Handle cancel button
        const cancelButton = form.querySelector('#cancel-form');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => form.remove());
        }
    }
    showError(message = 'Произошла ошибка при загрузке новостей. Пожалуйста, попробуйте позже.') {
        this.newsContainer.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
    }
}
// Инициализация страницы новостей
document.addEventListener('DOMContentLoaded', () => {
    new NewsPage();
});
