// variables

var usernameSignup = document.getElementById("usernameSignup");
var emailSignup = document.getElementById("emailSignup");
var passwordSignup = document.getElementById("passwordSignup");
var signupForm = document.querySelector("#signupForm");
var selectedInputs = document.querySelectorAll(".selected-input");
var emailExistAlert = document.getElementById("emailExistAlert");
var succeedAlert = document.getElementById("succeedAlert");
var login = document.getElementById("login");
var emailSignin = document.getElementById("emailSignin");
var passwordSignin = document.getElementById("passwordSignin");
var invalid = document.getElementById("invalid");
var userWelcome = document.getElementById("userWelcome");
var logoutBtn = document.getElementById("logout");
var index;

var userList = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

// Signup Page

signupForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  var user = {
    name: usernameSignup.value,
    email: emailSignup.value,
    password: passwordSignup.value,
  };
  if (checkValidation() && !isExist(userList, user)) {
    userList.push(user);
    localStorage.setItem("users", JSON.stringify(userList));
    succeedAlert?.classList.replace("d-none", "d-block");
    setTimeout(function () {
      window.location.href = "./index.html";
    }, 2000);
    clearInputs();
  } else {
    succeedAlert.classList.replace("d-block", "d-none");
  }
});

// Validation Inputs

for (var i = 0; i < selectedInputs.length; i++) {
  selectedInputs[i].addEventListener("input", function (e) {
    var inputId = e.target.id;
    var inputValue = e.target.value;

    validation(inputId, inputValue);
  });
}

function validation(inputId, inputValue) {
  var regexList = {
    usernameSignup: /^[a-zA-Z]{3,12}$/,
    emailSignup: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    passwordSignup: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  };

  var element = document.getElementById(inputId);
  if (regexList[inputId].test(inputValue)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkValidation() {
  return (
    validation(usernameSignup.id, usernameSignup.value) &&
    validation(emailSignup.id, emailSignup.value) &&
    validation(passwordSignup.id, passwordSignup.value)
  );
}

function clearInputs() {
  usernameSignup.value = "";
  emailSignup.value = "";
  passwordSignup.value = "";
  usernameSignup.classList.remove("is-valid", "is-invalid");
  emailSignup.classList.remove("is-valid", "is-invalid");
  passwordSignup.classList.remove("is-valid", "is-invalid");
}

function isExist(arr, newObj) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == newObj.email) {
      index = i;
      emailExistAlert?.classList.replace("d-none", "d-block");
      return true;
    }
  }
  emailExistAlert?.classList.replace("d-block", "d-none");
  return false;
}

// Login Page

login?.addEventListener("submit", function (e) {
  e.preventDefault();
  var loginObj = {
    email: emailSignin.value,
    password: passwordSignin.value,
  };

  if (
    isExist(userList, loginObj) &&
    userList[index].password === loginObj.password
  ) {
    localStorage.setItem("currentUser", userList[index].name);
    invalid.classList.replace("d-block", "d-none");

    setTimeout(function () {
      window.location.href = "./home.html";
    }, 2000);
  } else {
    invalid.classList.replace("d-none", "d-block");
  }
});

// Home Page

userWelcome.innerHTML += "  " + localStorage.getItem("currentUser");

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "./index.html";
});
