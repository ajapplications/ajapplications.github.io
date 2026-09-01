(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".aj-navbar");
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Close offcanvas on link click
    var offcanvasEl = document.getElementById("ajOffcanvas");
    if (offcanvasEl && window.bootstrap) {
      var instance = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      offcanvasEl.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { instance.hide(); });
      });
    }
  });
})();
