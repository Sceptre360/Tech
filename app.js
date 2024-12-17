document.addEventListener('DOMContentLoaded', () => {
    // Navigation and Section Management
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);

            // Remove active states
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Activate selected section and button
            button.classList.add('active');
            section.classList.add('active');

            // Center the section in the viewport
            const offset = 60; // Height of the navigation buttons
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

            // Scroll to the section position
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        });
    });

    // Home section expansion
    const homeButton = document.querySelector('.primary-button');
    homeButton?.addEventListener('click', function() {
        document.querySelector('.initial-view').style.display = 'none';
        document.querySelector('.expanded-content').classList.add('active');
    });

    // Product section handling
    const productExploreBtn = document.querySelector('.product-explore');
    const initialView = document.querySelector('.initial-product-view');
    const expandedContent = document.querySelector('.product-expanded-content');
    const categoryBtns = document.querySelectorAll('.category-btn');

    productExploreBtn?.addEventListener('click', () => {
        initialView.style.display = 'none';
        expandedContent.classList.add('active');
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            filterProducts(category);
        });
    });

    // Service section handling
    const serviceExploreBtn = document.querySelector('.service-explore');
    const serviceInitialView = document.querySelector('.initial-service-view');
    const serviceExpandedContent = document.querySelector('.service-expanded-content');

    serviceExploreBtn?.addEventListener('click', function() {
        serviceInitialView.style.display = 'none';
        serviceExpandedContent.classList.add('active');
    });

    // Automation section handling
    const automationExploreBtn = document.querySelector('.automation-explore');
    const automationInitialView = document.querySelector('.initial-automation-view');
    const automationExpandedContent = document.querySelector('.automation-expanded-content');

    automationExploreBtn?.addEventListener('click', function() {
        automationInitialView.style.display = 'none';
        automationExpandedContent.classList.add('active');
    });

    // Web Development section handling
    const webdevExploreBtn = document.querySelector('.webdev-explore');
    const webdevInitialView = document.querySelector('.initial-webdev-view');
    const webdevExpandedContent = document.querySelector('.webdev-expanded-content');

    webdevExploreBtn?.addEventListener('click', function() {
        webdevInitialView.style.display = 'none';
        webdevExpandedContent.classList.add('active');
    });

    // Contact section handling
    const contactExploreBtn = document.querySelector('.contact-explore');
    const contactExpandedContent = document.querySelector('.contact-expanded-content');

    contactExploreBtn?.addEventListener('click', function() {
        contactExpandedContent.classList.toggle('active');
    });

    // User authentication modal handling
    const userIcon = document.getElementById('user-icon');
    const modal = document.getElementById('auth-modal');
    const closeModal = document.getElementById('close-modal');
    const tabButtons = document.querySelectorAll('.tab-button');
    const authForms = document.querySelectorAll('.auth-form');

    userIcon.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (product.dataset.category === category || category === 'all') {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
