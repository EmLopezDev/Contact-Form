const firstNameInput = document.getElementById("fname");
const lastNameInput = document.getElementById("lname");
const emailInput = document.getElementById("email");
const queryTypeInput = document.querySelectorAll('input[name="query"]');
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const submitButton = document.getElementById("submit");
const errorSpans = document.querySelectorAll(".error-message");
const toast = document.getElementById("toast");

const formData = {};
let submitAttempt = false;

const addErrors = (error) => {
    const errorId = error.id.split("-")[0];
    !formData[`${errorId}`]
        ? error.classList.remove("hidden")
        : error.classList.add("hidden");
};

const removeErrors = (error) => {
    error.classList.add("hidden");
};

const validate = () => {
    if (Object.keys(formData).length !== 6) {
        errorSpans.forEach(addErrors);
        return false;
    } else {
        errorSpans.forEach(removeErrors);
        submitButton.removeAttribute("disabled");
        return true;
    }
};

firstNameInput.addEventListener("input", (e) => {
    formData.fname = e.target.value.trim();
    if (submitAttempt) validate();
});

lastNameInput.addEventListener("input", (e) => {
    formData.lname = e.target.value.trim();
    if (submitAttempt) validate();
});

emailInput.addEventListener("input", (e) => {
    formData.email = e.target.value.trim();
    if (submitAttempt) validate();
});

const querySelected = (evt) => {
    formData.query = evt.target.value;
    if (submitAttempt) validate();
};

queryTypeInput.forEach((input) => {
    input.addEventListener("input", querySelected);
});

messageInput.addEventListener("input", (e) => {
    formData.message = e.target.value.trim();
    if (submitAttempt) validate();
});

consentInput.addEventListener("input", (e) => {
    formData.consent = e.target.checked ? e.target.checked.toString() : "";
    if (submitAttempt) validate();
});

const showToast = () => {
    toast.style.top = "24px";
};

const submitForm = (evt) => {
    evt.preventDefault();
    const canSubmit = validate();
    submitAttempt = true;
    if (canSubmit) {
        showToast();
    } else {
        submitButton.setAttribute("disabled", "true");
    }
};

submitButton.addEventListener("click", submitForm);
