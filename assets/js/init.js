document.addEventListener("DOMContentLoaded", () => {
  tocbot.init({
    tocSelector: ".js-toc",
    contentSelector: "section",
    headingSelector: "h2, h3",
  });

  anchors.add();

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", location.pathname + location.search);
  };

  document.querySelectorAll(".back-to-top-link").forEach(link =>
    link.addEventListener("click", scrollToTop)
  );

  document.querySelectorAll("h2, h3, h4, h5, h6").forEach(header => {
    Object.assign(header.style, { position: "relative" });

    const backToTopLink = Object.assign(document.createElement("a"), {
      href: "#",
      textContent: "Back to top",
      className: "back-to-top-link",
    });

    Object.assign(backToTopLink.style, {
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "0.8em",
      padding: "0 5px",
      backgroundColor: "rgb(239 239 239)",
    });

    backToTopLink.addEventListener("click", scrollToTop);
    header.appendChild(backToTopLink);
  });
});
