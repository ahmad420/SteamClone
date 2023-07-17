let users = JSON.parse(localStorage.getItem("users")) || [];

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

// Adding five users to localStorage
var user1 = new User(
  "user1",
  "John",
  "Doe",
  "2000-01-01",
  "אבטליון",
  "Address1",
  "12345",
  "user1@example.com",
  "file1.jpg",
  "password1",
  "password1"
);
var user2 = new User(
  "user2",
  "Jane",
  "Smith",
  "1995-05-10",
  "אבו גוש",
  "Address2",
  "23456",
  "user2@example.com",
  "file2.jpg",
  "password2",
  "password2"
);
var user3 = new User(
  "user3",
  "Michael",
  "Johnson",
  "1988-12-20",
  "אבו גוש",
  "Address3",
  "34567",
  "user3@example.com",
  "file3.jpg",
  "password3",
  "password3"
);
var user4 = new User(
  "user4",
  "Emily",
  "Davis",
  "1992-07-15",
  "אביאל",
  "Address4",
  "45678",
  "user4@example.com",
  "file4.jpg",
  "password4",
  "password4"
);
var user5 = new User(
  "user5",
  "David",
  "Wilson",
  "1998-03-25",
  "אביאל",
  "Address5",
  "56789",
  "user5@example.com",
  "file5.jpg",
  "password5",
  "password5"
);

if (users.length === 0 || users === null) {
  addUserToLocalStorage(user1);
  addUserToLocalStorage(user2);
  addUserToLocalStorage(user3);
  addUserToLocalStorage(user4);
  addUserToLocalStorage(user5);
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
  const fileInput = document.getElementById("file");
  const pw = document.getElementById("pw").value;
  const pw2 = document.getElementById("pw2").value;

  console.log(CityName);
  if (!validateUserName(userName)) {
    return false;
  }

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
  if (!validateCityNameFromList(CityName)) {
    return false;
  }

  if (!validateStreetAddress(StreetAddress)) {
    return false;
  }

  if (!validatePostBox(PostBox)) {
    return false;
  }

  if (!validateEmail(email)) {
    return false;
  }

  if (users.some((user) => user.email === email)) {
    alert("This Email is already in use");
    return false;
  }

  if (!validateFileInput(fileInput)) {
    return false;
  }

  if (!validatePassword(pw)) {
    return false;
  }
  if (pw2.trim() === "") {
    alert("Please repeat the Password");
    return false;
  }

  if (pw !== pw2) {
    alert("Passwords do not match");
    return false;
  }

  // Read the image file as a data URL
  const reader = new FileReader();
  reader.onload = function (event) {
    const fileData = event.target.result;
    createUser(
      userName,
      userFirstName,
      userLastName,
      DateOfBirth,
      CityName,
      StreetAddress,
      PostBox,
      email,
      fileData,
      pw,
      pw2
    );
  };
  reader.readAsDataURL(fileInput.files[0]);
}
function createUser(
  userName,
  userFirstName,
  userLastName,
  DateOfBirth,
  CityName,
  StreetAddress,
  PostBox,
  email,
  fileData,
  pw,
  pw2
) {
  const newUser = new User(
    userName,
    userFirstName,
    userLastName,
    DateOfBirth,
    CityName,
    StreetAddress,
    PostBox,
    email,
    fileData,
    pw,
    pw2
  );

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Your account has been created successfully. You can now log in.");
  window.location.href = "../pages/Login.html";
}
/// valdation functions
function validateFileInput(fileInput) {
  if (fileInput.files.length === 0) {
    alert("Please select a file");
    return false;
  }

  const selectedFile = fileInput.files[0];
  const fileName = selectedFile.name;

  if (
    !fileName.toLowerCase().endsWith("jpg") &&
    !fileName.toLowerCase().endsWith("jpeg")
  ) {
    alert("Please select a JPEG or JPG file");
    return false;
  }
  return true;
}
function validateUserName(userName) {
  if (userName.trim() === "") {
    alert("Please enter a User Name");
    return false;
  }
  if (userName.length > 60) {
    console.log("Username should not exceed 60 characters.");
    return false;
  }

  const usernameRegex = /^[A-Za-z0-9\s\-_]*[A-Za-z][A-Za-z0-9\s\-_]*$/;
  if (!usernameRegex.test(userName)) {
    console.log(
      "Username should contain only alphanumeric characters, spaces, dashes, and underscores, and should include at least one letter."
    );
    return false;
  }
  if (isUserNameExists(userName)) {
    alert("This User Name is already in use");
    return false;
  }

  return true;
}
function isUserNameExists(userName) {
  const arr = JSON.parse(localStorage.getItem("users"));
  if (arr == null) return false;
  // בדיקה האם שם המשתמש כבר קיים במאגר הנתונים
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].userName === userName) {
      return true; // שם המשתמש כבר קיים
    }
  }

  return false; // שם המשתמש לא קיים
}
function validatePassword(pw) {
  if (pw.trim() === "") {
    alert("Please enter Password");
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
  if (!/[^a-zA-Z0-9]/.test(pw)) {
    alert("Your password needs a special character");
    return false;
  }
  if (pw.length < 7 || pw.length > 12) {
    alert("The password length must be between 7-12");
    return false;
  }
  return true;
}
function validateEmail(email) {
  if (email.trim() === "") {
    alert("Please enter Email Address");
    return false;
  }
  if (email.indexOf("@") === -1) {
    return false; // אין תו @ באימייל
  }

  if (email.indexOf(".") === -1) {
    return false; // אין נקודה באימייל
  }

  const domain = email.split("@")[1];
  if (domain.indexOf(".") === -1) {
    return false; // הדומיין אינו תקף (אין נקודה)
  }
  return true;
}
function emailAvilabityCheek(email, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == email) {
      return false;
    }
  }
  return true;
}
function validateBirthDate(DateOfBirth) {
  if (DateOfBirth.trim() === "") {
    alert("Please enter Birth Date");
    return false;
  }
  return true;
}

