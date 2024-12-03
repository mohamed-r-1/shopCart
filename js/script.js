// Check if the user is logged in
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html'; 
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    window.location.href = 'index.html';  
}

// Add product to the users cart
function addToCart(productIndex, userEmail) {
    const product = products[productIndex];  
    let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    
    // Add the product to the users cart
    userCart.push(product);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
    alert('Product added to cart!');
}

// Load the user's cart
function loadCart(userEmail) {
    const cartItems = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    const cartContainer = document.getElementById('cartItems');
    let totalPrice = 0;

    // Clear previous cart items
    cartContainer.innerHTML = '';

    // Display each product in the cart
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'col-4';
        itemDiv.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">Price: $${item.price}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${index}, '${userEmail}')">Remove</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
        totalPrice += item.price;
    });

    // Update total price
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Remove product from cart
function removeFromCart(productIndex, userEmail) {
    let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];

    // Remove the product from the cart by its index
    userCart.splice(productIndex, 1);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));

    // Reload the cart after removal
    loadCart(userEmail);
}
