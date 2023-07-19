var users = JSON.parse(localStorage.getItem("users"));
let btnGet = document.querySelector(".buttonTable");
let myTable = document.querySelector("#table");

// Call the authentication check function on page load, when the page is shown, and when the URL changes
window.onload =
  window.onpageshow =
  window.onpopstate =
    function () {
      checkAuthentication();
    };

let headers = [
  "UserName",
  "userFirstName",
  "userLastName",
  "DateOfBirth",
  "CityName",
  "StreetAddress",
  "PostBox",
  "email",
  "file",
  "pw",
  "pw2",
];

let clickFlag = false;
btnGet.addEventListener("click", () => {
  if (!clickFlag) {
    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
      let header = document.createElement("th");
      let textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    users.forEach((emp) => {
      let row = document.createElement("tr");
      Object.values(emp).forEach((text) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);

        cell.appendChild(textNode);
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
    myTable.appendChild(table);
  }
  clickFlag = true;
});

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
}

//////////////////////////////////////////////////

let foo;
function editingUsers() {
  foo = prompt("Enter here The Mail For the user you want to edit: ");
  userShow(foo);
  var editableElements = document.querySelectorAll("[contenteditable=false]");

  for (var i = 0; i < editableElements.length; ++i) {
    editableElements[i].setAttribute("contentEditable", true);
  }
}
/**/ /////////////////////////////// */
function editingDetails() {
  var editableElements = document.querySelectorAll("[contenteditable=false]");

  for (var i = 0; i < editableElements.length; ++i) {
    editableElements[i].setAttribute("contentEditable", true);
  }
}
function userShow(foo) {
  var users = JSON.parse(localStorage.getItem("users"));
  var index = -1;

  for (var i = 0; i < users.length; i++) {
    if (foo == users[i].email) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    document.getElementById("Name").textContent = users[index].userName;
    document.getElementById("userFirstName").textContent =
      users[index].userFirstName;
    document.getElementById("userLastName").textContent =
      users[index].userLastName;
    document.getElementById("pw").textContent = users[index].pw;
    document.getElementById("Email").textContent = users[index].email;
    document.getElementById("DateOfBirth").textContent =
      users[index].DateOfBirth;
    document.getElementById("StreetAddress").textContent =
      users[index].StreetAddress;
    document.getElementById("postBox").textContent = users[index].PostBox;
    document.getElementById("city").textContent = users[index].CityName;

    var imgSrc = users[index].file;

    var img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "User Profile Image";
    var src = document.getElementById("profileImg");
    src.appendChild(img);
  }
}

function localStorageClean() {
  sessionStorage.clear();
  //sessionStorage.removeItem('user');
  location.replace("../pages/login.html");
}

function saveDetails(foo) {
  var users = JSON.parse(localStorage.getItem("users"));

  var index = 0;

  for (var i = 0; i < users.length; i++) {
    if (foo == users[i].email) {
      index = i;
      break;
    }
    window.location.href = "../pages/admin.html";
  }

  var userName = document.getElementById("Name").innerHTML;
  var userFirstName = document.getElementById("userFirstName").innerHTML;
  var userLastName = document.getElementById("userLastName").innerHTML;
  var DateOfBirth = document.getElementById("DateOfBirth").innerHTML;
  var CityName = document.getElementById("city").innerHTML;
  var StreetAddress = document.getElementById("StreetAddress").innerHTML;
  var PostBox = document.getElementById("postBox").innerHTML;
  var email = document.getElementById("Email").innerHTML;
  var file = users[index].file;
  var pw = document.getElementById("pw").innerHTML;
  var pw2 = document.getElementById("pw").innerHTML;

  if (!validateUserFirstName(userFirstName)) {
    return false;
  }

  if (!validateUserLastName(userLastName)) {
    return false;
  }

  if (!validateBirthDate(DateOfBirth)) {
    return false;
  }
  ////city name validation

  if (!validateStreetAddress(StreetAddress)) {
    return false;
  }

  if (!validatePostBox(PostBox)) {
    return false;
  }

  if (!validateCityNameFromList(CityName)) {
    return false;
  }

  let newUser = new User(
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
  users[index] = newUser;
  localStorage.setItem(`users`, JSON.stringify(users));
  alert("your details has Updated sucssesfully");
}
//func to delete user //kutaiba ///new
function deleteUser() {
  var userEmail = prompt("Enter the email of the user you want to delete: ");

  var userIndex = users.findIndex((user) => user.email === userEmail);

  if (userIndex !== -1) {
    users.splice(userIndex, 1); // מחיקת המשתמש מהמערך
    localStorage.setItem("users", JSON.stringify(users)); // עדכון הנתונים בLocalStorage

    // ניתן לבצע כאן פעולות נוספות שלאחר המחיקה (למשל, עדכון הצגת הטבלה עם המשתמשים המעודכנת)

    alert("User has been deleted successfully!");
  } else {
    alert("User not found!");
  }
  location.reload();
}
let deleteUserBtn = document.getElementById("deleteUserBtn");
deleteUserBtn.addEventListener("click", deleteUser);

document.getElementById("addItemBtn").addEventListener("click", function () {
  window.location.href = "../pages/addNewItem.html"; // הפניה לדף HTML הרצוי
});

document.getElementById("getItemBtn").addEventListener("click", function () {
  window.location.href = "../pages/items.html"; // הפניה לדף HTML הרצוי
});

/// valdation functions
function validateBirthDate(DateOfBirth) {
  if (DateOfBirth.trim() === "") {
    alert("Please enter Birth Date");
    return false;
  }
  return true;
}
function validateStreetAddress(StreetAddress) {
  if (StreetAddress.trim() === "") {
    alert("Please enter Street Address");
    return false;
  }
  if (!cheekHebrewValidation(StreetAddress)) {
    alert("The street address must be in Hebrew");
    return false;
  }

  return true;
}
function cheekHebrewValidation(str) {
  return /[\u0590-\u05FF]/.test(str);
}
function validatePostBox(PostBox) {
  if (PostBox.trim() === "") {
    alert("Please enter Post Box");
    return false;
  }
  if (PostBox < 0) {
    alert("number must be positive");
    return false;
  }

  return true;
}
function validateUserFirstName(userFirstName) {
  if (userFirstName.trim() === "") {
    alert("Please enter First Name");
    return false;
  }
  if (containsNumber(userFirstName)) {
    alert("User first name  must not contain numbers");
    return false;
  }
  return true;
}
function containsNumber(str) {
  return /\d/.test(str);
}
function validateUserLastName(userLastName) {
  if (userLastName.trim() === "") {
    alert("Please enter Last Name");
    return false;
  }
  if (containsNumber(userLastName)) {
    alert("User last name must not contain numbers");
    return false;
  }

  return true;
}
function validateCityNameFromList(CityName) {
  if (CityName.length === 0) {
    alert("Please enter city name");
    return false;
  }

  return true;
}

function logout() {
  sessionStorage.setItem("isAdminLoggedIn", false);
  console.log("logut");
  location.replace("../../index.html");
}

function checkAuthentication() {
  let isAuthenticated = sessionStorage.getItem("isAdminLoggedIn");

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    window.location.href = "login.html";
  }
}
