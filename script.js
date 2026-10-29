// ===== 1. MENU MOBILE =====

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fermer le menu après avoir cliqué sur un lien

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// ===== 2. CHANGER LA LANGUE FR / EN =====

const languageToggle = document.getElementById("language-toggle");

let currentLanguage = "fr";

languageToggle.addEventListener("click", function () {
  currentLanguage = currentLanguage === "fr" ? "en" : "fr";

  // Changer la langue de la page
  document.documentElement.lang = currentLanguage;

  // Traduire tous les éléments qui possèdent data-fr et data-en
  document.querySelectorAll("[data-fr][data-en]").forEach(function (element) {
    element.textContent = element.getAttribute("data-" + currentLanguage);
  });

  // Traduire les placeholders des champs du formulaire
  document.querySelectorAll(
    "[data-placeholder-fr][data-placeholder-en]"
  ).forEach(function (element) {
    element.placeholder = element.getAttribute(
      "data-placeholder-" + currentLanguage
    );
  });

  // Changer le texte du bouton de langue
  languageToggle.textContent = currentLanguage === "fr" ? "EN" : "FR";
});


// ===== 3. ANNÉE AUTOMATIQUE DANS LE FOOTER =====

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


// ===== 4. FORMULAIRE DE CONTACT =====

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

// IMPORTANT : remplace cette adresse par ton vrai e-mail.
const destinationEmail = "TON-EMAIL@EXEMPLE.COM";

contactForm.addEventListener("submit", function (event) {
  // Empêcher le rechargement de la page
  event.preventDefault();

  // Vérifier les champs obligatoires
  if (!contactForm.reportValidity()) {
    return;
  }

  // Vérifier que l'adresse e-mail a été personnalisée
  if (destinationEmail === "TON-EMAIL@EXEMPLE.COM") {
    formNote.textContent =
      currentLanguage === "fr"
        ? "Remplace TON-EMAIL@EXEMPLE.COM dans script.js par ton adresse e-mail."
        : "Replace TON-EMAIL@EXEMPLE.COM in script.js with your email address.";

    return;
  }

  // Récupérer les informations du formulaire
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Préparer le sujet et le contenu de l'e-mail
  const subject = encodeURIComponent("Message du portfolio : " + name);

  const body = encodeURIComponent(
    "Nom : " + name +
    "\nE-mail : " + email +
    "\n\nMessage :\n" + message
  );

  // Afficher une information à l'utilisateur
  formNote.textContent =
    currentLanguage === "fr"
      ? "Ton application de messagerie va s'ouvrir. Vérifie le message puis envoie-le."
      : "Your email application will open. Review the message and send it.";

  // Ouvrir un brouillon dans l'application de messagerie
  window.location.href =
    "mailto:" + destinationEmail +
    "?subject=" + subject +
    "&body=" + body;
});