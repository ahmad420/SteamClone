// Retrieve total price from the query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let totalPrice = urlParams.get("total");

// Display payment details
const paymentDetailsContainer = document.getElementById("payment-details");
const total = document.getElementById("total");

const totalText = document.createElement("p");
const paymentMessage = document.createElement("p");

function displayArrayFromLocalStorage() {
  // Retrieve the array from local storage
  const storedArray = JSON.parse(localStorage.getItem("items"));
  console.log(storedArray);
  // Reference the HTML div element
  const divElement = document.getElementById("resdiv");

  // Clear the div contents
  divElement.innerHTML = "";

  // Check if the array exists in local storage
  if (storedArray && Array.isArray(storedArray)) {
    // Iterate over the array and create a list of details
    const ulElement = document.createElement("ul");
    ulElement.className = "steam-list";

    storedArray.forEach((item) => {
      const liElement = document.createElement("li");
      liElement.className = "steam-list-item";
      liElement.textContent =
        item.name + " : " + item.price + " ש " + " quantity:" + item.quantity; // Access the name property of the object
      ulElement.appendChild(liElement);
    });

    // Append the list to the div
    divElement.appendChild(ulElement);
  } else {
    // Display a message if the array is not found in local storage
    divElement.textContent = "no item in cart";
  }
}

// Function to validate the payment form

function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  var cardholder = document.getElementById("pagarTarjetaTit").value.trim();
  var cardNumber = document.getElementById("pagarTarjetaNum").value.trim();
  var expMonth = document.getElementById("pagarTarjetaMes").value.trim();
  var expYear = document.getElementById("pagarTarjetaAno").value.trim();
  var cvv = document.getElementById("pagarTarjetaCVV").value.trim();

  // Perform validation
  if (cardholder === "") {
    alert("Please enter the cardholder's name.");
    return;
  }

  if (cardNumber === "") {
    alert("Please enter the card number.");
    return;
  }

  if (!/^\d{4}\d{4}\d{4}\d{4}$/.test(cardNumber)) {
    alert(
      "Please enter a valid card number in the format: 0000-0000-0000-0000"
    );
    return;
  }

  if (expMonth === "" || expYear === "") {
    alert("Please enter the card expiration date.");
    return;
  }

  if (!/^\d{2}$/.test(expMonth) || !/^\d{4}$/.test(expYear)) {
    alert("Please enter a valid expiration date.");
    return;
  }

  var currentYear = new Date().getFullYear(); // Get the current year
  var currentMonth = new Date().getMonth() + 1; // Get the current month (add 1 since it is zero-based)

  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth) ||
    expYear > 2030
  ) {
    alert(
      "Please enter a valid expiration date between " +
        currentMonth +
        "/" +
        currentYear +
        " and 12/2030."
    );
    return;
  }

  if (cvv === "") {
    alert("Please enter the CVV.");
    return;
  }

  if (!/^\d{3}$/.test(cvv)) {
    alert("Please enter a valid CVV.");
    return;
  }

  // If all validations pass, submit the form
  document.querySelector("form").submit();
  localStorage.removeItem("items");
  total = 0;
  total.textContent = "Total Price: ש" + total;
}

// Attach the form validation function to the form's submit event
document.querySelector("form").addEventListener("submit", validateForm);

function showCN() {
  var i = document.getElementById("pagarTarjetaNum").value;
  document.getElementById("cardNumber").innerHTML = i;

  if (i.length == 16) {
    document.getElementById("pagarTarjetaMes").focus();
  }

  if (i.includes("1111") == true) {
    document.getElementById("imgFranchise").src =
      "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png";
    document.getElementById("imgFranchise").style.display = "block";
    document.getElementById("divCard").style.background =
      "linear-gradient(90deg, #E40003 35%, #A40000 100%)";
  } else if (i.includes("2222") == true) {
    document.getElementById("imgFranchise").src =
      "https://usa.visa.com/dam/VCOM/regional/lac/ENG/Default/Partner%20With%20Us/Payment%20Technology/visapos/full-color-800x450.jpg";
    document.getElementById("imgFranchise").style.display = "block";

    document.getElementById("divCard").style.background =
      "linear-gradient(90deg, #FF8D00 35%, #FFA700 100%)";
  } else {
    document.getElementById("imgFranchise").style.display = "none";

    document.getElementById("divCard").style.background =
      "linear-gradient(90deg, #a9abae 35%, #e6e7e8 100%)";
  }

  if (i == "") {
    document.getElementById("cardNumber").innerHTML = "0000 0000 0000 0000";
  }
}

function showCE() {
  var im = document.getElementById("pagarTarjetaMes").value;
  var iy = document.getElementById("pagarTarjetaAno").value;
  document.getElementById("cardMonth").innerHTML = im;
  document.getElementById("cardYear").innerHTML = iy;

  if (im.length == 2) {
    document.getElementById("pagarTarjetaAno").focus();
  }
  if (iy.length == 4) {
    document.getElementById("pagarTarjetaCVV").focus();
  }
}

function showCV() {
  var i = document.getElementById("pagarTarjetaCVV").value;
  document.getElementById("cardCVV").innerHTML = i;
}

total.textContent = "Total Price: ש" + totalPrice;

paymentMessage.textContent = "Please proceed with your payment.";

// paymentDetailsContainer.appendChild(totalText);
// paymentDetailsContainer.appendChild(paymentMessage);
displayArrayFromLocalStorage();
