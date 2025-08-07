document.addEventListener('DOMContentLoaded', function() {
    // Add to cart logic
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            openSideCart();
            renderSideCart();
        });
    });

    // Side cart drawer logic
    const sideCart = document.getElementById('side-cart');
    const closeCartBtn = document.getElementById('close-cart');
    function openSideCart() {
        sideCart.classList.add('open');
    }
    function closeSideCart() {
        sideCart.classList.remove('open');
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeSideCart);
    }

    // Render side cart items with remove functionality
    function renderSideCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const sideCartItems = document.getElementById('side-cart-items');
        const sideCartTotal = document.getElementById('side-cart-total');
        if (sideCartItems && sideCartTotal) {
            sideCartItems.innerHTML = cart.length
                ? cart.map((item, idx) =>
                    `<li>
                        ${item.name} - ₦${item.price}
                        <button class="remove-cart-item" data-index="${idx}" style="margin-left:10px;color:#fff;background:#ea3503;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;">Remove</button>
                    </li>`
                ).join('')
                : '<li>Your cart is empty.</li>';
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            sideCartTotal.textContent = cart.length ? `Total: ₦${total}` : '';
        }

        // Add event listeners for remove buttons
        const removeBtns = document.querySelectorAll('.remove-cart-item');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(btn.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderSideCart();
            });
        });
    }

    // Render cart on page load if side cart exists
    if (document.getElementById('side-cart')) {
        renderSideCart();
    } 
});
