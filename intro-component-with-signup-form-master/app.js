const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (firstName.value === "") {
    addError("firstname", "First Name is Required");
  } else {
    removeError("firstname");
  }
  if (lastName.value === "") {
    addError("lastname", "Last Name is Required");
  } else {
    removeError("lastname");
  }
  if (email.value === "") {
    addError("email", "Email is Required");
  } else if (!isValidEmail(email.value)) {
    addError("email", "Email is not Valid");
  } else {
    removeError("email");
  }

  if (password.value === "") {
    addError("password", "Password is Required");
  } else {
    removeError("password");
  }
});

const addError = (field, message) => {
  const formControl = form[field].parentNode;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const removeError = (field) => {
  const formControl = form[field].parentNode;
  formControl.classList.remove("error");
  const small = formControl.querySelector("small");
};

const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
