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

    const generateTextImageBtn = document.querySelector('.generate-text-image-button');
    const textInput = document.getElementById('text-input');

    console.log('Download Button:', downloadButton); // Debugging

    aiExploreBtn?.addEventListener('click', function() {
        console.log('AI Explore Button Clicked'); // Debugging
        initialAIView.style.display = 'none';
        aiExpandedContent.classList.add('active');
        fetchRandomDogImage(); // Optionally load an image immediately upon expanding
    });

    generateImageBtn?.addEventListener('click', function() {
        console.log('Generate Image Button Clicked'); // Debugging
        fetchRandomDogImage();
    });

    generateTextImageBtn?.addEventListener('click', function() {
        const text = textInput.value.trim();
        if (text !== '') {
            fetchTextImage(text);
        } else {
            alert('Please enter some text to generate an image.');
        }
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
                const fileName = imageUrl.split('/').pop(); // Extract filename from URL
                downloadButton.href = imageUrl;
                downloadButton.download = fileName; // Set the download attribute
                downloadButton.style.display = 'inline-block'; // Show the button

                // Ensure the download button works for images and videos
                downloadButton.onclick = function() {
                    const link = document.createElement('a');
                    link.href = imageUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                console.log('Download Button Updated:', downloadButton); // Debugging
            })
            .catch(error => {
                console.error('Error fetching random dog image:', error);
                randomImageContainer.innerHTML = '<p>Failed to load image. Please try again.</p>';
                downloadButton.style.display = 'none'; // Hide the download button on error
            });
    }

    // Function to Fetch and Display Image Based on Text Input using RoboHash API
    function fetchTextImage(text) {
        const imageUrl = `https://robohash.org/${encodeURIComponent(text)}.png`;

        // Create an image element
        const mediaElement = document.createElement('img');
        mediaElement.src = imageUrl;
        mediaElement.alt = `AI Generated Image for "${text}"`;
        mediaElement.style.maxWidth = '100%';

        // Handle image load errors
        mediaElement.onerror = function() {
            randomImageContainer.innerHTML = '<p>Failed to load image. Please try different text.</p>';
            downloadButton.style.display = 'none';
        };

        // Clear any existing content
        randomImageContainer.innerHTML = '';
        randomImageContainer.appendChild(mediaElement);

        // Update Download Button
        const fileName = imageUrl.split('/').pop(); // Extract filename from URL
        downloadButton.href = imageUrl;
        downloadButton.download = fileName; // Set the download attribute
        downloadButton.style.display = 'inline-block'; // Show the button

        // Ensure the download button works for the generated image
        downloadButton.onclick = function() {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        console.log('Text-Based Image Generated:', imageUrl); // Debugging
    }

    // Cart Functionality
    const cart = [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Favorites Functionality
    const favorites = [];

    const addToFavoriteButtons = document.querySelectorAll('.add-to-favorite');
    const favoritesModal = document.getElementById('favorites-modal');
    const openFavoritesBtn = document.getElementById('open-favorites');
    const closeFavoritesBtn = document.getElementById('close-favorites');
    const favoritesItemsContainer = document.getElementById('favorites-items');
    const favoritesEmpty = document.querySelector('.favorites-empty');
    const clearFavoritesBtn = document.getElementById('clear-favorites-button');

    // Products Data
    const products = [
        {
            id: 1,
            name: 'Product One',
            price: 4999, // KES 4,999
            image: 'Image/4.jpg'
        },
        {
            id: 2,
            name: 'Product Two',
            price: 2999, // KES 2,999
            image: 'Image/2.jpg'
        },
        {
            id: 3,
            name: 'Product Three',
            price: 3499, // KES 3,499
            image: 'Image/3.jpg'
        },
        // Add more products as needed
    ];

    // Utility Functions

    // Function to display notifications
    function showNotification(message, type) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        if (type === 'success') {
            toastr.success(message);
        } else if (type === 'info') {
            toastr.info(message);
        } else if (type === 'warning') {
            toastr.warning(message);
        } else if (type === 'error') {
            toastr.error(message);
        }
    }

    // Load Data from localStorage

    // Load Cart from localStorage
    if (localStorage.getItem('cart')) {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        storedCart.forEach(item => {
            cart.push(item);
        });
    }

    // Load Favorites from localStorage
    if (localStorage.getItem('favorites')) {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        storedFavorites.forEach(item => {
            favorites.push(item);
        });
    }

    // Update Functions

    // Update Cart Display
    function updateCart() {
        // Update cart count based on total unique items
        cartCount.textContent = cart.length;

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Calculate total
        let total = 0;

        // Display cart items
        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const itemName = document.createElement('span');
            itemName.classList.add('cart-item-name');
            itemName.textContent = item.name;

            const itemQuantity = document.createElement('span');
            itemQuantity.classList.add('cart-item-quantity');
            itemQuantity.textContent = `Quantity: ${item.quantity}`;

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('cart-item-price');
            itemPrice.textContent = `KES ${item.price.toLocaleString()}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('checkout-remove-button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                if (confirm(`Are you sure you want to remove ${item.name} from your cart?`)) {
                    cart.splice(index, 1);
                    updateCart();
                    showNotification(`${item.name} has been removed from your cart.`, 'info');
                }
            });

            cartItem.appendChild(itemName);
            cartItem.appendChild(itemQuantity);
            cartItem.appendChild(itemPrice);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);
        });

        // Update total price
        cartTotal.textContent = total.toLocaleString();

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update Favorites Display
    function updateFavorites() {
        // Clear existing items
        favoritesItemsContainer.innerHTML = '';

        if (favorites.length === 0) {
            favoritesEmpty.style.display = 'block';
            return;
        } else {
            favoritesEmpty.style.display = 'none';
        }

        favorites.forEach((item, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('checkout-cart-item');

            // Product Image
            const productImage = document.createElement('img');
            productImage.src = item.image;
            productImage.alt = item.name;
            productImage.classList.add('checkout-product-image');

            // Product Details
            const productDetails = document.createElement('div');
            productDetails.classList.add('checkout-product-details');

            const productName = document.createElement('h4');
            productName.classList.add('checkout-product-name');
            productName.textContent = item.name;

            const productPrice = document.createElement('span');
            productPrice.classList.add('checkout-product-price');
            productPrice.textContent = `KES ${item.price.toLocaleString()}`;

            productDetails.appendChild(productName);
            productDetails.appendChild(productPrice);

            // Remove Button
            const removeButton = document.createElement('button');
            removeButton.classList.add('checkout-remove-button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                if (confirm(`Are you sure you want to remove ${item.name} from your favorites?`)) {
                    favorites.splice(index, 1);
                    updateFavorites();
                    showNotification(`${item.name} has been removed from your favorites.`, 'info');
                    // Re-enable the favorite button on the product card
                    const favoriteBtn = document.querySelector(`.add-to-favorite[data-product-id="${item.id}"]`);
                    if (favoriteBtn) {
                        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorite';
                        favoriteBtn.disabled = false;
                        favoriteBtn.classList.remove('favorited');
                    }
                }
            });

            favoriteItem.appendChild(productImage);
            favoriteItem.appendChild(productDetails);
            favoriteItem.appendChild(removeButton);

            favoritesItemsContainer.appendChild(favoriteItem);
        });

        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Event Listeners

    // Add to Cart Event Listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                const existingProduct = cart.find(item => item.id === productId);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCart();
                showNotification(`${product.name} has been added to your cart!`, 'success');
            }
        });
    });

    // Add to Favorite Event Listeners
    addToFavoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                const isAlreadyFavorite = favorites.some(item => item.id === productId);
                if (!isAlreadyFavorite) {
                    favorites.push({ ...product });
                    updateFavorites();
                    button.innerHTML = '<i class="fas fa-heart"></i> Favorited';
                    button.classList.add('favorited');
                    button.disabled = true;
                    showNotification(`${product.name} has been added to your favorites!`, 'success');
                } else {
                    showNotification(`${product.name} is already in your favorites.`, 'info');
                }
            }
        });
    });

    // Open Cart Modal
    openCartBtn.addEventListener('click', () => {
        updateCart();
        cartModal.style.display = 'flex';
    });

    // Close Cart Modal
    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Open Favorites Modal
    openFavoritesBtn.addEventListener('click', () => {
        updateFavorites();
        favoritesModal.style.display = 'flex';
    });

    // Close Favorites Modal
    closeFavoritesBtn.addEventListener('click', () => {
        favoritesModal.style.display = 'none';
    });

    // Close Modals by Clicking Outside Content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === favoritesModal) {
            favoritesModal.style.display = 'none';
        }
    });

    // Clear All Favorites
    if (clearFavoritesBtn) {
        clearFavoritesBtn.addEventListener('click', () => {
            if (favorites.length === 0) {
                showNotification('You have no favorite items to clear.', 'info');
                return;
            }
            if (confirm('Are you sure you want to clear all your favorite items?')) {
                favorites.splice(0, favorites.length);
                updateFavorites();
                showNotification('All favorite items have been cleared.', 'info');
                // Reset all favorite buttons on product cards
                addToFavoriteButtons.forEach(button => {
                    button.innerHTML = '<i class="fas fa-heart"></i> Add to Favorite';
                    button.disabled = false;
                    button.classList.remove('favorited');
                });
            }
        });
    }

    // Checkout Functionality
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty. Add items to cart before checking out.', 'info');
            return;
        }
        // Implement checkout logic here
        // For demonstration, we'll simulate a successful checkout
        alert('Your payment has been received successfully. You will receive your products shortly.');
        // Clear the cart after checkout
        cart.splice(0, cart.length);
        updateCart();
        cartModal.style.display = 'none';
    });

    // Initialize Displays on Load
    updateCart();
    updateFavorites();
});

