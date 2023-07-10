import User from "../JsScripts/modules/User.js";
// // קוד JavaScript thnx page
// window.onload = function () {
//   var element = document.querySelector(".circle-link");
//   element.style.opacity = "0"; // הצגת האלמנט על המסך

//   setTimeout(function () {
//     element.style.opacity = "1"; // הסתרת האלמנט מהמסך
//   }, 2000); // 2000 מילישניות = 2 שניות
// };


export function Login() {}

export function createUser(newUser) {
  // Get the existing user array from local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Add the new user to the array
  users.push(newUser);

  // Update the user array in local storage
  localStorage.setItem("users", JSON.stringify(users));
}

// Create a new user object
const newUser = new User(/* user properties */);

// Call the createUser function to add the new user to the array in local storage
createUser(newUser);

export async function getCites() {
  let dropdown = document.getElementById("locality-dropdown");
  dropdown.length = 0;

  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose State/Province";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = "../data/cities.json";

  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      alert("Looks like there was a problem. Status Code: " + response.status);
      return;
    }

    const data = await response.json();

    let option;

    for (let i = 0; i < data.length; i++) {
      option = document.createElement("option");
      option.text = data[i].name;
      option.value = data[i].abbreviation;
      dropdown.add(option);
    }
  } catch (err) {
    alert("Fetch Error -", err);
  }
}

export function CheckUserName() {}
