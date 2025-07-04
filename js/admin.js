// ========== ADD PRODUCT MODAL LOGIC + VALIDATION ==========
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("addProduct");
  const modal = document.getElementById("addProductModal");
  const closeBtn = document.getElementById("closeProducts");

  if (openBtn && modal && closeBtn) {
    // Open modal
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside the form
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Form validation before submit
    const form = modal.querySelector("form");
    const addBtn = form.querySelector(".add-product-btn");

    addBtn.addEventListener("click", (e) => {
      const requiredFields = modal.querySelectorAll("input[required], select[required]");
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault(); // stop form submit
        alert("⚠️ Please fill in all required fields.");
      } else {
        // Optional UX feedback
        alert("✅ Product submitted! It will appear shortly.");
      }
    });
  }
});
