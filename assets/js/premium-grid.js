(function () {
  const gridSections = document.querySelectorAll("[data-grid-reveal]");

  if (!gridSections.length) {
    return;
  }

  gridSections.forEach((section) => {
    let rafId = null;
    let targetX = section.clientWidth * 0.7;
    let targetY = section.clientHeight * 0.35;

    const paint = () => {
      section.style.setProperty("--grid-x", targetX + "px");
      section.style.setProperty("--grid-y", targetY + "px");
      rafId = null;
    };

    const queuePaint = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(paint);
    };

    const updateFromEvent = (event) => {
      const bounds = section.getBoundingClientRect();
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      queuePaint();
    };

    const resetHighlight = () => {
      targetX = section.clientWidth * 0.7;
      targetY = section.clientHeight * 0.35;
      queuePaint();
    };

    resetHighlight();

    section.addEventListener("mousemove", updateFromEvent);
    section.addEventListener("mouseenter", queuePaint);
    section.addEventListener("mouseleave", resetHighlight);

    window.addEventListener("resize", () => {
      if (!section.matches(":hover")) {
        resetHighlight();
      }
    });
  });
})();
