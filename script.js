// Theme toggle (dark/light) + small UX helpers.
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const updatedEl = document.getElementById("lastUpdated");
  const copyBtn = document.getElementById("copyEmail");
  const copyBtns = document.querySelectorAll("[data-copy]");

  const preferred = localStorage.getItem("theme");
  if (preferred === "light" || preferred === "dark") {
    root.setAttribute("data-theme", preferred);
  } else {
    // default: follow OS preference
    const isLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", isLight ? "light" : "dark");
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  if (updatedEl) updatedEl.textContent = new Date(document.lastModified).toISOString().slice(0, 10);

    function wireCopy(btnEl, value) {
    btnEl.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(value);

        // If the button is icon-only, keep the icon and show a small "Copied" hint via CSS.
        const hasIcon = !!btnEl.querySelector("svg");
        if (hasIcon) {
          btnEl.classList.add("is-copied");
          setTimeout(() => btnEl.classList.remove("is-copied"), 1200);
          return;
        }

        // Text button fallback
        const prev = btnEl.textContent;
        btnEl.textContent = "Copied";
        setTimeout(() => (btnEl.textContent = prev), 1200);
      } catch (e) {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = value;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    });
  }

  if (copyBtn) {
    const email = copyBtn.getAttribute("data-email") || copyBtn.dataset.email || "";
    if (email) wireCopy(copyBtn, email);
  }

  copyBtns.forEach((b) => wireCopy(b, b.getAttribute("data-copy") || ""));


  // Publications filter tabs (All / First Author / Full Paper / Poster / Preprint)
  // Publications filter tabs (All / First Author / Full Paper / Poster / Preprint)
const pubFilterBtns = Array.from(document.querySelectorAll("[data-pub-filter]"));
const pubItems = Array.from(document.querySelectorAll("[data-pub-item]"));
const pubEmpty = document.getElementById("pubEmpty");

function applyPubFilter(filter) {
  let visible = 0;

  pubItems.forEach((item) => {
    const types = (item.getAttribute("data-type") || "")
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const isFirst = (item.getAttribute("data-first") || "false").toLowerCase() === "true";

    let show = false;
    if (filter === "all") show = true;
    else if (filter === "first") show = isFirst;
    else show = types.includes(filter);

    item.style.display = show ? "" : "none";
    if (show) visible += 1;
  });

  if (pubEmpty) pubEmpty.hidden = visible !== 0;
}

if (pubFilterBtns.length && pubItems.length) {
  pubFilterBtns.forEach((b) => {
    b.addEventListener("click", () => {
      const filter = (b.getAttribute("data-pub-filter") || "all").toLowerCase();

      pubFilterBtns.forEach((x) => {
        const active = x === b;
        x.classList.toggle("is-active", active);
        x.setAttribute("aria-selected", active ? "true" : "false");
      });

      applyPubFilter(filter);
    });
  });

  // Default: use whichever is-active, otherwise all
  const activeBtn = pubFilterBtns.find((x) => x.classList.contains("is-active"));
  applyPubFilter(activeBtn ? activeBtn.getAttribute("data-pub-filter") : "all");
}

  // --- Project image lightbox ---
(() => {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  if (!lb || !lbImg) return;

  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || "Expanded image";
    lb.hidden = false;
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lb.hidden = true;
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    lbImg.alt = "";
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lightbox]");
    if (btn) {
      const src = btn.getAttribute("data-src");
      const alt = btn.getAttribute("data-alt") || "";
      if (src) open(src, alt);
      return;
    }

    if (e.target.closest("[data-lightbox-close]")) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lb.hidden) close();
  });
})();


})();
