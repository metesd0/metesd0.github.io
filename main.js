/* ============================================================
   Mete · Portfolyo — interactivity
   Live TR clock · scroll reveal · reduced-motion aware
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Istanbul clock (Europe/Istanbul) ---------- */
  var clockEl = document.getElementById("clock");
  function tick() {
    if (!clockEl) return;
    // Format in Europe/Istanbul regardless of viewer's timezone
    var t = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      timeZone: "Europe/Istanbul", hour12: false
    });
    clockEl.textContent = t;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // small stagger by DOM order within same parent
          var el = entry.target;
          var siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (c) {
            return c.classList.contains("reveal");
          });
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Subtle parallax on hero glow (disabled if reduced motion) ---------- */
  if (!prefersReduced) {
    var glow = document.querySelector(".glow");
    if (glow && window.matchMedia("(pointer: fine)").matches) {
      var raf = null;
      window.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var x = (e.clientX / window.innerWidth - 0.5) * 30;
          var y = (e.clientY / window.innerHeight - 0.5) * 30;
          glow.style.transform = "translate(" + x + "px," + y + "px)";
          raf = null;
        });
      }, { passive: true });
    }
  }
})();
