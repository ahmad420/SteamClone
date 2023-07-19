const admins = JSON.parse(localStorage.getItem("admins")) || [];

let userIsLoggedIn;
let adminIsLoggedIn;

function updateLoginStatus() {
  userIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  adminIsLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
}

window.addEventListener("load", updateLoginStatus);
window.addEventListener("pageshow", updateLoginStatus);
window.addEventListener("popstate", updateLoginStatus);

function check(event) {
  event.preventDefault(); // Prevent the default form submission

  var loginUserName = document.getElementById("LoginUserName").value;
  var loginPassword = document.getElementById("LoginPassoword").value;

  if (userIsLoggedIn) {
    alert("User: Please log out before logging in with another account.");
    window.location.href = "../pages/profile.html";
    return;
  }

  if (adminIsLoggedIn) {
    alert("Admin: Please log out before logging in with another account.");
    window.location.href = "../pages/admin.html";
    return;
  }

  if (loginUserName === "admin" && loginPassword === "admin1234admin") {
    alert("You are logged in as an admin.");
    sessionStorage.setItem("isAdminLoggedIn", "true");
    location.replace("../pages/admin.html");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  var isLoggedIn = false;

  for (var i = 0; i < users.length; i++) {
    if (loginUserName === users[i].userName) {
      if (loginPassword === users[i].pw) {
        isLoggedIn = true;
        alert("You are logged in.");
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("user", JSON.stringify(users[i]));
        location.replace("../pages/profile.html");
        return;
      } else {
        alert("Your password is incorrect.");
        return;
      }
    }
  }

  if (!isLoggedIn) {
    alert("Your username is incorrect.");
  }
}
