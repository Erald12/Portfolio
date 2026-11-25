// =====================================================================
// CONTENT: edit only this section.
// Leave a URL empty ("") and its link is hidden automatically.
// =====================================================================

const SITE = {
  name: "Erald Almoete",
  role: "AI Automation Builder",
  summary:
    "I build Python workflows that combine rule-based checks with Claude for the " +
    "judgment steps. Every workflow has validated outputs, a run log, and a person " +
    "approving anything that reaches a customer.",
  badges: ["Python", "Claude API", "Claude Code", "Data QA", "Workflow Automation"],
  email: "erald.almoete@gmail.com",
  github: "https://github.com/Erald12",
  availability: "Available 20 hours per week, remote.",
  about:
    "Background in applied statistics and data quality assurance, with experience in " +
    "AI data annotation, LLM output evaluation, and dataset validation.",
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  skills: [
    "Python scripting and data processing",
    "Anthropic API and prompt design",
    "Structured output validation",
    "Claude Code",
    "Workflow scheduling (Task Scheduler, cron)",
    "Data quality assurance and labeling",
    "LLM output evaluation",
    "Git and GitHub",
  ],
};

const PROJECTS = [
  {
    name: "Dataset QA Pipeline",
    description:
      "Checks labeled data with rules in Python, then uses Claude to review each label " +
      "against a written guideline. Outputs a report, a review queue, and a run log, " +
      "and measures agreement with human labels.",
    tools: ["Python", "Anthropic API", "Claude Code"],
    code: "https://github.com/Erald12/dataset-qa-pipeline",
    demo: "", // add a video link when you have one
  },
  {
    name: "Weekly Ops Digest",
    description:
      "Computes weekly revenue, returns, and product changes from sales exports, creates " +
      "charts, and has Claude write a summary. A check blocks any summary that includes " +
      "figures not found in the data.",
    tools: ["Python", "matplotlib", "Anthropic API"],
    code: "https://github.com/Erald12/weekly-ops-digest",
    demo: "",
  },
  {
    name: "Product Listing Generator",
    description:
      "Drafts Amazon-style listings from product spec files. Python checks each draft for " +
      "title and bullet limits, banned claims, and numbers not found in the spec, then " +
      "marks it ready or needs edit for human review.",
    tools: ["Python", "Anthropic API"],
    code: "https://github.com/Erald12/product-listing-generator",
    demo: "",
  },
  {
    name: "Ad Video Pipeline",
    description:
      "Renders vertical product videos from photos with ffmpeg, using Claude-written scene " +
      "scripts and SRT captions built from the scene timings.",
    tools: ["Python", "ffmpeg", "Anthropic API"],
    code: "https://github.com/Erald12/ad-video-pipeline",
    demo: "",
  },
];

const THEMES = ["system", "light", "dark", "ocean"];
const THEME_LABELS = { system: "System", light: "Light", dark: "Dark", ocean: "Ocean" };
const THEME_KEY = "portfolio-theme";

// =====================================================================
// HELPERS
// =====================================================================

// Creates an element. Text is set with textContent, so it is never parsed as HTML.
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) {
    if (child) node.append(child);
  }
  return node;
}

// Returns a link, or null when the URL is empty, so no broken link is shown.
function link(url, label) {
  if (!url) return null;
  return el("a", { href: url, text: label, target: "_blank", rel: "noopener" });
}

// =====================================================================
// THEME
// =====================================================================

function getTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return THEMES.includes(saved) ? saved : "system";
}

function setTheme(choice) {
  localStorage.setItem(THEME_KEY, choice);
  if (choice === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", choice);
  }
  updateThemeButtons(choice);
}

function updateThemeButtons(active) {
  document.querySelectorAll("#theme-switch button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.theme === active));
  });
}

// Apply the saved theme before the page is drawn, to avoid a flash of the wrong colors.
document.documentElement.dataset.themeReady = "true";
if (getTheme() !== "system") {
  document.documentElement.setAttribute("data-theme", getTheme());
}

// =====================================================================
// RENDERING
// =====================================================================

function renderHeader() {
  document.title = `${SITE.name} | AI Automation`;
  document.getElementById("brand").textContent = SITE.name;

  const nav = document.getElementById("nav");
  SITE.nav.forEach((item) => nav.append(el("a", { href: item.href, text: item.label })));

  const switcher = document.getElementById("theme-switch");
  THEMES.forEach((theme) => {
    const btn = el("button", {
      type: "button",
      text: THEME_LABELS[theme],
      "aria-pressed": "false",
    });
    btn.dataset.theme = theme;
    btn.addEventListener("click", () => setTheme(theme));
    switcher.append(btn);
  });
  updateThemeButtons(getTheme());
}

function renderHero() {
  const hero = document.getElementById("hero");
  hero.append(
    el("h1", { text: SITE.name }),
    el("p", { class: "role", text: SITE.role }),
    el("p", { class: "summary", text: SITE.summary }),
    el("div", { class: "badges" },
      SITE.badges.map((b) => el("span", { class: "badge", text: b }))
    ),
    el("div", { class: "cta" }, [
      el("a", { class: "btn primary", href: `mailto:${SITE.email}`, text: "Email me" }),
      el("a", { class: "btn", href: SITE.github, text: "GitHub profile", target: "_blank", rel: "noopener" }),
    ])
  );
}

function renderAbout() {
  document.getElementById("about").append(
    el("h2", { text: "About" }),
    el("div", { class: "panel", text: SITE.about })
  );
}

function renderProjects() {
  const section = document.getElementById("projects");
  section.append(el("h2", { text: "Projects" }));

  const grid = el("div", { class: "grid" });
  PROJECTS.forEach((p) => {
    const links = el("div", { class: "links" }, [
      link(p.code, "Code"),
      link(p.demo, "Demo"),
    ]);
    grid.append(
      el("article", { class: "card" }, [
        el("h3", { text: p.name }),
        el("p", { text: p.description }),
        el("div", { class: "tools" },
          p.tools.map((t) => el("span", { class: "tool", text: t }))
        ),
        links,
      ])
    );
  });
  section.append(grid);
}

function renderSkills() {
  document.getElementById("skills").append(
    el("h2", { text: "Skills" }),
    el("div", { class: "skills" },
      SITE.skills.map((s) => el("span", { class: "skill", text: s }))
    )
  );
}

function renderContact() {
  document.getElementById("contact").append(
    el("h2", { text: "Contact" }),
    el("div", { class: "contact" }, [
      el("p", { text: SITE.availability }),
      el("a", { class: "btn primary", href: `mailto:${SITE.email}`, text: SITE.email }),
    ])
  );
}

function renderFooter() {
  const year = new Date().getFullYear();
  document.getElementById("footer").textContent =
    `© ${year} ${SITE.name}. Built with plain HTML and JavaScript.`;
}

// =====================================================================
// START
// =====================================================================

renderHeader();
renderHero();
renderAbout();
renderProjects();
renderSkills();
renderContact();
renderFooter();
