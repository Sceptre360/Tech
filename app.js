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

    // Products Data (Ensure this matches the products in your HTML)
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
        // Add more products as needed
    ];

    // Add to Cart Event
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
            }
        });
    });

    // Update Cart Display
    function updateCart() {
        // Update cart count
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

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('cart-item-price');
            itemPrice.textContent = `KES ${(item.price * item.quantity).toLocaleString()}`;

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-item');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });

            cartItem.appendChild(itemName);
            cartItem.appendChild(itemPrice);
            cartItem.appendChild(removeBtn);

            cartItemsContainer.appendChild(cartItem);
        });

        // Update total
        cartTotal.textContent = total.toLocaleString();

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Open Cart Modal
    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    // Close Cart Modal
    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close Modal by clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout Button (Placeholder functionality)
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            cartModal.style.display = 'none';
            populateCheckoutCartItems();
            checkoutModal.style.display = 'flex';
        }
    });

    // References to Checkout Modal Elements
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutCartItemsContainer = document.getElementById('checkout-cart-items');

    // Open Checkout Modal
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
        } else {
            cartModal.style.display = 'none';
            populateCheckoutCartItems();
            checkoutModal.style.display = 'flex';
        }
    });

    // Function to Populate Checkout Cart Items
    function populateCheckoutCartItems() {
        checkoutCartItemsContainer.innerHTML = ''; // Clear previous items

        cart.forEach((item, index) => {
            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout-cart-item');

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

            // Quantity Input
            const quantityDiv = document.createElement('div');
            quantityDiv.classList.add('checkout-quantity');

            const quantityLabel = document.createElement('label');
            quantityLabel.setAttribute('for', `quantity-${item.id}`);
            quantityLabel.textContent = 'Qty:';

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.id = `quantity-${item.id}`;
            quantityInput.name = `quantity-${item.id}`;
            quantityInput.min = '1';
            quantityInput.value = item.quantity;
            quantityInput.classList.add('quantity-input');
            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity < 1) {
                    e.target.value = 1;
                    return;
                }
                // Update the quantity in the cart
                const cartItem = cart.find(ci => ci.id === item.id);
                if (cartItem) {
                    cartItem.quantity = newQuantity;
                    updateCart();
                    populateCheckoutCartItems(); // Refresh checkout items
                }
            });

            quantityDiv.appendChild(quantityLabel);
            quantityDiv.appendChild(quantityInput);

            checkoutItem.appendChild(productImage);
            checkoutItem.appendChild(productDetails);
            checkoutItem.appendChild(quantityDiv);

            checkoutCartItemsContainer.appendChild(checkoutItem);
        });
    }

    // Close Checkout Modal
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    // References to Success Modal Elements
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');
    const closeSuccessButton = document.getElementById('close-success-button');
    const successMessage = document.getElementById('success-message');

    // Handle Checkout Form Submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const pickupCity = document.getElementById('pickup-city').value.trim();
        const pickupStreet = document.getElementById('pickup-street').value.trim();
        const mpesaNumber = document.getElementById('mpesa-number').value.trim();
        const mpesaName = document.getElementById('mpesa-name').value.trim();

        // Validate M-Pesa Number (exactly 10 digits)
        const mpesaNumberPattern = /^\d{10}$/;
        if (!mpesaNumberPattern.test(mpesaNumber)) {
            showNotification('Please enter a valid 10-digit M-Pesa number.', 'error');
            return;
        }

        if (pickupCity === '' || pickupStreet === '') {
            showNotification('Please enter both your pickup city and street.', 'error');
            return;
        }

        if (mpesaName === '') {
            showNotification('Please enter the name associated with your M-Pesa account.', 'error');
            return;
        }

        const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Prepare Success Message with Product Details
        let productDetails = '';
        cart.forEach(item => {
            productDetails += `${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}\n`;
        });

        const message = `Thank you for your purchase!\n\n` +
            `Please send KES ${totalAmount.toLocaleString()} via Safaricom M-Pesa to 07488252.\n` +
            `- M-Pesa Number: ${mpesaNumber}\n` +
            `- M-Pesa Account Name: ${mpesaName}\n\n` +
            `Pickup Address:\nCity: ${pickupCity}\nStreet: ${pickupStreet}\n\n` +
            `Order Details:\n${productDetails}`;

        // Set Success Message
        successMessage.textContent = message;

        // Display Success Modal
        successModal.style.display = 'flex';

        // Clear cart
        cart.length = 0;
        updateCart();

        // Clear localStorage
        localStorage.removeItem('cart');
    });

    // Close Modals by clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    // Initial Cart Update
    updateCart();

    // Retrieve cart from localStorage on load
    if (localStorage.getItem('cart')) {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        storedCart.forEach(item => {
            cart.push(item);
        });
        updateCart();
    }

    // Close Success Modal when 'X' is clicked
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Close Success Modal when 'Close' button is clicked
    closeSuccessButton.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Optional: Close Success Modal by clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});

