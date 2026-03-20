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
  // thanks
  // ======================
  const thanksTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".thanks",
      start: isSp ? "top 90%" : "top 70%",
      once: true,
    },
    defaults: { ease: "power2.out" },
  });

  thanksTl
    .fromTo(
      ".thanks__line",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.7 }
    )
    .fromTo(
      ".thanks__title",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.2"
    )
    .fromTo(
      ".thanks__text",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );

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
  // repeat：タイトル＋説明（ふわっと）
  // ======================
  const repeatTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".repeat",
      start: isSp ? "top 92%" : "top 75%",
      once: true,
    },
    defaults: { ease: "power2.out" }
  });

  repeatTl
    .fromTo(
      ".repeat__title",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(
      ".repeat__description",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );

  // ======================
  // repeat：カード3枚（順番にふわっと）
  // ======================
  gsap.to(".repeat__card", {
    scrollTrigger: {
      trigger: ".repeat__cards",
      start: isSp ? "top 92%" : "top 80%",
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.15,
  });

  // ======================
  // repeat：ビジュアル画像（ふわっと）
  // ======================
  gsap.to(".repeat__visual-img", {
    scrollTrigger: {
      trigger: ".repeat__visual",
      start: isSp ? "top 92%" : "top 80%",
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power2.out",
  });

// ======================
// delicate（新デザイン）
// ======================
(() => {
  const root = document.querySelector(".delicate");
  if (!root || !window.gsap || !window.ScrollTrigger) return;

  const startDelicate = isSp ? "top 92%" : "top 75%";

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: root,
      start: startDelicate,
      once: true,
    },
  });

  tl
    // ヘッダータイトル
    .to(".delicate__header-title", { opacity: 1, y: 0, duration: 0.6 })

    // 上線：左→右
    .fromTo(
      ".delicate__header-line--top",
      { opacity: 0, scaleX: 0, transformOrigin: "left center" },
      { opacity: 1, scaleX: 1, duration: 0.7 },
      "-=0.2"
    )

    // 下線：右→左
    .fromTo(
      ".delicate__header-line--bottom",
      { opacity: 0, scaleX: 0, transformOrigin: "right center" },
      { opacity: 1, scaleX: 1, duration: 0.7 },
      "-=0.6"
    )

    // 上段：テキストブロック
    .to(".delicate__text-block", { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")

    // 上段：女性イラスト
    .to(".delicate__woman-illust", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")

    // 下段：タイトル
    .to(".delicate__lower-title", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")

    // 下段：製品画像
    .to(".delicate__product", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")

    // 下段：説明テキスト
    .to(".delicate__description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
})();

// ======================
// voice：タイトル＋線（左右から伸びる）
// ======================
const voiceTitleTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".voice",
    start: isSp ? "top 92%" : "top 75%",
    once: true,
  },
  defaults: { ease: "power2.out" }
});

voiceTitleTl
  .fromTo(
    ".voice__title",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.55 }
  )
  // 上線：左→右
  .fromTo(
    ".voice__line--top",
    { opacity: 0, scaleX: 0, transformOrigin: "left center" },
    { opacity: 1, scaleX: 1, duration: 0.7 },
    "-=0.15"
  )
  // 下線：右→左
  .fromTo(
    ".voice__line--bottom",
    { opacity: 0, scaleX: 0, transformOrigin: "right center" },
    { opacity: 1, scaleX: 1, duration: 0.7 },
    "-=0.55"
  )
  // サブタイトル（任意：ふわっと）
  .fromTo(
    ".voice__subtitle",
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.55 },
    "-=0.35"
  );

// ======================
// 利用者の声（無限ループ / 中央カードactive / PC 3枚見え）完全版
// - 端で止まらずループ（先頭/末尾の複製で実現）
// - ボタンで中央に寄せる
// - スクロール/スワイプでも中央に近いカードをactive化
// - dotsは「本物のカード数」だけで管理
// ======================
(() => {
  const root = document.querySelector("[data-voice-slider]");
  if (!root) return;

  const viewport = root.querySelector("[data-voice-viewport]");
  const track = root.querySelector("[data-voice-track]");
  const btnPrev = root.querySelector("[data-voice-prev]");
  const btnNext = root.querySelector("[data-voice-next]");
  const dotsWrap = root.querySelector("[data-voice-dots]");

  if (!viewport || !track) return;

  // まず「本物」のカード一覧を取得
  const originals = Array.from(track.querySelectorAll("[data-voice-card]"));
  const realCount = originals.length;
  if (realCount === 0) return;

  // ----------------------
  // ループ用に複製（前後に同数）
  // ----------------------
  // 既に複製済みなら二重複製を避ける
  if (!track.dataset.loopReady) {
    originals.forEach((card, i) => {
      card.dataset.realIndex = String(i); // 本物のインデックス
    });

    // 先頭に「最後のセット」を追加（逆順でprepend）
    for (let i = realCount - 1; i >= 0; i--) {
      const clone = originals[i].cloneNode(true);
      clone.dataset.realIndex = String(i);
      clone.dataset.isClone = "true";
      track.prepend(clone);
    }

    // 末尾に「最初のセット」を追加
    for (let i = 0; i < realCount; i++) {
      const clone = originals[i].cloneNode(true);
      clone.dataset.realIndex = String(i);
      clone.dataset.isClone = "true";
      track.appendChild(clone);
    }

    track.dataset.loopReady = "true";
  }

  // 複製後のカード一覧（クローン含む）
  let cards = Array.from(track.querySelectorAll("[data-voice-card]"));

  // 「本物」領域の開始位置（先頭に realCount 個クローンを足したので）
  const OFFSET = realCount; // 本物は cards[OFFSET] から始まる

  // ----------------------
  // dots生成（本物の枚数だけ）
  // ----------------------
  const dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < realCount; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "voice__dot";
      b.setAttribute("aria-label", `スライド ${i + 1}`);
      b.addEventListener("click", () => {
        // 現在地から一番近い「同realIndex」のカードへ寄せる（ループで距離が短い方へ）
        goToNearestRealIndex(i, true);
      });
      dotsWrap.appendChild(b);
      dots.push(b);
    }
  }

  // ----------------------
  // 状態
  // ----------------------
  // current は「cards配列上のインデックス（クローン含む）」
  let current = OFFSET + (realCount >= 3 ? 1 : 0); // 初期：2枚目を中央に

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const getRealIndexByCard = (card) => {
    const v = card?.dataset?.realIndex;
    return v ? Number(v) : 0;
  };

  const setActiveByCurrent = () => {
    const realIndex = getRealIndexByCard(cards[current]);

    cards.forEach((c, i) => c.classList.toggle("is-active", i === current));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === realIndex));
  };

  // 指定カードをviewport中央へ
  const centerTo = (card, smooth) => {
    const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
    viewport.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  // ----------------------
  // ループ境界の補正（クローン領域に入ったら本物へ“瞬間移動”）
  // ----------------------
  const normalizeIfNeeded = () => {
    // 本物領域： [OFFSET .. OFFSET+realCount-1]
    // クローン領域：
    //   前： [0 .. OFFSET-1]
    //   後： [OFFSET+realCount .. OFFSET+realCount*2-1]
    if (current < OFFSET) {
      current = current + realCount; // 前クローン → 本物へ
      setActiveByCurrent();
      centerTo(cards[current], false);
      return;
    }

    if (current >= OFFSET + realCount) {
      current = current - realCount; // 後クローン → 本物へ
      setActiveByCurrent();
      centerTo(cards[current], false);
      return;
    }
  };

  // ----------------------
  // 「中央に一番近いカード」を current にする
  // ----------------------
  const updateByScroll = () => {
    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;

    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }

    if (best !== current) {
      current = best;
      setActiveByCurrent();
    }
  };

  // スクロール終了っぽいタイミングで境界補正（クローン→本物ジャンプ）
  let scrollEndTimer = null;
  const onScroll = () => {
    updateByScroll();

    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      normalizeIfNeeded();
    }, 120);
  };

  viewport.addEventListener("scroll", onScroll, { passive: true });

  // ----------------------
  // ボタン：常に動く（止めない）
  // ----------------------
  const goTo = (nextIndex, smooth = true) => {
    current = clamp(nextIndex, 0, cards.length - 1);
    setActiveByCurrent();
    centerTo(cards[current], smooth);
  };

  btnPrev?.addEventListener("click", () => {
    goTo(current - 1, true);
  });

  btnNext?.addEventListener("click", () => {
    goTo(current + 1, true);
  });

  // ----------------------
  // dotsクリック：同realIndexの「一番近い」カードを選ぶ
  // ----------------------
  const goToNearestRealIndex = (targetRealIndex, smooth = true) => {
    // cardsの中から realIndex が一致する候補を拾う（3箇所にある）
    const candidates = [];
    for (let i = 0; i < cards.length; i++) {
      if (getRealIndexByCard(cards[i]) === targetRealIndex) candidates.push(i);
    }
    if (candidates.length === 0) return;

    // viewport中心から最短距離の候補へ
    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
    let best = candidates[0];
    let bestDist = Infinity;

    candidates.forEach((idx) => {
      const card = cards[idx];
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
    });

    goTo(best, smooth);
  };

  // ----------------------
  // 初期位置：本物領域の中央に寄せる
  // ----------------------
  const init = () => {
    // current を本物領域に置いてからセンター
    const initialReal = realCount >= 3 ? 1 : 0;
    current = OFFSET + initialReal;

    setActiveByCurrent();
    centerTo(cards[current], false);

    // 念のため一回補正
    normalizeIfNeeded();
  };

  // リサイズでも中央維持
  window.addEventListener("resize", () => {
    // cardsがリフローで変わる可能性があるので取り直し
    cards = Array.from(track.querySelectorAll("[data-voice-card]"));
    setActiveByCurrent();
    centerTo(cards[current], false);
  });

  init();
})();

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