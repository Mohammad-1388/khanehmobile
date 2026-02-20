const menuBtn2 = document.getElementById("menu");
const menuBtn3 = document.getElementById("menu2");
const menuBox = document.getElementById("menuBox");
const overlay = document.getElementById("overlay");
const closemenu = document.getElementById("close-menu");
// باز و بسته کردن منو
menuBtn2.addEventListener("click", function (e) {
    e.preventDefault();
    menuBox.classList.toggle("show");
    overlay.classList.toggle("show");
});

menuBtn3.addEventListener("click", function (e) {
    e.preventDefault();
    menuBox.classList.toggle("show");
    overlay.classList.toggle("show");
});

// بستن منو با کلیک روی لایه پشت
overlay.addEventListener("click", function () {
    menuBox.classList.remove("show");
    overlay.classList.remove("show");
});

closemenu.addEventListener("click", function () {
    menuBox.classList.remove("show");
    closemenu.classList.remove("show");
    overlay.classList.remove("show");
});

const scrollBtn = document.getElementById("scrollTopBtn");
const GoUpbtn = document.getElementById("GoUpbtn");

// نمایش دکمه
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

GoUpbtn.addEventListener("click", () => {
    const duration = 800; // مدت اسکرول (نرمی بیشتر = عدد بالاتر)
    const start = window.scrollY;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easing برای نرمی خیلی بیشتر
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, start * (1 - ease));

        if (progress < 1) requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
});

// اسکرول خیلی نرم با انیمیشن اختصاصی
scrollBtn.addEventListener("click", () => {
    const duration = 800; // مدت اسکرول (نرمی بیشتر = عدد بالاتر)
    const start = window.scrollY;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easing برای نرمی خیلی بیشتر
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, start * (1 - ease));

        if (progress < 1) requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
});