// ========== FADE IMAGE SLIDESHOW ==========
const images = document.querySelectorAll('.fade-image');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 1000);

// ========== MODAL: Register Step 1 ==========
/*document.addEventListener("DOMContentLoaded", () => {
  const registerModal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeRegister");
  const userIcon = document.querySelector('a[aria-label="User"]');

  if (userIcon) {
    userIcon.addEventListener("click", (e) => {
      e.preventDefault();
      registerModal.style.display = "flex";
    });
  }

  closeBtn.addEventListener("click", () => {
    registerModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === registerModal) {
      registerModal.style.display = "none";
    }
  });
});

// ========== Register Step 2 ==========
document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.getElementById("continue-btn");
  const registerModal = document.getElementById("registerModal");
  const registerPassModal = document.getElementById("registerPassModal");
  const emailInput = registerModal.querySelector('input[type="email"]');

  joinBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const ageCheckbox = document.getElementById("age").checked;
    const termsCheckbox = document.getElementById("terms").checked;

    if (email === "" || !ageCheckbox || !termsCheckbox) {
      alert("Please fill in all required fields before continuing.");
    } else {
      registerModal.style.display = "none";
      registerPassModal.style.display = "flex";
    }
  });
});*/

// ========== Password Step ==========
document.addEventListener("DOMContentLoaded", () => {
  const createPassBtn = document.getElementById("createPass");

  createPassBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const birthDate = document.getElementById("birth-date").value;
    const email = document.getElementById("email-register").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cPassword").value;
    const showPassCheckbox = document.getElementById("see-pass");

    if (!firstName || !lastName || !birthDate || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (firstName[0] !== firstName[0].toUpperCase()) {
      alert("First Name must start with a capital letter.");
      return;
    }

    if (lastName[0] !== lastName[0].toUpperCase()) {
      alert("Last Name must start with a capital letter.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, birthDate, email, password, confirmPassword }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert(data.message || "Registration successful!");
        document.getElementById("registerPassModal").style.display = "none";
        document.getElementById("loginModal").style.display = "flex";
      })
      .catch((err) => {
        console.error("🔥 FETCH ERROR:", err);
        alert(err.message || "Failed to fetch – check if server is reachable.");
      });

    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("birth-date").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cPassword").value = "";
    showPassCheckbox.checked = false;
  });
});

// ========== Show/Hide Password ==========
document.addEventListener("DOMContentLoaded", () => {
  const showPassCheckbox = document.getElementById("see-pass");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("cPassword");

  showPassCheckbox.addEventListener("change", function () {
    const type = this.checked ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;
  });
});

// ========== Login ==========
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const emailInput = document.getElementById("email-login");
  const passwordInput = document.getElementById("password-login");

  loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert(data.message);
        loginModal.style.display = "none";
        emailInput.value = "";
        passwordInput.value = "";
      })
      .catch((err) => {
        alert(err.message || "Login failed.");
      });
  });
});

// ========== Modal Toggling ==========
document.addEventListener("DOMContentLoaded", () => {
  const registerModal = document.getElementById("registerModal");
  const registerPassModal = document.getElementById("registerPassModal");
  const loginModal = document.getElementById("loginModal");
  const showLoginLink = document.getElementById("showLogin");
  const showRegisterLink = document.getElementById("showRegister");
  const closeLogin = document.getElementById("closeLogin");
  const closeRegisterPass = document.getElementById("closeRegisterPass");
  if (showLoginLink) {
    showLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      registerModal.style.display = "none";
      registerPassModal.style.display = "none";
      loginModal.style.display = "flex";
    });
  }

  if (showRegisterLink) {
    showRegisterLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginModal.style.display = "none";
      registerModal.style.display = "flex";
    });
  }

  if (closeLogin) closeLogin.addEventListener("click", () => loginModal.style.display = "none");
  if (closeRegisterPass) closeRegisterPass.addEventListener("click", () => registerPassModal.style.display = "none");

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === registerPassModal) registerPassModal.style.display = "none";
  });
});

// ========== Profile Modal Toggling (if logged in) ==========

document.addEventListener("DOMContentLoaded", () => {
  const profileModal = document.getElementById("profileModal");
  const openProfileBtn = document.getElementById("openProfile");
  const closeProfileBtn = document.getElementById("closeProfile");

  openProfileBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    profileModal.classList.add("show");
  });

  closeProfileBtn?.addEventListener("click", () => {
    profileModal.classList.remove("show");
  });

  document.addEventListener("click", (e) => {
    const isClickInside = profileModal.contains(e.target);
    const isModalVisible = profileModal.classList.contains("show");

    if (isModalVisible && !e.target.closest(".profile-content") && !e.target.closest("#openProfile")) {
      profileModal.classList.remove("show");
    }
  });
});



// ========== PRODUCT CLICK REDIRECT ==========
document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = "/viewProducts";
    });
  });
});

