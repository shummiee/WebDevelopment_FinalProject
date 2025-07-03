document.addEventListener("DOMContentLoaded", function () {
    const selectAllHead = document.querySelector(".select-all");
    const itemCheckboxes = document.querySelectorAll(".cart-item input[type='checkbox']:not(.sold-out-cb)");

    selectAllHead.addEventListener("change", function () {
      itemCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAllHead.checked;
      });
    });

    // Auto-update select-all when item checkboxes change
    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
        selectAllHead.checked = allChecked;
      });
    });
  });