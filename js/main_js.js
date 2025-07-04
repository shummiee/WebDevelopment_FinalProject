// ========== REDIRECT ADMIN IF ALREADY LOGGED IN ==========
window.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const currentPath = window.location.pathname;

  if (userData && userData.isAdmin && currentPath !== "/admin/products") {
    window.location.href = "/admin/products";
  }
});

// ========== SHOW LOGIN MODAL ONLY IF NOT LOGGED IN ==========
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");
  const loginModal = document.getElementById("loginModal");
  if (!user && loginModal) {
    loginModal.style.display = "flex";
  }
});

// ========== FADE IMAGE SLIDESHOW ==========
const fadeImages = document.querySelectorAll('.fade-image');
let current = 0;
setInterval(() => {
  fadeImages[current].classList.remove('active');
  current = (current + 1) % fadeImages.length;
  fadeImages[current].classList.add('active');
}, 1000);


// ========== MODAL: Register Step 1 ==========
document.addEventListener("DOMContentLoaded", () => {
  const registerModal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeRegister");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      registerModal.style.display = "none";
    });
  }

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

  joinBtn?.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const ageCheckbox = document.getElementById("age").checked;
    const termsCheckbox = document.getElementById("terms").checked;

    if (!email || !ageCheckbox || !termsCheckbox) {
      alert("Please fill in all required fields before continuing.");
    } else {
      registerModal.style.display = "none";
      registerPassModal.style.display = "flex";
    }
  });
});

// ========== Register Final Step ==========
document.addEventListener("DOMContentLoaded", () => {
  const createPassBtn = document.getElementById("createPass");

  createPassBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const birthDate = document.getElementById("birth-date").value;
    const email = document.getElementById("email-register").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cPassword").value;

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
    document.getElementById("see-pass").checked = false;
  });
});

// ========== Show/Hide Password ==========
document.addEventListener("DOMContentLoaded", () => {
  const showPassCheckbox = document.getElementById("see-pass");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("cPassword");

  showPassCheckbox?.addEventListener("change", function () {
    const type = this.checked ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;
  });
});

// ========== LOGIN ==========
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");

  loginBtn?.addEventListener("click", async () => {
    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("🔐 Attempting login with:", email);

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("📦 Server Response:", data);

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      if (data.user.isAdmin === true) {
        console.log("✅ Admin detected, redirecting...");
        window.location.href = "/admin/products";
        return;
      }

      alert(`Welcome back, ${data.user.firstName}!`);
      loginModal.style.display = "none";
      updateProfileUI();


    } catch (err) {
      console.error("🔥 Login Error:", err);
      alert(err.message || "Login failed.");
    }
  });
});


// ========== Modal Switching ==========
document.addEventListener("DOMContentLoaded", () => {
  const registerModal = document.getElementById("registerModal");
  const registerPassModal = document.getElementById("registerPassModal");
  const loginModal = document.getElementById("loginModal");
  const showLoginLink = document.getElementById("showLogin");
  const showRegisterLink = document.getElementById("showRegister");

  showLoginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "none";
    registerPassModal.style.display = "none";
    loginModal.style.display = "flex";
  });

  showRegisterLink?.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    registerModal.style.display = "flex";
  });
});

// ========== Profile Modal Logic ==========
document.addEventListener("DOMContentLoaded", () => {
  const profileModal = document.getElementById("profileModal");
  const profileIcon = document.querySelector('a[aria-label="User"]');
  const closeProfileBtn = document.getElementById("closeProfile");

  profileIcon?.addEventListener("click", (e) => {
    e.preventDefault();
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      profileModal.classList.add("show");
      updateProfileUI();
    } else {
      document.getElementById("registerModal").style.display = "flex";
    }
  });

  closeProfileBtn?.addEventListener("click", () => {
    profileModal.classList.remove("show");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#profileModal") && !e.target.closest('a[aria-label="User"]')) {
      profileModal.classList.remove("show");
    }
  });
});

function updateProfileUI() {
  const userData = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const profileName = document.querySelector("#profileModal h3");

  if (profileName && userData.firstName) {
    profileName.textContent = `Hi ${userData.firstName}`;
  }
}

// ========== Product Card Click ==========
document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = "/viewProducts";
    });
  });
});

// ========== LOGOUT ==========
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");

    const profileModal = document.getElementById("profileModal");
    if (profileModal) profileModal.classList.remove("show");

    window.location.href = "/main"; // ✅ Go back to login/register page
  });
});

