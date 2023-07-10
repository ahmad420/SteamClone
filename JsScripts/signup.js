let users = JSON.parse(localStorage.getItem("users")) || new Array();

class User {
  constructor(
    userName,
    userFirstName,
    userLastName,
    DateOfBirth,
    CityName,
    StreetAddress,
    PostBox,
    email,
    file,
    pw,
    pw2
  ) {
    this.userName = userName;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.DateOfBirth = DateOfBirth;
    this.CityName = CityName;
    this.StreetAddress = StreetAddress;
    this.PostBox = PostBox;
    this.email = email;
    this.file = file;
    this.pw = pw;
    this.pw2 = pw2;
  }

  get getFullName() {
    return this.userFirstName + this.userLastName;
  }
  get getDateOfBirth() {
    return this.DateOfBirth.toString();
  }
}
 getCites();

function store(event) {
  event.preventDefault(); // Prevent the default form submission

  const userName = document.getElementById("userName").value;
  const userFirstName = document.getElementById("userFirstName").value;
  const userLastName = document.getElementById("userLastName").value;
  const DateOfBirth = document.getElementById("DateOfBirth").value;
  const CityName = document.getElementById("locality-dropdown").value;
  const StreetAddress = document.getElementById("StreetAddress").value;
  const PostBox = document.getElementById("PostBox").value;
  const email = document.getElementById("email").value;
  const file = document.getElementById("file").value;
  const pw = document.getElementById("pw").value;
  const pw2 = document.getElementById("pw2").value;

  if (pw.length < 7 || pw.length > 12) {
    alert("The password length must be between 7-12");
    return false;
  }
  if (users.some((user) => user.email === email)) {
    alert("This Email is already in use");
    return false;
  }

  if (userName.length > 60) {
    alert("The UserName is too long");
    return false;
  }


  if (pw !== pw2) {
    alert("Passwords do not match");
    return false;
  }

  if (containsNumber(userLastName) || containsNumber(userFirstName)) {
    alert("User first name and last name must not contain numbers");
    return false;
  }

  if (!validateEmail(email)) {
    alert("The email address is not valid");
    return false;
  }

  if (!cheekHebrewValidation(StreetAddress)) {
    alert("The street address must be in Hebrew");
    return false;
  }

  if (PostBox < 0) {
    alert("Post box number cannot be negative");
    return false;
  }

  if (!/\d/.test(pw)) {
    alert("Your password needs a number");
    return false;
  }

  if (!/[A-Z]/.test(pw)) {
    alert("Your password needs an uppercase letter");
    return false;
  }

  if (!/[a-z]/.test(pw)) {
    alert("Your password needs a lowercase letter");
    return false;
  }

  const newUser = new User(
    userName,
    userFirstName,
    userLastName,
    DateOfBirth,
    CityName,
    StreetAddress,
    PostBox,
    email,
    file,
    pw,
    pw2
  );

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Your account has been created successfully. You can now log in.");
}

/// valdation functions
// function isUpper(str) {
//   return /[A-Z]/.test(str);
// }
function hasLowerCase(str) {
  return /[a-z]/.test(str);
}
function containsNumber(str) {
  return /\d/.test(str);
}

function cheekHebrewValidation(str) {
  return /[\u0590-\u05FF]/.test(str);
}

function emailAvilabityCheek(email, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == email ) {
      return false;
    }
  }
  return true;
}

function validateEmail(email) {
  const regex_pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[c+o+m]{2,}))$/;

  if (regex_pattern.test(email)) {
    return true;
  } else {
    return false;
  }
}

// //  form date getter
// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth() + 1; //January is 0!
// var yyyy = today.getFullYear();
// if (dd < 10) {
//   dd = "0" + dd;
// }
// if (mm < 10) {
//   mm = "0" + mm;
// }

// today = yyyy + "-" + mm + "-" + dd;
// document.getElementById("DateOfBirth").setAttribute("max", today);

/// cites jason file dropdown

function getCites() {
  let dropdown = document.getElementById("locality-dropdown");
  dropdown.length = 0;

  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose State/Province";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = "../json/cities.json";

  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        let option;

        for (let i = 0; i < data.length; i++) {
          option = document.createElement("option");
          option.text = data[i].name;
          option.value = data[i].abbreviation;
          dropdown.add(option);
        }
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });
}

//checking

function check() {
  var LoginUserName = document.getElementById("LoginUserName").value;
  var LoginPassoword = document.getElementById("LoginPassoword").value;

  if (LoginUserName == "kutaiba" && LoginPassoword == "kutaiba123") {
    alert(" You are logged in. Admin Page");
    location.replace("../adminPage/admin.html");
    return;
  }
  const arr = JSON.parse(localStorage.getItem("users"));

  var arrayOfUserNames = new Array();
  var arrayOfPw = new Array();

  ///saving all passowrds and user names in arrays
  for (var i = 0; i < arr.length; i++) {
    arrayOfUserNames[i] = arr[i].userName;
  }
  for (var i = 0; i < arr.length; i++) {
    arrayOfPw[i] = arr[i].pw;
  }
  ///////////////////////////////////////////////

  var flag = false;
  /// cheking if user name and passoword is correct
  for (var i = 0; i < arrayOfUserNames.length; i++) {
    if (LoginUserName == arrayOfUserNames[i]) {
      if (LoginPassoword == arrayOfPw[i]) {
        flag = true;
        alert("You are logged in.");
        sessionStorage.setItem(`user`, JSON.stringify(arr[i]));
        location.replace("../UserProfile/userProfile.html");

        return;
      } else {
        alert("Your Password is Wrong");
        return;
      }
    }
  }
  //////If the user name is wrong
  if (flag == false) {
    alert("Your User Name  is Wrong");
    return;
  }
}
