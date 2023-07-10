function check(event) {
  event.preventDefault(); // Prevent the default form submission
  var LoginUserName = document.getElementById("LoginUserName").value;
  var LoginPassoword = document.getElementById("LoginPassoword").value;

  if (LoginUserName == "admin" && LoginPassoword == "admin1234admin") {
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
