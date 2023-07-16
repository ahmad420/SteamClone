const admins = JSON.parse(localStorage.getItem("admins")) || [];

function check(event) {
  event.preventDefault(); // Prevent the default form submission
  var LoginUserName = document.getElementById("LoginUserName").value;
  var LoginPassoword = document.getElementById("LoginPassoword").value;

  if (LoginUserName == "admin" && LoginPassoword == "admin1234admin") {
    alert(" You are logged in. Admin Page");
    sessionStorage.setItem("isAdminLoggedIn", true);
    location.replace("../pages/admin.html");
    return;
  }
  const arr = JSON.parse(localStorage.getItem("users"));

  var arrayOfUserNames = new Array();
  var arrayOfPw = new Array();

  ///saving all passowrds and user names in arrays
  for (var i = 0; i < arr.length; i++) {
    arrayOfUserNames[i] = arr[i].userName;
    arrayOfPw[i] = arr[i].pw;
  }
  ///////////////////////////////////////////////

  var isLoggedIn = false;
  /// cheking if user name and passoword is correct
  for (var i = 0; i < arrayOfUserNames.length; i++) {
    if (LoginUserName == arrayOfUserNames[i]) {
      if (LoginPassoword == arrayOfPw[i]) {
        isLoggedIn = true;
        alert("You are logged in.");
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem(`user`, JSON.stringify(arr[i]));
        location.replace("../pages/profile.html");
        return;
      } else {
        alert("Your Password is Wrong");
        return;
      }
    }
    else {
      alert("Your User Name is Wrong");
      return;
    }
  }
  //////If the user name is wrong
  if (!isLoggedIn) {
    alert("Your User Name  is Wrong");
    return;
  }
}
