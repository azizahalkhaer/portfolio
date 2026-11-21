const navigationButtons = [...document.querySelectorAll("[data-nav-link]")];
const pages = [...document.querySelectorAll("[data-page]")];
const sidebar = document.querySelector("[data-sidebar]");
const sidebarButton = document.querySelector("[data-sidebar-btn]");
const projectItems = [...document.querySelectorAll(".project-item")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const filterStatus = document.querySelector("#project-filter-status");

navigationButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    pages.forEach(page => {
      const active = page.dataset.page === target;
      page.classList.toggle("is-active", active);
      page.hidden = !active;
    });

    navigationButtons.forEach(navButton => {
      const active = navButton === button;
      navButton.classList.toggle("is-active", active);
      if (active) {
        navButton.setAttribute("aria-current", "page");
      } else {
        navButton.removeAttribute("aria-current");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

sidebarButton.addEventListener("click", () => {
  const isExpanded = sidebarButton.getAttribute("aria-expanded") === "true";
  sidebarButton.setAttribute("aria-expanded", String(!isExpanded));
  sidebar.classList.toggle("is-open", !isExpanded);
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !sidebar.classList.contains("is-open")) return;
  sidebar.classList.remove("is-open");
  sidebarButton.setAttribute("aria-expanded", "false");
  sidebarButton.focus();
});

const categoryNames = {
  all: "all",
  finance: "Finance",
  ai: "AI & ML",
  dashboard: "Dashboards",
  web: "Web & Apps",
  design: "Design"
};

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });

    projectItems.forEach(item => {
      const visible = category === "all" || item.dataset.category.split(/\s+/).includes(category);
      item.hidden = !visible;
      if (visible) visibleCount++;
    });

    filterStatus.textContent = category === "all"
      ? `Showing all ${visibleCount} projects.`
      : `Showing ${visibleCount} ${categoryNames[category]} projects.`;
  });
});
