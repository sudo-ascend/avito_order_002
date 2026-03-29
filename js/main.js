document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("site-header");
  const navCollapse = document.getElementById("mainNav");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxText = document.getElementById("lightbox-text");

  requestAnimationFrame(() => {
    body.classList.add("loaded");
  });

  const syncHeader = () => {
    if (!header) {
      return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 4% 0px",
      }
    );

    revealElements.forEach((item) => revealObserver.observe(item));
  } else {
    revealElements.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      const offset = header ? header.offsetHeight + 18 : 96;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });

      if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
        const collapseInstance = bootstrap.Collapse.getInstance(navCollapse);
        if (collapseInstance) {
          collapseInstance.hide();
        }
      }
    });
  });

  let lastTrigger = null;

  const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxText) {
      return;
    }

    lastTrigger = trigger;
    lightboxImage.src = trigger.dataset.lightboxImage || "";
    lightboxImage.alt = trigger.querySelector("img")?.alt || trigger.dataset.lightboxTitle || "";
    lightboxTitle.textContent = trigger.dataset.lightboxTitle || "";
    lightboxText.textContent = trigger.dataset.lightboxText || "";
    lightbox.hidden = false;

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
      body.classList.add("lightbox-open");
    });
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) {
      return;
    }

    lightbox.classList.remove("is-open");
    body.classList.remove("lightbox-open");

    window.setTimeout(() => {
      lightbox.hidden = true;
      lightboxImage.src = "";
      if (lastTrigger) {
        lastTrigger.focus();
      }
    }, 220);
  };

  document.querySelectorAll("[data-lightbox-image]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  lightbox?.querySelectorAll("[data-lightbox-close]").forEach((closer) => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
