(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Contact form — no backend wired up; configurable endpoint placeholder */
    var form = document.querySelector("[data-contact-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = form.querySelector("[data-form-status]");
        if (status) {
          status.textContent = "This form is not yet connected to a backend endpoint. Please reach out via GitHub in the meantime.";
          status.classList.remove("d-none");
        }
      });
    }

    /* Current year in footer */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
