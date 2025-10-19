import { useEffect } from "react";

function useMenuScript() {
  useEffect(() => {
    // === Desktop menu ===
    const toggles = document.querySelectorAll(".menu-item .icon");
    toggles.forEach(btn => {
      btn.addEventListener("click", () => {
        const menuItem = btn.closest(".menu-item");
        const isOpen = menuItem.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    // === Mobile menu ===
    const mobileMenu = document.getElementById("mobile-menu");
    const open = document.getElementById("mobile-menu-open");
    const close = document.getElementById("mobile-menu-close");

    if (open && close && mobileMenu) {
      open.addEventListener("click", () => {
        mobileMenu.style.right = "0px";
      });
      close.addEventListener("click", () => {
        mobileMenu.style.right = "-290px";
      });
    }

    // === Mobile submenu ===
    const mobileToggles = document.querySelectorAll(".mobile-menu-item .m-icon");
    mobileToggles.forEach(btn => {
      btn.addEventListener("click", () => {
        const menuItem = btn.closest(".mobile-menu-item");
        const isOpen = menuItem.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    // === Mobile search bar ===
    // const searchOpen = document.getElementById("m-search-bar-open-btn");
    // const searchClose = document.getElementById("m-search-bar-close-btn");
    // const searchBar = document.getElementById("m-search-bar");

    // if (searchOpen && searchClose && searchBar) {
    //   searchOpen.addEventListener("click", () => (searchBar.style.display = "block"));
    //   searchClose.addEventListener("click", () => (searchBar.style.display = "none"));
    // }

    // === Sticky header ===
    const topHead = document.querySelector(".top-head");
    const mSearchBar = document.querySelector("#m-search-bar");
    const onScroll = () => {
      if (topHead) topHead.classList.toggle("sticky", window.scrollY > 0);
      if (mSearchBar) mSearchBar.classList.toggle("stickySearch", window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

export default useMenuScript;
