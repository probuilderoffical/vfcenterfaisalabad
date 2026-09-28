const PHONE_DISPLAY = "+92 322 6004947";
const PHONE_TEL = "+923226004947";
const WHATSAPP = "923226004947";

const page = document.body.dataset.page || "home";
const navItems = [
  ["home", "Home", "index.html"],
  ["leasing", "Leasing", "leasing.html"],
  ["businesses", "Businesses", "businesses.html"],
  ["gallery", "Gallery", "gallery.html"],
  ["contact", "Contact", "contact.html"]
];

const header = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <a class="brand" href="index.html" aria-label="VF Center Faisalabad home">
      <span class="brand-mark" aria-hidden="true"><b>V</b><i>F</i></span>
      <span><strong>VF Center</strong><small>Faisalabad</small></span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      ${navItems.map(([key,label,href]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
    <div class="header-actions">
      <a class="text-link desktop-call" href="tel:${PHONE_TEL}">Call management</a>
      <a class="button button--small" href="https://wa.me/${WHATSAPP}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20ask%20about%20commercial%20space%20at%20VF%20Center%20Faisalabad." target="_blank" rel="noopener">WhatsApp <span aria-hidden="true">↗</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span></button>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <div class="mobile-menu__inner">
      <p class="eyebrow">Explore VF Center</p>
      <nav aria-label="Mobile navigation">
        ${navItems.map(([key,label,href], index) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}><span>0${index + 1}</span>${label}</a>`).join("")}
      </nav>
      <div class="mobile-menu__contact"><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a><span>Main Jail Road, Faisalabad</span></div>
    </div>
  </div>`;

const footer = `
  <footer class="site-footer">
    <div class="footer-cta reveal">
      <div><p class="eyebrow">A place for business</p><h2>Put your business on Main Jail Road.</h2></div>
      <a class="button button--light" href="https://wa.me/${WHATSAPP}?text=Assalam-o-Alaikum%2C%20I%20am%20interested%20in%20leasing%20commercial%20space%20at%20VF%20Center%20Faisalabad." target="_blank" rel="noopener">Start a leasing enquiry <span aria-hidden="true">↗</span></a>
    </div>
    <div class="footer-grid">
      <div class="footer-brand"><a class="brand brand--footer" href="index.html"><span class="brand-mark" aria-hidden="true"><b>V</b><i>F</i></span><span><strong>VF Center</strong><small>Faisalabad</small></span></a><p>Commercial space and established businesses on Main Jail Road, Faisalabad.</p></div>
      <div><h3>Visit</h3><p>VF Center<br>Main Jail Road<br>Model Town C<br>Faisalabad, Pakistan</p><a href="https://www.google.com/maps/dir/?api=1&destination=31.4231764,73.0693418" target="_blank" rel="noopener">Get directions ↗</a></div>
      <div><h3>Contact</h3><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">WhatsApp management ↗</a><a href="https://www.facebook.com/VFcenterfaisalabad" target="_blank" rel="noopener">Facebook ↗</a></div>
      <div><h3>Navigate</h3>${navItems.map(([,label,href]) => `<a href="${href}">${label}</a>`).join("")}</div>
    </div>
    <div class="footer-base"><span>© <span data-year></span> VF Center Faisalabad</span><span>Availability and lease terms are subject to management confirmation.</span></div>
  </footer>`;

document.querySelector("[data-site-header]")?.insertAdjacentHTML("afterbegin", header);
document.querySelector("[data-site-footer]")?.insertAdjacentHTML("afterbegin", footer);
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileMenu.setAttribute("aria-hidden", String(open));
  document.body.classList.toggle("menu-open", !open);
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

const headerEl = document.querySelector("[data-header]");
const setHeader = () => headerEl?.classList.toggle("is-scrolled", window.scrollY > 20);
setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll("[data-accordion-button]").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const expanded = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll("[data-accordion-button]").forEach(other => {
      other.setAttribute("aria-expanded", "false");
      other.closest(".accordion-item")?.classList.remove("is-open");
    });
    if (!expanded) { button.setAttribute("aria-expanded", "true"); item?.classList.add("is-open"); }
  });
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("is-active"));
    button.classList.add("is-active");
    const value = button.dataset.filter;
    document.querySelectorAll("[data-business-category]").forEach(card => {
      card.hidden = value !== "all" && card.dataset.businessCategory !== value;
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]");
let galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
let galleryIndex = 0;
function showGallery(index) {
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[galleryIndex];
  if (!item || !lightbox || !lightboxImage) return;
  lightboxImage.src = item.dataset.full || item.querySelector("img")?.src || "";
  lightboxImage.alt = item.querySelector("img")?.alt || "VF Center photograph";
  if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || "";
  lightbox.showModal();
}
galleryItems.forEach((item, index) => item.addEventListener("click", () => showGallery(index)));
lightbox?.querySelector("[data-close]")?.addEventListener("click", () => lightbox.close());
lightbox?.querySelector("[data-prev]")?.addEventListener("click", () => showGallery(galleryIndex - 1));
lightbox?.querySelector("[data-next]")?.addEventListener("click", () => showGallery(galleryIndex + 1));
lightbox?.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
document.addEventListener("keydown", e => {
  if (!lightbox?.open) return;
  if (e.key === "ArrowLeft") showGallery(galleryIndex - 1);
  if (e.key === "ArrowRight") showGallery(galleryIndex + 1);
});

document.querySelectorAll("[data-whatsapp-form]").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "A visitor";
    const type = data.get("type") || "general enquiry";
    const message = data.get("message") || "Please share more information.";
    const text = `Assalam-o-Alaikum, my name is ${name}. I have a ${type} regarding VF Center Faisalabad. ${message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    const status = form.querySelector("[role=status]");
    if (status) status.textContent = "Opening WhatsApp with your enquiry…";
  });
});