function validateCityNameFromList(CityName) {
  if (CityName == null) {
    alert("city name is null Choose State/Province please");

    return false;
  }
  if (CityName === "Choose State/Province") {
    alert("Choose State/Province please ");
    return false;
  }
  return true;
  // console.log(CityName);

  // let cities = await getCities(); // Await the getCities() function to resolve the promise

  // console.log(cities);

  // for (let i = 0; i < cities.length; i++) {

  //   let city = cities[i];
  //   console.log(city);
  //   if (city.name === CityName) return true;
  // }

  // return false;
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
    alert("number cant be nigative");
    return false;
  }
  if (PostBox > 250) {
    alert("number must be less than 250");
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
async function getCites() {
  let dropdown = document.getElementById("locality-dropdown");
  dropdown.length = 0;

  dropdown.dir = "rtl"; // הוספת כיוון ימין לשמאל לתצוגת התווים בשדה הקלט

  let defaultOption = document.createElement("option");
  defaultOption.text = "בחר עיר";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = "../data/cities.json";

  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      alert("נתקלנו בבעיה. קוד הסטטוס: " + response.status);
      return;
    }

    const data = await response.json();

    // שמירת רשימת הערים/יישובים במערך
    window.cities = data;

    let option;

    for (let i = 0; i < data.length; i++) {
      option = document.createElement("option");
      option.text = data[i].name;
      option.value = data[i].name;
      dropdown.add(option);
    }
  } catch (err) {
    alert("שגיאה בשליפת המידע -", err);
  }
}

function filterCities() {
  const input = document.getElementById("locality-dropdown").value;
  const cities = window.cities;

  for (let i = 0; i < cities.length; i++) {
    const cityName = cities[i].name;
    const option = document.querySelector(
      `option[value="${cities[i].abbreviation}"]`
    );

    if (cityName.includes(input)) {
      option.style.display = "";
    } else {
      option.style.display = "none";
    }
  }
}

function addUserToLocalStorage(user) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
