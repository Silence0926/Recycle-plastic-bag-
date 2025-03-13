document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <span>${item.name} - RM${item.price.toFixed(2)}</span>
                <button class="decrease" data-index="${index}">-</button>
                <span>Qty: ${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        // **总价更新动画**
        totalPriceElement.style.transition = "color 0.3s ease, transform 0.3s ease";
        totalPriceElement.style.color = "#FFD700"; // 金色
        totalPriceElement.style.transform = "scale(1.1)";
        setTimeout(() => {
            totalPriceElement.style.color = black;
            totalPriceElement.style.transform = "scale(1)";
        }, 300);

        totalPriceElement.innerText = `RM ${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener("click", function (event) {
        const index = event.target.dataset.index;
        if (event.target.classList.contains("remove-item")) {
            const itemElement = event.target.parentElement;
            itemElement.style.transition = "opacity 0.5s ease";
            itemElement.style.opacity = "0";
            setTimeout(() => {
                cart.splice(index, 1);
                updateCartDisplay();
            }, 500);
        } else if (event.target.classList.contains("increase")) {
            cart[index].quantity += 1;
            buttonAnimation(event.target);
        } else if (event.target.classList.contains("decrease") && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            buttonAnimation(event.target);
        }
        updateCartDisplay();
    });

    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("购物车为空！");
            return;
        }
        checkoutButton.style.transition = "transform 0.2s ease";
        checkoutButton.style.transform = "scale(0.95)";
        setTimeout(() => {
            checkoutButton.style.transform = "scale(1)";
            alert("结账成功！");
            localStorage.removeItem("cart");
            updateCartDisplay();
        }, 200);
    });

    function buttonAnimation(button) {
        button.style.transition = "transform 0.1s ease";
        button.style.transform = "scale(0.9)";
        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 100);
    }

    updateCartDisplay();
});
