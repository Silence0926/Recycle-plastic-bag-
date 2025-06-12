document.addEventListener("DOMContentLoaded", function () {
    let cart;

    // ✅ 安全解析 localStorage 数据
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        console.error("购物车数据损坏，已重置。");
    }

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

        // ✅ 修复 totalPriceElement 的动画颜色错误（原本的 black 未定义）
        totalPriceElement.style.transition = "color 0.3s ease, transform 0.3s ease";
        totalPriceElement.style.color = "#FFD700";
        totalPriceElement.style.transform = "scale(1.1)";
        setTimeout(() => {
            totalPriceElement.style.color = "black"; // ✅ 正确写法
            totalPriceElement.style.transform = "scale(1)";
        }, 300);

        totalPriceElement.innerText = `RM ${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener("click", function (event) {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("remove-item")) {
            const itemElement = event.target.parentElement;
            itemElement.style.transition = "opacity 0.5s ease, height 0.5s ease";
            itemElement.style.opacity = "0";
            itemElement.style.height = "0px";
            itemElement.style.overflow = "hidden";

            setTimeout(() => {
                cart.splice(index, 1);
                updateCartDisplay();
            }, 500);
        } 
        
        else if (event.target.classList.contains("increase")) {
            cart[index].quantity += 1;
            buttonAnimation(event.target);
            updateCartDisplay(); // ✅ 确保更新
        } 
        
        else if (event.target.classList.contains("decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                buttonAnimation(event.target);
                updateCartDisplay();
            } else {
                // ✅ 最小值反馈动画
                event.target.classList.add("shake");
                setTimeout(() => event.target.classList.remove("shake"), 300);
            }
        }
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
            cart = [];
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
