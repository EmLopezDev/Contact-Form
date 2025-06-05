const firstNameInput = document.getElementById("fname");
const lastNameInput = document.getElementById("lname");
const emailInput = document.getElementById("email");
const queryTypeInput = document.querySelectorAll('input[name="query"]');
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const submitButton = document.getElementById("submit");
const errorSpans = document.querySelectorAll(".error-message");
const form = document.getElementById("form");
const toast = document.getElementById("toast");

let formData = {};
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
        submitButton.removeAttribute("disabled");
        errorSpans.forEach(removeErrors);
        return true;
    }
};

const nameCheck = (string) => {
    return /^[a-zA-Z]+$/g.test(string);
};

const emailCheck = (string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(string);
};

firstNameInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    formData.fname = nameCheck(value) ? value : "";
    if (submitAttempt) validate();
});

lastNameInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    formData.lname = nameCheck(value) ? value : "";
    if (submitAttempt) validate();
});

emailInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    formData.email = emailCheck(value) ? value : "";
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
    const span = document.createElement("span");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.src = "./images/icon-success-check.svg";
    img.alt = "";

    span.innerText = `Message Sent!`;

    p.innerText = `Thanks for completing the form, ${formData.fname}. We'll be in touch soon via email: ${formData.email}!`;
    span.prepend(img);

    toast.appendChild(span);
    toast.appendChild(p);
    toast.style.top = "24px";
    setTimeout(() => {
        toast.style.top = "-200px";
        toast.innerHTML = "";
    }, 4000);
};

const submitForm = (evt) => {
    evt.preventDefault();
    const canSubmit = validate();
    submitAttempt = true;
    if (canSubmit) {
        showToast();
        form.reset();
        firstNameInput.focus();
        formData = {};
        submitAttempt = false;
    } else {
        submitButton.setAttribute("disabled", "true");
    }
};

submitButton.addEventListener("click", submitForm);
