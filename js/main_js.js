const images = document.querySelectorAll('.fade-image');
let current = 0;

setInterval(() => {
images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
    const registerModal = document.getElementById("registerModal");
    const closeBtn = document.getElementById("closeRegister");
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
            registerModal.style.display = 'none';
            registerPassModal.style.display = "flex";
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

document.addEventListener('DOMContentLoaded', function () {
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const showLoginLink = document.getElementById('showLogin');

    // Show login form when "Login Here!" is clicked
    showLoginLink.addEventListener('click', function (e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Close login modal
    closeLogin.addEventListener('click', function () {
        loginModal.style.display = 'none';
    });

    // Optional: Close modal when clicking outside the content
    window.addEventListener('click', function (e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const closeRegisterPass = document.getElementById("closeRegisterPass");
    const registerPassModal = document.getElementById("registerPassModal");

    closeRegisterPass.addEventListener("click", function () {
        registerPassModal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === registerPassModal) {
            registerPassModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const createPassBtn = document.getElementById("createPass");
    const registerPassModal = document.getElementById("registerPassModal");
    const passwordField = document.getElementById("password");

    createPassBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const password = passwordField.value.trim();

        // Validation
        if (password === "") {
            alert("Please enter a password.");
        } else if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
        } else {
            // ✅ Successful registration
            alert("Account successfully created!");

            // Optionally clear and close
            passwordField.value = "";
            registerPassModal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    loginBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
            alert("Please fill in all required fields.");
        } else {
            alert("Login successful!");
            // Close the modal
            loginModal.style.display = 'none';
            // Clear the form
            emailInput.value = '';
            passwordInput.value = '';
        }
    });
});




