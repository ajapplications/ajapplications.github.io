(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------------- Preloader ---------------- */
    var preloader = document.querySelector(".aj-preloader");
    if (preloader) {
      if (reducedMotion) {
        preloader.classList.add("is-hidden");
      } else {
        window.setTimeout(function () {
          preloader.classList.add("is-hidden");
        }, 1000);
      }
    }

    /* ---------------- Hero line reveal ---------------- */
    var hero = document.querySelector(".aj-hero-headline");
    if (hero) {
      window.setTimeout(function () { hero.classList.add("is-revealed"); }, reducedMotion ? 0 : 150);
    }

    /* ---------------- Scroll reveal ---------------- */
    var revealEls = document.querySelectorAll(".aj-reveal");
    if ("IntersectionObserver" in window && !reducedMotion) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* ---------------- Magnetic buttons ---------------- */
    if (!reducedMotion && !isTouch) {
      document.querySelectorAll(".aj-magnetic").forEach(function (btn) {
        btn.addEventListener("mousemove", function (e) {
          var r = btn.getBoundingClientRect();
          var x = (e.clientX - r.left - r.width / 2) * 0.18;
          var y = (e.clientY - r.top - r.height / 2) * 0.18;
          btn.style.transform = "translate(" + x + "px," + y + "px)";
        });
        btn.addEventListener("mouseleave", function () {
          btn.style.transform = "translate(0,0)";
        });
      });
    }

    /* ---------------- Custom cursor ---------------- */
    if (!reducedMotion && !isTouch) {
      var cursor = document.createElement("div");
      cursor.className = "aj-cursor";
      document.body.appendChild(cursor);
      document.addEventListener("mousemove", function (e) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursor.classList.add("is-active");
      });
      document.querySelectorAll("a, button, .aj-tech-item").forEach(function (el) {
        el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
        el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
      });
    }
  });
})();
