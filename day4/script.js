const textarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function updateCounts() {
  const text = textarea.value;
  const chars = text.length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  charCount.textContent = `${chars} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");
  if (chars > 200) {
    charCount.classList.add("over");
  } else if (chars > 180) {
    charCount.classList.add("warning");
  }
}

function saveDraft() {
  localStorage.setItem("draft", textarea.value);
}

function restoreDraft() {
  const saved = localStorage.getItem("draft");
  if (saved) textarea.value = saved;
}

function clearAll() {
  textarea.value = "";
  localStorage.removeItem("draft");
  updateCounts();
}

function toggleTheme() {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Event listeners
textarea.addEventListener("input", () => {
  updateCounts();
  saveDraft();
});

textarea.addEventListener("keydown", (e) => {
  if (e.key === "Escape") clearAll();
});

clearBtn.addEventListener("click", clearAll);
themeToggle.addEventListener("click", toggleTheme);

// On page load
restoreDraft();
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "Light mode";
}
updateCounts();
