const form = document.getElementById("consultationForm");
const statusEl = document.getElementById("formStatus");
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

yearEl.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

function isValidPhone(phone) {
  return /^[+]?[\d\s\-()]{7,20}$/.test(phone.trim());
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusEl.className = "form-status";
  statusEl.textContent = "";

  const payload = Object.fromEntries(new FormData(form).entries());
  const missingField = Object.entries(payload).find(([, value]) => !value.trim());

  if (missingField) {
    statusEl.classList.add("error");
    statusEl.textContent = "Please complete all required fields before submitting.";
    return;
  }

  if (!isValidPhone(payload.phone)) {
    statusEl.classList.add("error");
    statusEl.textContent = "Please enter a valid phone number.";
    return;
  }

  statusEl.classList.add("success");
  statusEl.textContent =
    "Thanks. Your consultation request has been captured. We will contact you shortly.";
  form.reset();
});
