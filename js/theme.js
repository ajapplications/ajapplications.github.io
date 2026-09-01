(function () {
  "use strict";

  var STORAGE_KEY = "aj-theme";
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(pref) {
    var resolved = pref === "system" ? (systemPrefersDark() ? "dark" : "light") : pref;
    root.setAttribute("data-theme", resolved);
    updateIcon(pref);
  }

  function updateIcon(pref) {
    var icon = document.querySelector("[data-theme-icon]");
    if (!icon) return;
    var map = { light: "bi-sun", dark: "bi-moon-stars", system: "bi-circle-half" };
    icon.className = "bi " + (map[pref] || "bi-circle-half");
  }

  function getStored() {
    return localStorage.getItem(STORAGE_KEY) || "system";
  }

  function cycle() {
    var order = ["light", "dark", "system"];
    var current = getStored();
    var next = order[(order.indexOf(current) + 1) % order.length];
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  applyTheme(getStored());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (getStored() === "system") applyTheme("system");
  });

  document.addEventListener("DOMContentLoaded", function () {
    updateIcon(getStored());
    var btns = document.querySelectorAll("[data-theme-toggle]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", cycle);
    });
  });
})();
