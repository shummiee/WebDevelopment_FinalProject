const images = document.querySelectorAll('.fade-image');
let current = 0;

setInterval(() => {
images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
    const closeBtn = document.getElementById("closeLogin");
    const userIcon = document.querySelector('a[aria-label="User"]');

    userIcon.addEventListener("click", function (e) {
        e.preventDefault();
        loginModal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        loginModal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
});
