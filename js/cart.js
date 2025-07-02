document.addEventListener("DOMContentLoaded", function () {
    const selectAllFoot = document.querySelector(".cart-footer .select-all");
    const selectAllHead = document.querySelector(".select-all");
    const itemCheckboxes = document.querySelectorAll(".cart-item input[type='checkbox']:not(.sold-out-cb)");

    // When select-all in footer is toggled
    selectAllHead.addEventListener("change", function () {
      itemCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAllHead.checked;
      });
    });

    selectAllFoot.addEventListener("change", function () {
      itemCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAllFoot.checked;
      });
    });

    // Auto-update select-all when item checkboxes change
    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
        selectAllHead.checked = allChecked;
      });
    });

    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
        selectAllFoot.checked = allChecked;
      });
    });
  });