function isUpper(str) {
  return /[A-Z]/.test(str);
}
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
    if (arr[i].email == email) {
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

module.exports = isUpper;
