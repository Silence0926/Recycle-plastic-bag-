document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const finalPriceElement = document.getElementById("final-price");
    const payButton = document.getElementById("pay-button");

    function loadOrder() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        orderSummary.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            orderSummary.innerHTML = "<p>您的购物车为空。</p>";
            payButton.disabled = true;
        } else {
            cart.forEach((item) => {
                let itemElement = document.createElement("p");
                itemElement.textContent = `${item.name} - ¥${item.price} x ${item.quantity}`;
                orderSummary.appendChild(itemElement);
                total += item.price * item.quantity;
            });
            payButton.disabled = false;
        }
        finalPriceElement.textContent = `总价: ¥${total}`;
    }

    payButton.addEventListener("click", function () {
        alert("跳转至 TNG eWallet 进行支付...");
        localStorage.removeItem("cart");
        window.location.href = "success.html"; // 支付成功后跳转
    });

    loadOrder();
});
