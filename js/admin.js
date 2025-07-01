// ========== ADD PRODUCTS ==========

document.addEventListener("DOMContentLoaded", () => {
  // Modal open/close setup
  const openModalBtn = document.getElementById("addProduct"); // Add Product +
  const modal = document.getElementById("addProductModal");
  const closeModalBtn = document.getElementById("closeProducts");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Form submission and validation
  const addProductBtn = document.querySelector(".add-product-btn");
  const productInputs = modal.querySelectorAll("input[required], select[required]");

  addProductBtn.addEventListener("click", () => {
    let allFilled = true;

    productInputs.forEach(input => {
      if (input.value.trim() === "") {
        allFilled = false;
      }
    });

    if (!allFilled) {
      alert("Please fill in all required fields before adding the product.");
    } else {
      modal.style.display = "none";
      alert("✅ Successfully added a product!");

      // Reset fields
      productInputs.forEach(input => input.value = "");
      const checkboxes = modal.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach(checkbox => checkbox.checked = false);
    }
  });
});


// ========== USERS..? ==========
