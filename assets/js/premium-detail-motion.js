document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    if (!body || !body.classList.contains("theme-premium--detail")) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionTargets = [
        ".detail-hero-copy",
        ".section-servico",
        ".metodo-section",
        ".contato-section",
        ".destaque",
        ".dna-section",
        ".detail-main"
    ];

    const groupedTargets = [
        ".cards-beneficios > *",
        ".ciclo-container > *",
        ".vagas-grid > *",
        ".contato-links > *",
        ".detail-chip-row > *"
    ];

    const targets = new Set();

    sectionTargets.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.classList.add("reveal-on-scroll");
            targets.add(element);
        });
    });

    groupedTargets.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add("reveal-on-scroll");
            element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 80}ms`);
            targets.add(element);
        });
    });

    body.classList.add("motion-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        targets.forEach((element) => element.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px"
        });

        targets.forEach((element) => observer.observe(element));
    }

    if (reduceMotion) {
        return;
    }
});
