// 获取 body 作为背景容器
const body = document.body;

// 创建星空容器
const starContainer = document.createElement("div");
starContainer.classList.add("star-container");
body.appendChild(starContainer);

// 生成随机星星
function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    // 随机设置星星的位置
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // 随机设置大小
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // 随机设置闪烁动画时间
    const duration = Math.random() * 3 + 2;
    star.style.animation = `twinkle ${duration}s infinite alternate`;

    // 添加星星到容器
    starContainer.appendChild(star);
}

// 生成多个星星
for (let i = 0; i < 150; i++) {
    createStar();
}

// 监听窗口大小变化，重新生成星星
window.addEventListener("resize", () => {
    starContainer.innerHTML = ""; // 清空旧星星
    for (let i = 0; i < 150; i++) {
        createStar();
    }
});
