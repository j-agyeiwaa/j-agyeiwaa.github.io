const form = document.querySelector("#contact-form");
function isValidEmail(email) {
return /^[^s@]+\.[^\s@]+$/.test(email);
}

function setError(fieldId, message) {
document.querySelector("#" + filedId + "-error").textContent = message;
}
form.addEventListener("submit", (e) => {
e.preventDefault();
const name = document.querySelector("#name").value.trim();
const email = document.querySelector("#email").value.trim();
const message = document.querySelector("#message").value.trim();
let isValid = true;

setError("name", "");
setError("email", "");
setError("message", "");

if (!name) { setError("name", "Name is required"); isValid = false; }
if (!isValidEmail(email)) {
setError("email", "Please enter a valid email address");
isValid = false;
}
if (message.length < 20) {
setError("message", "Message must be at least 20 characters");
isValid = false;
}
if (!isValid) return;

const messages = JSON.parse(localStorage.getItem("messages") || "[]");
messages.push({ name, email, message, date: new Date().toISOString() });
localStorage.setItem("messages", JSON.stringify(messages));

form.style.display = "none";
document.querySelector("#form-success").classList.remove("hidden");
});