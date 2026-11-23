/**
 * PerfoFund — vanilla JS (no jQuery / Bootstrap).
 * Mobile nav, header state, scroll reveal, active section, back-to-top, contact form.
 */

const header = document.getElementById("site-header");
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");
const backToTop = document.getElementById("back-to-top");

/* ---------- Header: glass + border on scroll ---------- */
function onScroll(): void {
  const y = window.scrollY;
  if (header) {
    const solid = y > 24;
    header.classList.toggle("bg-navy-950/90", solid);
    header.classList.toggle("backdrop-blur-xl", solid);
    header.classList.toggle("border-white/10", solid);
    header.classList.toggle("shadow-card", solid);
    header.classList.toggle("border-transparent", !solid);
  }
  if (backToTop) {
    const show = y > 600;
    backToTop.classList.toggle("translate-y-20", !show);
    backToTop.classList.toggle("translate-y-0", show);
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
function setMenu(open: boolean): void {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.toggle("hidden", !open);
  menuButton.setAttribute("aria-expanded", String(open));
  iconOpen?.classList.toggle("hidden", open);
  iconClose?.classList.toggle("hidden", !open);
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

/* Close mobile menu after choosing a link */
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

/* ---------- Active nav link ---------- */
const sections = document.querySelectorAll<HTMLElement>("section[id]");
const navLinks = document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === id;
        link.classList.toggle("bg-white/10", active);
        link.classList.toggle("text-white", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
for (const s of sections) {
  sectionObserver.observe(s);
}

/* ---------- Back to top ---------- */
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Contact form (Formspree, AJAX) ---------- */
const form = document.getElementById("contact-form") as HTMLFormElement | null;
const status = document.getElementById("form-status");
const submitButton = document.getElementById("contact-submit") as HTMLButtonElement | null;

async function handleSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  if (!form || !status) return;

  if (!form.checkValidity()) {
    status.textContent = "Please complete all required fields with a valid email address.";
    status.className = "text-sm font-medium text-red-600";
    form.reportValidity();
    return;
  }

  status.textContent = "Sending…";
  status.className = "text-sm font-medium text-slate-600";
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.textContent = "Thanks for your submission — we will be in touch shortly.";
      status.className = "text-sm font-medium text-emerald-600";
      form.reset();
    } else {
      const data = (await response.json().catch(() => null)) as {
        errors?: Array<{ message: string }>;
      } | null;
      status.textContent =
        data?.errors?.map((e) => e.message).join(", ") ??
        "Oops! There was a problem submitting your form. Please email us directly.";
      status.className = "text-sm font-medium text-red-600";
    }
  } catch {
    status.textContent =
      "Oops! There was a problem submitting your form. Please email us directly.";
    status.className = "text-sm font-medium text-red-600";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

form?.addEventListener("submit", handleSubmit);
