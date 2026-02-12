document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // ✅ スムーススクロール（CSSの代用）
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // ======================
  // FAQ
  // ======================
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");
    const inner = item.querySelector(".faq__answer-inner");

    answer.style.maxHeight = "0px";

    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");

      btn.setAttribute("aria-expanded", String(isOpen));
      answer.setAttribute("aria-hidden", String(!isOpen));

      answer.style.maxHeight = isOpen ? inner.scrollHeight + "px" : "0px";
    });
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".faq__item.is-open").forEach((item) => {
      const answer = item.querySelector(".faq__answer");
      const inner = item.querySelector(".faq__answer-inner");
      answer.style.maxHeight = inner.scrollHeight + "px";
    });
  });
});

const setVh = () => {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
};

window.addEventListener("load", () => {

  // ✅ vhを確定させてからScrollTrigger生成
  setVh();

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  const isSp = window.matchMedia("(max-width: 767px)").matches;

  // ======================
  // 発火タイミング
  // ======================
  const startAbout = isSp ? "top 90%" : "top 70%";
  const startCards = isSp ? "top 90%" : "top 75%";
  const startUserWide = isSp ? "top 92%" : "top 150%";
  const startOnePoint = isSp ? "top 90%" : "top 75%";
  const startHowto = isSp ? "top 92%" : "top 70%";

  // ======================
  // hero
  // ======================
  const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

  heroTl
    .fromTo(".hero__bg-image", { opacity: 0 }, { opacity: 1, duration: 0.9 })
    .fromTo(".hero__title", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.4")
    .fromTo(".hero__description", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");

  // ======================
  // about
  // ======================
  gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: ".about",
      start: startAbout,
      toggleActions: "play none none none",
    },
  })
  .fromTo(".about__text", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9 })
  .fromTo(".about__media", { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.45");

  // ======================
  // item cards
  // ======================
  gsap.fromTo(
    ".item__card",
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".item__cards",
        start: startCards,
        toggleActions: "play none none none",
      },
    }
  );

  // ======================
  // user-wide
  // ======================
  gsap.fromTo(
    ".user-wide__img",
    { opacity: 0, scaleX: 0.96, filter: "blur(6px)" },
    {
      opacity: 1,
      scaleX: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".user-wide",
        start: startUserWide,
        once: true,
      },
      clearProps: "filter",
    }
  );

  // ======================
  // onepoint
  // ======================
  gsap.fromTo(
    ".item__onepoint",
    { opacity: 0, scale: 0.6, rotate: -6 },
    {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.5,
      ease: "back.out(2.4)",
      scrollTrigger: {
        trigger: ".item__feature",
        start: startOnePoint,
        once: true,
      },
    }
  );

  // ======================
  // howto（遅め）
  // ======================
  gsap.to(".howto__item", {
    scrollTrigger: {
      trigger: ".howto",
      start: startHowto,
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.18,
  });

  ScrollTrigger.refresh();
});

window.addEventListener("load", setVh);
window.addEventListener("orientationchange", setVh);

// =========================
// CTA SP：擬似 fixed
// =========================
(() => {
  const mq = window.matchMedia("(max-width: 767px)");
  const cta = document.querySelector(".cta");
  if (!cta) return;

  const update = () => {
    if (!mq.matches) {
      cta.style.removeProperty("--cta-bg-y");
      return;
    }

    const rect = cta.getBoundingClientRect();
    const vh = window.innerHeight;

    const progress = (vh - rect.top) / (vh + rect.height);
    const clampedP = Math.min(1, Math.max(0, progress));

    const y = (clampedP - 0.5) * 200;

    cta.style.setProperty("--cta-bg-y", `${y}px`);
  };

  const onScroll = () => requestAnimationFrame(update);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", () => setTimeout(update, 200));

  update();
})();
