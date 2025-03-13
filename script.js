document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productElement = button.parentElement;
            const productName = productElement.querySelector(".product-name").innerText;
            const productPrice = parseFloat(productElement.querySelector(".product-price").innerText.replace("RM", ""));
            const productImage = productElement.querySelector("img").src;
            
            addToCart(productName, productPrice, productImage);
        });
    });
});

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已添加到购物车！");
}
