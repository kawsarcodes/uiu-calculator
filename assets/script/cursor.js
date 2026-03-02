document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursorDot = document.createElement("div");
    cursorDot.classList.add("cursor-dot");
    const cursorOutline = document.createElement("div");
    cursorOutline.classList.add("cursor-outline");
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      if (!document.body.classList.contains("mouse-in-window")) {
        document.body.classList.add("mouse-in-window");
      }
    });
    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    document.addEventListener("mouseleave", () => {
      document.body.classList.remove("mouse-in-window");
    });
    document.addEventListener("mouseenter", () => {
      document.body.classList.add("mouse-in-window");
    });
    const addHoverEffect = () => document.body.classList.add("cursor-hover");
    const removeHoverEffect = () => document.body.classList.remove("cursor-hover");
    const interactiveSelectors = `
      a, button, input, textarea, select, 
      .color-btn, .mode-btn, .theme-btn, 
      [role="button"], label
    `;
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener("mouseenter", addHoverEffect);
      el.addEventListener("mouseleave", removeHoverEffect);
    });
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
           document.querySelectorAll(interactiveSelectors).forEach((el) => {
             el.removeEventListener("mouseenter", addHoverEffect);
             el.removeEventListener("mouseleave", removeHoverEffect);
             el.addEventListener("mouseenter", addHoverEffect);
             el.addEventListener("mouseleave", removeHoverEffect);
           });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});