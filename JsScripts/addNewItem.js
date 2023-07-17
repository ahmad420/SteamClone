// Retrieve itemsData from local storage or initialize an empty array
let itemsData = localStorage.getItem("itemsData");
if (itemsData) {
  itemsData = JSON.parse(itemsData);
} else {
  itemsData = [];
}

// Call the authentication check function on page load, when the page is shown, and when the URL changes
window.onload =
  window.onpageshow =
  window.onpopstate =
    function () {
      checkAuthenticationadmin();
    };

// Get the form element
const addItemForm = document.getElementById("add-item-form");

// Add event listener to the form submission
addItemForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the input values
  const name = document.getElementById("item-name").value;
  const price = parseFloat(document.getElementById("item-price").value);
  const category = document.getElementById("item-category").value;
  const image = document.getElementById("item-image").value;

  // Create a new item object
  const newItem = {
    id: itemsData.length + 1,
    name: name,
    price: price,
    category: category,
    image: image,
  };

  // Add the new item to the itemsData array
  itemsData.push(newItem);

  // Save the updated itemsData in local storage
  localStorage.setItem("itemsData", JSON.stringify(itemsData));
  alert("Added to the store");
  // Reset the form inputs
  addItemForm.reset();
});

function checkAuthenticationadmin() {
  let isAuthenticatedadmin = sessionStorage.getItem("isAdminLoggedIn");
  // If user is not authenticated, redirect to login page
  if (!isAuthenticatedadmin || isAuthenticatedadmin !== "true") {
    window.location.href = "login.html";
  }
}
