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
            sections.forEach(sec => sec.classList.remove('active'));

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

    productExploreBtn?.addEventListener('click', () => {
        initialView.style.display = 'none';
        expandedContent.classList.add('active');
        expandedContent.style.display = 'flex';
    });

    // Category Buttons for Products
    const categoryBtns = document.querySelectorAll('.category-btn');
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
    const contactInitialView = document.querySelector('.initial-contact-view');
    const contactExpandedContent = document.querySelector('.contact-expanded-content');

    contactExploreBtn?.addEventListener('click', function() {
        contactInitialView.style.display = 'none';
        contactExpandedContent.classList.add('active');
    });

    // AI Section Handling
    const aiExploreBtn = document.querySelector('.ai-explore');
    const initialAIView = document.querySelector('.initial-ai-view');
    const aiExpandedContent = document.querySelector('.ai-expanded-content');
    const generateImageBtn = document.querySelector('.generate-image-button');
    const randomImageContainer = document.getElementById('random-image-container');

    aiExploreBtn?.addEventListener('click', function() {
        initialAIView.style.display = 'none';
        aiExpandedContent.classList.add('active');
        fetchRandomDogImage(); // Optionally load an image immediately upon expanding
    });

    generateImageBtn?.addEventListener('click', function() {
        fetchRandomDogImage();
    });

    // Function to Fetch and Display Random Dog Image
    function fetchRandomDogImage() {
        fetch('https://random.dog/woof.json')
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.url;
                const imageType = imageUrl.substring(imageUrl.lastIndexOf('.') + 1).toLowerCase();
                let imgElement;

                if (['mp4', 'webm'].includes(imageType)) {
                    // If the file is a video, embed it
                    imgElement = document.createElement('video');
                    imgElement.src = imageUrl;
                    imgElement.controls = true;
                    imgElement.autoplay = true;
                    imgElement.loop = true;
                    imgElement.style.maxWidth = '100%';
                } else {
                    // If the file is an image
                    imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = 'Random Dog';
                    imgElement.style.maxWidth = '100%';
                }

                // Clear any existing content
                randomImageContainer.innerHTML = '';
                randomImageContainer.appendChild(imgElement);
            })
            .catch(error => {
                console.error('Error fetching random dog image:', error);
                randomImageContainer.innerHTML = '<p>Failed to load image. Please try again.</p>';
            });
    }

    // Optionally, load a random image on page load
    fetchRandomDogImage();
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
