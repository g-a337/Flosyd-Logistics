document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            // Redirect to cart page after adding
            window.location.href = 'cart.html';
        });
    });

    // Show cart items if on cart.html
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartItems && cartTotal) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = cart.map(item => `<li>${item.name} - ₦${item.price}</li>`).join('');
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `Total: ₦${total}`;
    }
});