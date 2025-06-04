const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const queryTypeInput = document.querySelectorAll('input[name="query"]');
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const submitButton = document.getElementById("submit");
const errorSpans = document.querySelectorAll(".error-message");
const toast = document.getElementById("toast");

const formData = {};

firstNameInput.addEventListener("input", (e) => {
    formData.firstName = e.target.value.trim();
});

lastNameInput.addEventListener("input", (e) => {
    formData.lastName = e.target.value.trim();
});

emailInput.addEventListener("input", (e) => {
    formData.email = e.target.value.trim();
});

const querySelected = (evt) => {
    formData.query = evt.target.value;
};

queryTypeInput.forEach((input) => {
    input.addEventListener("input", querySelected);
});

messageInput.addEventListener("input", (e) => {
    formData.message = e.target.value;
});

consentInput.addEventListener("input", (e) => {
    formData.consent = e.target.checked;
});

const showToast = () => {
    toast.style.top = "24px";
};

const canSubmit = () => {
    if (Object.keys(formData).length === 0) {
        errorSpans.forEach((error) => {
            error.classList.remove("hidden");
        });
        return false;
    } else if (Object.keys(formData).length !== 6) {
        return false;
    } else {
        return true;
    }
};

const submitForm = (evt) => {
    evt.preventDefault();
    if (true) {
        showToast();
    }
};

submitButton.addEventListener("click", submitForm);
