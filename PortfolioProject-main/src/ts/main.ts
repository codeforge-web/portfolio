// Types
interface MenuElements {
    button: HTMLElement | null;
    menu: HTMLElement | null;
}

// Constants
const SELECTORS = {
    MOBILE_MENU_BUTTON: 'mobile-menu-button',
    MOBILE_MENU: 'mobile-menu'
} as const;

// Mobile menu functionality
const initializeMobileMenu = (): void => {
    const elements: MenuElements = {
        button: document.getElementById(SELECTORS.MOBILE_MENU_BUTTON),
        menu: document.getElementById(SELECTORS.MOBILE_MENU)
    };

    if (elements.button && elements.menu) {
        elements.button.addEventListener('click', () => {
            elements.menu?.classList.toggle('hidden');
        });
    }
};

// Smooth scroll functionality
const initializeSmoothScroll = (): void => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            if (!href) return;
            
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSmoothScroll();
}); 