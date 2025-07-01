document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".profile-tab-btn");
    const accountContent = document.querySelector(".profile-main-content");
    const deliverySectionWrapper = document.querySelector(".delivery-section-wrapper");
    const deliveryDetails = document.querySelector(".delivery-details");
    const addAddressBtn = document.getElementById("add-address-btn");

    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("profile-active"));
            button.classList.add("profile-active");

            const tab = button.getAttribute("data-tab");

            if (tab === "account") {
                accountContent.style.display = "block";
                deliverySectionWrapper.style.display = "none";
                deliveryDetails.style.display = "none";
            } else if (tab === "delivery") {
                accountContent.style.display = "none";
                deliverySectionWrapper.style.display = "block";
                deliveryDetails.style.display = "none";
            } else if (tab === "about") {
                // hide both sections if needed
                accountContent.style.display = "none";
                deliverySectionWrapper.style.display = "none";
                deliveryDetails.style.display = "none";
            }
        });
    });

    // Show delivery form when "Add Delivery Address" is clicked
    if (addAddressBtn) {
        addAddressBtn.addEventListener("click", () => {
            deliveryDetails.style.display = "block";
            deliverySectionWrapper.style.display = "none"; // optional: hide the button after showing form
        });
    }
});


