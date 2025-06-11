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
    const registerModal = document.getElementById("registerModal");
    const registerPassModal = document.getElementById("registerPassModal");
    const closeRegister = document.getElementById('closeRegister');
    const userIcon = document.querySelector('.fa-user');
    const emailInput = registerModal.querySelector('input[type="email"]');
    const checkboxes = registerModal.querySelectorAll('input[type="checkbox"]');

    // Show modal and clear fields when user icon is clicked
    userIcon.addEventListener('click', function (e) {
        e.preventDefault();
        registerModal.style.display = 'flex';
        clearFormFields();
    });

    // Close register modal
    closeRegister.addEventListener('click', function () {
        registerModal.style.display = 'none';
    });

    // Register submit
    joinBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const ageCheckbox = document.getElementById("age").checked;
        const termsCheckbox = document.getElementById("terms").checked;

        if (email === "" || !ageCheckbox || !termsCheckbox) {
            alert("Please fill in all required fields before submitting.");
        } else {
            registerModal.style.display = 'none';
            registerPassModal.style.display = "flex";
            clearFormFields(); // ✅ Clear after successful submission
        }
    });

    // ✅ Clear all inputs inside the register modal
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
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const birthDate = document.getElementById("birth-date");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("cPassword");
    const showPassCheckbox = document.getElementById("see-pass");

    // Modals
    const registerModal = document.getElementById("registerPassModal");
    const loginModal = document.getElementById("loginModal");

    // Show/hide password checkbox
    showPassCheckbox.addEventListener("change", function () {
        const type = this.checked ? "text" : "password";
        password.type = type;
        confirmPassword.type = type;
    });

    createPassBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const firstVal = firstName.value.trim();
        const lastVal = lastName.value.trim();
        const birthVal = birthDate.value;
        const passVal = password.value;
        const confirmVal = confirmPassword.value;

        // Required fields
        if (!firstVal || !lastVal || !birthVal || !passVal || !confirmVal) {
            alert("Please fill in all required fields.");
            return;
        }

        // Capitalization check
        if (firstVal[0] !== firstVal[0].toUpperCase()) {
            alert("First Name must start with a capital letter.");
            return;
        }

        if (lastVal[0] !== lastVal[0].toUpperCase()) {
            alert("Last Name must start with a capital letter.");
            return;
        }

        // Password length
        if (passVal.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Password match
        if (passVal !== confirmVal) {
            alert("Passwords do not match.");
            return;
        }

        // ✅ Successful creation
        alert("Account successfully created!");

        // Hide registration modal
        if (registerModal) registerModal.style.display = "none";

        // Clear input fields
        firstName.value = "";
        lastName.value = "";
        birthDate.value = "";
        password.value = "";
        confirmPassword.value = "";
        showPassCheckbox.checked = false;
        password.type = "password";
        confirmPassword.type = "password";

        // Show login modal
        if (loginModal) loginModal.style.display = "block";
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

