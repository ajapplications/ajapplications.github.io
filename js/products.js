/* ==========================================================================
   AJ APPLICATIONS — Product & Project data registry
   Single source of truth used by the ecosystem visual and the projects grid.
   ========================================================================== */

window.AJ_PRODUCTS = [
  {
    name: "NEXAVAULT",
    slug: "nexavault",
    category: "Cloud Infrastructure",
    status: "IN DEVELOPMENT",
    description: "Self-hosted private cloud storage that runs on hardware you control.",
    technologies: ["Node.js", "SQLite", "Docker"],
    tag: "Infrastructure"
  },
  {
    name: "AJ Torrenties",
    slug: "aj-torrenties",
    category: "Desktop / Networking",
    status: "IN DEVELOPMENT",
    description: "A high-performance torrent and download manager built as an original desktop application.",
    technologies: ["Desktop", "Networking"],
    tag: "Infrastructure"
  },
  {
    name: "AJ.Live",
    slug: "aj-live",
    category: "Sports Streaming / Real-Time",
    status: "IN DEVELOPMENT",
    description: "Sports streaming infrastructure built around RTMP ingest and HLS delivery.",
    technologies: ["RTMP", "HLS", "Node.js"],
    tag: "Media"
  },
  {
    name: "NovaTalk",
    slug: "novatalk",
    category: "Communication / Real-Time",
    status: "LIVE",
    description: "Anonymous real-time video and text chat built on WebRTC and Socket.IO.",
    technologies: ["WebRTC", "Socket.IO"],
    tag: "Communication"
  },
  {
    name: "AJ AI",
    slug: "aj-ai",
    category: "AI / Local AI",
    status: "IN DEVELOPMENT",
    description: "A local AI assistant built around Ollama, local models, and retrieval.",
    technologies: ["Ollama", "RAG", "Local LLMs"],
    tag: "AI"
  },
  {
    name: "Castrix",
    slug: "castrix",
    category: "Music / Media",
    status: "BETA",
    description: "A music streaming platform with artist pages, playlists, and Telegram-based administration.",
    technologies: ["MongoDB", "Telegram Bot API"],
    tag: "Media"
  },
  {
    name: "TarabTendo",
    slug: "tarabtendo",
    category: "Games",
    status: "AWAITING HOSTING",
    description: "An intentionally difficult HTML5 browser platformer with reactive audio and glitch effects.",
    technologies: ["Canvas 2D", "JavaScript"],
    tag: "Games"
  },
  {
    name: "AJ Search",
    slug: "aj-search",
    category: "Web",
    status: "EXPERIMENTAL",
    description: "An in-progress search experiment exploring query handling and result ranking.",
    technologies: ["JavaScript"],
    tag: "Web"
  },
  {
    name: "AJ ADS",
    slug: "aj-ads",
    category: "Business",
    status: "IN DEVELOPMENT",
    description: "An advertising and listings system built for AJ APPLICATIONS products.",
    technologies: ["Node.js"],
    tag: "Business"
  },
  {
    name: "AJdroid",
    slug: "ajdroid",
    category: "Mobile",
    status: "IN DEVELOPMENT",
    description: "An Android-focused mobile project exploring native and cross-platform tooling.",
    technologies: ["Android"],
    tag: "Mobile"
  },
  {
    name: "AJhome Launcher",
    slug: "ajhome-launcher",
    category: "Mobile",
    status: "EXPERIMENTAL",
    description: "A custom Android home-screen launcher experiment.",
    technologies: ["Android"],
    tag: "Mobile"
  },
  {
    name: "AJ Cine",
    slug: "aj-cine",
    category: "Media",
    status: "PROJECT",
    description: "A media-catalog project exploring browsing and discovery interfaces.",
    technologies: ["JavaScript"],
    tag: "Media"
  },
  {
    name: "StreamNova",
    slug: "streamnova",
    category: "Media / Streaming",
    status: "PROJECT",
    description: "A streaming-focused project adjacent to the AJ.Live infrastructure work.",
    technologies: ["Node.js"],
    tag: "Media"
  },
  {
    name: "AJ Talk to Stranger",
    slug: "aj-talk-to-stranger",
    category: "Communication",
    status: "ARCHIVED",
    description: "An early anonymous chat experiment that preceded NovaTalk.",
    technologies: ["Socket.IO"],
    tag: "Communication"
  },
  {
    name: "AJ File",
    slug: "aj-file",
    category: "Infrastructure",
    status: "PROJECT",
    description: "A file-handling utility project exploring upload and transfer workflows.",
    technologies: ["Node.js"],
    tag: "Infrastructure"
  },
  {
    name: "AJ SoftStore",
    slug: "aj-softstore",
    category: "Business",
    status: "PRIVATE",
    description: "An internal software-distribution project.",
    technologies: ["Web"],
    tag: "Business"
  },
  {
    name: "AJ Softiey",
    slug: "aj-softiey",
    category: "Business",
    status: "PRIVATE",
    description: "An internal utility and tooling project.",
    technologies: ["Web"],
    tag: "Business"
  },
  {
    name: "MAS Billing Studio",
    slug: "mas-billing-studio",
    category: "Business",
    status: "PROJECT",
    description: "A billing and invoicing tool built for small-business workflows.",
    technologies: ["JavaScript"],
    tag: "Business"
  },
  {
    name: "AJ GTA San Andreas",
    slug: "aj-gta-san-andreas",
    category: "Games",
    status: "EXPERIMENTAL",
    description: "A modding and scripting experiment built around the Grand Theft Auto: San Andreas engine.",
    technologies: ["Modding"],
    tag: "Games"
  }
];

/* ---------------------------------------------------------------------- */
/* Ecosystem visual — hover interactivity                                  */
/* ---------------------------------------------------------------------- */

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.querySelector(".aj-ecosystem");
    if (!wrap) return;
    var tooltip = wrap.querySelector(".aj-ecosystem-tooltip");
    var nodes = wrap.querySelectorAll(".aj-ecosystem-node[data-slug]");

    nodes.forEach(function (node) {
      node.addEventListener("mouseenter", function (e) {
        node.classList.add("is-hover");
        if (!tooltip) return;
        tooltip.innerHTML = "<strong>" + node.getAttribute("data-name") + "</strong><br>" +
          "<span class='t-cat'>" + node.getAttribute("data-category") + " &middot; " + node.getAttribute("data-status") + "</span>";
        tooltip.classList.add("is-visible");
      });
      node.addEventListener("mousemove", function (e) {
        if (!tooltip) return;
        var rect = wrap.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left) + "px";
        tooltip.style.top = (e.clientY - rect.top) + "px";
      });
      node.addEventListener("mouseleave", function () {
        node.classList.remove("is-hover");
        if (tooltip) tooltip.classList.remove("is-visible");
      });
      node.addEventListener("click", function () {
        var slug = node.getAttribute("data-slug");
        if (slug) window.location.href = (wrap.getAttribute("data-root") || "") + "products/" + slug + ".html";
      });
    });
  });
})();

/* ---------------------------------------------------------------------- */
/* Projects page — filtering                                               */
/* ---------------------------------------------------------------------- */

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector("[data-projects-grid]");
    var filterBar = document.querySelector("[data-filter-bar]");
    if (!grid || !filterBar) return;

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".aj-filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".aj-filter-btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var tag = btn.getAttribute("data-tag");
      grid.querySelectorAll("[data-tag]").forEach(function (card) {
        var show = tag === "All" || card.getAttribute("data-tag") === tag;
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
