//
// created by fariz fadlilah
// 2026
//

// color-mode
(() => {
  "use strict";

  const html = document.documentElement;
  const themeSwitcher = window.matchMedia("(prefers-color-scheme: dark)");

  // =========================
  // Local Storage
  // =========================
  const getStoredTheme = () => localStorage.getItem("theme");

  const setStoredTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };

  // =========================
  // Get Preferred Theme
  // =========================
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();

    if (storedTheme) {
      return storedTheme;
    }

    return themeSwitcher.matches ? "dark" : "light";
  };

  // =========================
  // Apply Theme
  // =========================
  const setTheme = (theme) => {
    const activeTheme =
      theme === "auto" ? (themeSwitcher.matches ? "dark" : "light") : theme;

    html.setAttribute("data-bs-theme", activeTheme);
  };

  // =========================
  // Update Icon
  // =========================
  const updateThemeIcon = (theme) => {
    const icon = document.querySelector(".theme-icon-active");

    if (!icon) return;

    // Hapus icon sebelumnya
    icon.classList.remove("fa-sun", "fa-moon", "fa-circle-half-stroke");

    // Tambahkan icon baru
    if (theme === "light") {
      icon.classList.add("fa-sun");
    } else if (theme === "dark") {
      icon.classList.add("fa-moon");
    } else {
      icon.classList.add("fa-circle-half-stroke");
    }
  };

  // =========================
  // Active Button
  // =========================
  const showActiveTheme = (theme) => {
    document.querySelectorAll("[data-bs-theme-value]").forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    const activeBtn = document.querySelector(
      `[data-bs-theme-value="${theme}"]`,
    );

    if (activeBtn) {
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-pressed", "true");
    }

    updateThemeIcon(theme);
  };

  // =========================
  // Initial Theme
  // =========================
  const storedTheme = getPreferredTheme();

  setTheme(storedTheme);

  // =========================
  // System Theme Changed
  // =========================
  themeSwitcher.addEventListener("change", () => {
    const currentTheme = getStoredTheme();

    if (!currentTheme || currentTheme === "auto") {
      setTheme("auto");
      showActiveTheme("auto");
    }
  });

  // =========================
  // DOM Ready
  // =========================
  window.addEventListener("DOMContentLoaded", () => {
    const theme = getStoredTheme() || "auto";

    showActiveTheme(theme);

    document.querySelectorAll("[data-bs-theme-value]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-bs-theme-value");

        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();
// /color-mode

// ======================================================
// APP INITIALIZER
// Bootstrap 5 + Multi Page Support
// ======================================================

// multipage to navigation and themeImage
document.addEventListener("DOMContentLoaded", () => {
  // detect current page
  const path = window.location.pathname;
  const currentPage = path.split("/").pop();
  const isIndexPage =
    currentPage === "index.html" ||
    currentPage === "index.php" ||
    currentPage === "";

  const isDashboardPage =
    currentPage === "dashboard.html" || currentPage === "dashboard.php";

  initNavbar();

  if (isIndexPage) {
    initThemeImage();
  }

  if (isDashboardPage) {
    console.log("Dashboard Loaded");
  }
});

// navigation
function initNavbar() {
  const navbarIndex = document.querySelector("#navbarIndex");
  const navbarContainer = document.querySelector("#navbarContainer");
  const navLinks = document.querySelectorAll(".nav-pills .nav-link");
  const handleNavbarScroll = () => {
    if (!navbarIndex || !navbarContainer) return;

    const isScrolled = window.scrollY > 0;
    navbarIndex.classList.toggle("bg-transparent", !isScrolled);
    navbarIndex.classList.toggle("bg-body-tertiary", isScrolled);
    navbarIndex.classList.toggle("shadow", isScrolled);
    navbarContainer.classList.toggle("shadow-sm", !isScrolled);
  };

  handleNavbarScroll();
  // active-link
  window.addEventListener("scroll", handleNavbarScroll);
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      document
        .querySelector(".nav-pills .nav-link.active")
        ?.classList.remove("active");

      this.classList.add("active");
    });
  });
}
// active-link
// navigation

// color-mode-image
function initThemeImage() {
  const themeImage = document.getElementById("themeImage");
  if (!themeImage) return;
  const themeImages = {
    light: "./img/identity1.png",
    dark: "./img/identity.png",
  };

  const updateThemeImage = () => {
    const theme =
      document.documentElement.getAttribute("data-bs-theme") || "light";

    themeImage.src = themeImages[theme] || themeImages.light;
  };

  updateThemeImage();
  new MutationObserver(updateThemeImage).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
  });
}
// color-mode-image
// multipage to navigation and themeImage
