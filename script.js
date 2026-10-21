"use strict";

// =====================================
// KAVARIUS REX — WEBSITE INTERACTIONS
// =====================================

const welcomeOverlay = document.getElementById("welcomeOverlay");
const rememberChoice = document.getElementById("rememberChoice");
const accountButton = document.getElementById("accountButton");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

const STORAGE_KEY = "kavariusVisitorChoice";

// Update the copyright year automatically.
const currentYear = document.getElementById("currentYear");

if (currentYear) {
currentYear.textContent = new Date().getFullYear();
}

// =====================================
// WELCOME SCREEN
// =====================================

function showWelcomeScreen() {
if (!welcomeOverlay) return;

welcomeOverlay.hidden = false;
document.body.classList.add("modal-open");

}

function hideWelcomeScreen() {
if (!welcomeOverlay) return;

welcomeOverlay.hidden = true;
document.body.classList.remove("modal-open");

}

// Check whether the visitor previously saved a choice.
function checkSavedChoice() {
try {
const savedChoice = localStorage.getItem(STORAGE_KEY);

    if (savedChoice === "guest") {
        hideWelcomeScreen();
        return;
    }

    if (savedChoice === "listener") {
        // A saved preference is not proof of authentication.
        // The real login system will be added later.
        showWelcomeScreen();
        return;
    }

    showWelcomeScreen();
} catch (error) {
    // If browser storage is unavailable, ask again.
    showWelcomeScreen();
}

}

// =====================================
// VISITOR CHOICES
// =====================================

const visitorButtons = document.querySelectorAll("[data-choice]");

visitorButtons.forEach(function (button) {
button.addEventListener("click", function () {
const choice = button.dataset.choice;

    if (choice === "guest") {
        if (rememberChoice && rememberChoice.checked) {
            try {
                localStorage.setItem(STORAGE_KEY, "guest");
            } catch (error) {
                console.warn("Could not save visitor preference.");
            }
        } else {
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (error) {
                // Continue even if storage is unavailable.
            }
        }

        hideWelcomeScreen();
        return;
    }

    if (choice === "listener") {
        // We will connect this to real authentication later.
        alert(
            "The Kavarius Rex listener account system is coming soon!"
        );

        // Keep the welcome screen open until the account flow exists.
    }
});

});

// =====================================
// LISTENER LOGIN BUTTON
// =====================================

if (accountButton) {
accountButton.addEventListener("click", function () {
alert(
"Listener registration and login will be added when we connect the account system."
);
});
}

// =====================================
// MOBILE NAVIGATION
// =====================================

if (menuToggle && navigation) {
menuToggle.addEventListener("click", function () {
const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu when a navigation link is selected.
navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});

}

// =====================================
// CHANGE EXPERIENCE
// =====================================

// This function can be connected to a settings
// button in a future update.
function changeExperience() {
try {
localStorage.removeItem(STORAGE_KEY);
} catch (error) {
// The welcome screen can still be shown.
}

if (rememberChoice) {
    rememberChoice.checked = false;
}

showWelcomeScreen();

}

// =====================================
// START THE WEBSITE
// =====================================

document.addEventListener("DOMContentLoaded", function () {
checkSavedChoice();
});