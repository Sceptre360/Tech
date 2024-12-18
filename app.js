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

            // Scroll to the section
            const offset = 60; // Height of the navigation buttons
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        });
    });

    // Home section expansion
    const homeButton = document.querySelector('.initial-view .primary-button');
    const homeInitialView = document.querySelector('.initial-view');
    const homeExpandedContent = document.querySelector('.expanded-content');

    homeButton?.addEventListener('click', function() {
        homeInitialView.style.display = 'none';
        homeExpandedContent.classList.add('active');
    });

    // Product section handling
    const productExploreBtn = document.querySelector('.product-explore');
    const initialProductView = document.querySelector('.initial-product-view');
    const productExpandedContent = document.querySelector('.product-expanded-content');

    productExploreBtn?.addEventListener('click', () => {
        initialProductView.style.display = 'none';
        productExpandedContent.classList.add('active');
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
    const downloadButton = document.getElementById('download-button'); // Download Button Element

    aiExploreBtn?.addEventListener('click', function() {
        console.log('AI Explore Button Clicked'); // Debugging
        initialAIView.style.display = 'none';
        aiExpandedContent.classList.add('active');
        fetchRandomDogImage(); // Optionally load an image immediately upon expanding
    });

    generateImageBtn?.addEventListener('click', function() {
        fetchRandomDogImage();
    });

    // Function to Fetch and Display Random Dog Image or Video
    function fetchRandomDogImage() {
        fetch('https://random.dog/woof.json')
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.url;
                const imageType = imageUrl.substring(imageUrl.lastIndexOf('.') + 1).toLowerCase();
                let mediaElement;

                if (['mp4', 'webm'].includes(imageType)) {
                    // If the file is a video, embed it
                    mediaElement = document.createElement('video');
                    mediaElement.src = imageUrl;
                    mediaElement.controls = true;
                    mediaElement.autoplay = true;
                    mediaElement.loop = true;
                    mediaElement.style.maxWidth = '100%';
                } else {
                    // If the file is an image
                    mediaElement = document.createElement('img');
                    mediaElement.src = imageUrl;
                    mediaElement.alt = 'Random AI Content';
                    mediaElement.style.maxWidth = '100%';
                }

                // Clear any existing content
                randomImageContainer.innerHTML = '';
                randomImageContainer.appendChild(mediaElement);

                // Update Download Button
                downloadButton.href = imageUrl;
                downloadButton.download = imageUrl.split('/').pop(); // Extract filename from URL
                downloadButton.style.display = 'inline-block'; // Show the button
            })
            .catch(error => {
                console.error('Error fetching random dog image:', error);
                randomImageContainer.innerHTML = '<p>Failed to load content. Please try again.</p>';
                downloadButton.style.display = 'none'; // Hide the download button on error
            });
    }

    // Optionally, load a random image on page load for AI section
    // fetchRandomDogImage();
});

// Function to Filter Products by Category (if needed)
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
