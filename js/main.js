const hamburgerBtn = document.querySelector("#hamburger-btn");
const navMenu = document.querySelector("nav ul");
if (hamburgerBtn) {
hamburgerBtn.addEventListener("click", () => {
navMenu.classList.toggle("open");
hamburgerBtn.textContent =
navMenu.classList.contains("open") ? "x" : "#";
});
}

const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") body.classList.add("dark-mode");
if (themeToggle) {
themeToggle.addEventListener("click", () => {
body.classList.toggle("dark-mode");
const isDark = body.classList.contains("dark-mode");
localStorage.setItem("theme", isDark ? "dark" : "light");
themeToggle.textContent = isDark ? "##" : "#";
});
}

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
}
});
}, { threshold: 0.1 });
document.querySelectorAll("section")
.forEach(el => observer.observe(el));

const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
if (currentPage.includes(link.getAttribute("href"))) {
link.classList.add("active");
}
});

document.querySelectorAll("a[href^=\"#\"]")
.forEach(link => {
link.addEventListener("click", (e) => {
e.preventDefault();
const target = document.querySelector(link.getAttribute("href"));
if (target) target.scrollIntoView({ behavior: "smooth" });
});
});

async function loadGitHubRepos() {
const container = document.querySelector("#github-repos");
if (!container) return;
const USERNAME = "jemima-aoa";
const API_URL = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`;
try {
const response = await fetch(API_URL);
if (!response.ok) throw new Error("GitHub API error");
const repos = await response.json();
if (repos.length === 0) {
container.innerHTML = "<p>No public repos yet.</p>";
return;
}
container.innerHTML = repos.map(repo => `
<div class="repo-card">
<h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
<p>${repo.description || 'No description yet.'}</p>
<div class="repo-meta">
<span># ${repo.stargazers_count}</span>
<span># ${repo.forks_count}</span>
<span>${repo.language || 'N/A'}</span>
</div>
</div>
`).join("");
} catch (error) {
container.innerHTML = "<p>Could not load GitHub repos. Check your username.</p>";
console.error(error);
}
}
loadGitHubRepos();
