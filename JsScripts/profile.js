var user = JSON.parse(sessionStorage.getItem("user"));
var users1 = JSON.parse(localStorage.getItem("users"));
var index = 0;
let flag = true;
for (var i = 0; i < users1.length; i++) {
  if (user.email == users1[i].email) {
    index = i;
    break;
  }
}

if (flag) {
  displayUser(users1, index);
  flag = flase;
}
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

function localStorageClean() {
  sessionStorage.clear();
  //sessionStorage.removeItem('user');
  location.replace("../pages/Login.html");
}

function editingDetails() {
  var editableElements = document.querySelectorAll("[contenteditable=false]");

  for (var i = 0; i < editableElements.length; ++i) {
    editableElements[i].setAttribute("contentEditable", true);
  }
}
function displayUser(users, index) {
  document.getElementById("Name").textContent += user.userName;
  document.getElementById("userFirstName").textContent += user.userFirstName;
  document.getElementById("userLastName").textContent += user.userLastName;
  document.getElementById("pw").textContent += user.pw;
  document.getElementById("Name1").textContent += user.userName;
  document.getElementById("Email").textContent += user.email;
  document.getElementById("Email1").textContent += user.email;
  document.getElementById("DateOfBirth").textContent += user.DateOfBirth;
  document.getElementById("city").textContent += user.CityName;
  document.getElementById("StreetAddress").textContent += user.StreetAddress;
  document.getElementById("postBox").textContent += user.PostBox;

  var imgSrc = user.file;
  var img = document.createElement("img");
  img.src = imgSrc;
  var profileImg = document.getElementById("profileImg");
  profileImg.appendChild(img);
}
function displayEditedUser(users, index) {
  var user = users[index];

  document.getElementById("Name").textContent += user.userName;
  document.getElementById("userFirstName").textContent += user.userFirstName;
  document.getElementById("userLastName").textContent += user.userLastName;
  document.getElementById("pw").textContent += user.pw;
  document.getElementById("Name1").textContent += user.userName;
  document.getElementById("Email").textContent += user.email;
  document.getElementById("Email1").textContent += user.email;
  document.getElementById("DateOfBirth").textContent += user.DateOfBirth;
  document.getElementById("city").textContent += user.CityName;
  document.getElementById("StreetAddress").textContent += user.StreetAddress;
  document.getElementById("postBox").textContent += user.PostBox;

 
}
function saveDetails() {
  var userName = document.getElementById("Name").innerHTML;
  var userFirstName = document.getElementById("userFirstName").innerHTML;
  var userLastName = document.getElementById("userLastName").innerHTML;
  var DateOfBirth = document.getElementById("DateOfBirth").innerHTML;
  var CityName = document.getElementById("city").innerHTML;
  var StreetAddress = document.getElementById("StreetAddress").innerHTML;
  var PostBox = document.getElementById("postBox").innerHTML;
  var email = document.getElementById("Email").innerHTML;
  var file = users1[index].file;
  var pw = document.getElementById("pw").innerHTML;
  var pw2 = document.getElementById("pw2").innerHTML;
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
  users1[index] = newUser;
  localStorage.setItem(`users`, JSON.stringify(users1));
  alert("your details has Updated sucssesfully");
  displayEditedUser(users1, index);
}

/************************************* */
function changeProfileImage() {
  var imageInput = document.getElementById("imageInput");
  var profileImg = document.getElementById("profileImg");

  // Check if a file is selected
  if (imageInput.files && imageInput.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      // Create an <img> element and set the image source
      var img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Profile Image";

      // Clear the previous content and append the new image
      profileImg.innerHTML = "";
      profileImg.appendChild(img);
      user = users1[index];
    };
    // Read the selected file as a data URL
    reader.readAsDataURL(imageInput.files[0]);
    alert(`"Image changed successfully."`);
  }
}
