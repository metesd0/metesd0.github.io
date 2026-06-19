/* ============================================================
   OFL STUDIO — interactivity
   scroll reveal · parallax glow · reduced-motion aware
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          var el = entry.target;
          var siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (c) {
            return c.classList.contains("reveal");
          });
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = Math.min(idx * 80, 320) + "ms";
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Parallax glow ---------- */
  if (!prefersReduced) {
    var glow = document.querySelector(".glow");
    if (glow && window.matchMedia("(pointer: fine)").matches) {
      var raf = null;
      window.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var x = (e.clientX / window.innerWidth - 0.5) * 28;
          var y = (e.clientY / window.innerHeight - 0.5) * 28;
          glow.style.transform = "translate(" + x + "px," + y + "px)";
          raf = null;
        });
      }, { passive: true });
    }
  }
})();
