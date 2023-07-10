import { getCites } from "../JsScripts/functions.js";
// // import User from "./modules/User.js";
// let users = JSON.parse(localStorage.getItem("users")) || new Array();

// signup.js

function registerUser(event) {
  event.prventDefualt();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var user = {
    name: name,
    email: email,
    password: password,
  };

  var users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
}
// getCites();
// /// cites jason file dropdown
// class User {
//   constructor(
//     userName,
//     userFirstName,
//     userLastName,
//     DateOfBirth,
//     CityName,
//     StreetAddress,
//     PostBox,
//     email,
//     file,
//     pw,
//     pw2
//   ) {
//     this.userName = userName;
//     this.userFirstName = userFirstName;
//     this.userLastName = userLastName;
//     this.DateOfBirth = DateOfBirth;
//     this.CityName = CityName;
//     this.StreetAddress = StreetAddress;
//     this.PostBox = PostBox;
//     this.email = email;
//     this.file = file;
//     this.pw = pw;
//     this.pw2 = pw2;
//   }

//   get getFullName() {
//     return this.userFirstName + this.userLastName;
//   }
//   get getDateOfBirth() {
//     return this.DateOfBirth.toString();
//   }
// }

// // const onlyHebrewPattern = new RegExp(/^[\u0590-\u05FF ,.'-]+$/i);
// export function store() {
//   var userName = document.getElementById("userName").value;
//   var userFirstName = document.getElementById("userFirstName").value;
//   var userLastName = document.getElementById("userLastName").value;
//   var DateOfBirth = document.getElementById("DateOfBirth").value;
//   var CityName = document.getElementById("locality-dropdown").value;
//   var StreetAddress = document.getElementById("StreetAddress").value;
//   var PostBox = document.getElementById("PostBox").value;
//   var email = document.getElementById("email").value;
//   var file = document.getElementById("file").value;
//   var pw = document.getElementById("pw").value;
//   var pw2 = document.getElementById("pw2").value;

//   const arr = users;
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i].email == email) {
//       alert("This Mail Already in use");
//       return false;
//     }
//   }

//   if (userName.length > 60) {
//     alert("This  UserNameis too long");
//   } else if (pw.length < 7 || pw.length > 12) {
//     alert("The password Length Must be Betwen 7-12");
//   } else if (pw != pw2) {
//     alert("passwords are Not Match! ");
//   } else if (
//     containsNumber(userLastName) == true ||
//     containsNumber(userFirstName) == true
//   ) {
//     alert("User first Name and Last Name Must Not Contain Numbers! ");
//   } else if (validateEmail(email) == false) {
//     alert("The email address is not valid");
//   } else if (cheekHebrewValidation(StreetAddress) == false) {
//     alert("The Street Address Must Be In Hebrew");
//   } else if (PostBox < 0) {
//     alert("POST Box  Number , Cant be Negative!");
//   } else if (pw.search[/a-z/i] < 1) {
//     alert("Your password needs a number");
//   } else if (isUpper(pw) == false) {
//     alert("Your password needs an uppser case letter");
//   } else if (hasLowerCase(pw) == false) {
//     alert("Your password needs a lower case letter");
//   } else {
//     let newUser = new User(
//       userName,
//       userFirstName,
//       userLastName,
//       DateOfBirth,
//       CityName,
//       StreetAddress,
//       PostBox,
//       email,
//       file,
//       pw,
//       pw2
//     );
//     users.push(newUser);
//     localStorage.setItem(`users`, JSON.stringify(users));
//     alert("Your account has been created succsefully , You Can Log-In Now: ");
//   }
// }
// /// valdation functions
// function isUpper(str) {
//   return /[A-Z]/.test(str);
// }
// function hasLowerCase(str) {
//   return /[a-z]/.test(str);
// }
// function containsNumber(str) {
//   return /\d/.test(str);
// }

// function cheekHebrewValidation(str) {
//   return /[\u0590-\u05FF]/.test(str);
// }

// function emailAvilabityCheek(email, arr) {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i].email == email) {
//       return false;
//     }
//   }
//   return true;
// }

// function validateEmail(email) {
//   const regex_pattern =
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[c+o+m]{2,}))$/;

//   if (regex_pattern.test(email)) {
//     return true;
//   } else {
//     return false;
//   }
// }

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

// function check() {
//   var LoginUserName = document.getElementById("LoginUserName").value;
//   var LoginPassoword = document.getElementById("LoginPassoword").value;

//   if (LoginUserName == "admin" && LoginPassoword == "admin1234admin") {
//     alert(" You are logged in. Admin Page");
//     location.replace("../adminPage/admin.html");
//     return;
//   }
//   const arr = JSON.parse(localStorage.getItem("users"));

//   var arrayOfUserNames = new Array();
//   var arrayOfPw = new Array();

//   ///saving all passowrds and user names in arrays
//   for (var i = 0; i < arr.length; i++) {
//     arrayOfUserNames[i] = arr[i].userName;
//   }
//   for (var i = 0; i < arr.length; i++) {
//     arrayOfPw[i] = arr[i].pw;
//   }
//   ///////////////////////////////////////////////

//   var flag = false;
//   /// cheking if user name and passoword is correct
//   for (var i = 0; i < arrayOfUserNames.length; i++) {
//     if (LoginUserName == arrayOfUserNames[i]) {
//       if (LoginPassoword == arrayOfPw[i]) {
//         flag = true;
//         alert("You are logged in.");
//         sessionStorage.setItem(`user`, JSON.stringify(arr[i]));
//         location.replace("../UserProfile/userProfile.html");

//         return;
//       } else {
//         alert("Your Password is Wrong");
//         return;
//       }
//     }
//   }
//   //////If the user name is wrong
//   if (flag == false) {
//     alert("Your User Name  is Wrong");
//     return;
//   }
// }
