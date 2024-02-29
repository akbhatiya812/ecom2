document.querySelectorAll('input[name="quantity"]').forEach(input => {
    input.addEventListener('change', async function() {
        const productId = this.dataset.productId;
        const quantity = this.value;
        try {
            const response = await fetch('/cart/updateQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            const cartTotal = await response.json();
            console.log(cartTotal);
            document.getElementById('cartTotalAmount').innerHTML = "₹ " + cartTotal;
            // Update the UI with the new cart total if needed
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Handle error
        }
    });
});
