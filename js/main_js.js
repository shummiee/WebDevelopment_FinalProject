const images = document.querySelectorAll('.fade-image');
let current = 0;

setInterval(() => {
images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("registerModal");
    const closeBtn = document.getElementById("closeLogin");
    const userIcon = document.querySelector('a[aria-label="User"]');

    userIcon.addEventListener("click", function (e) {
        e.preventDefault();
        registerModal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        registerModal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === registerModal) {
            registerModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const joinBtn = document.getElementById("continue-btn");

    joinBtn.addEventListener("click", function () {
        const email = document.getElementById("email").value.trim();
        const ageCheckbox = document.getElementById("age").checked;
        const termsCheckbox = document.getElementById("terms").checked;

        if (email === "" || !ageCheckbox || !termsCheckbox) {
            alert("Please fill in all required fields before submitting.");
        } else {
            alert("Thank you for joining Adiclub!");
            registerModal.style.display = 'none';
      // Optionally clear the form or close modal
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.querySelector('.fa-user');
    const registerModal = document.getElementById('registerModal');
    const closeRegister = document.getElementById('closeRegister');
    const submitBtn = document.querySelector('.continue-btn');
    const emailInput = document.querySelector('input[type="email"]');
    const checkboxes = document.querySelectorAll('.login-content input[type="checkbox"]');

    // Show modal and clear fields
    userIcon.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        registerModal.style.display = 'flex';
        clearFormFields();
    });

    // Close modal
    closeRegister.addEventListener('click', function () {
        registerModal.style.display = 'none';
    });

    // Validate and show alert on submission

    function clearFormFields() {
        emailInput.value = '';
        checkboxes.forEach(cb => cb.checked = false);
    }
});





