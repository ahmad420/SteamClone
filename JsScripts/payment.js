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

// Retrieve total price from the query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const totalPrice = urlParams.get("total");

// Display payment details
const paymentDetailsContainer = document.getElementById("payment-details");
const total = document.getElementById("total");

const totalText = document.createElement("p");
total.textContent = "Total Price: $" + totalPrice;

const paymentMessage = document.createElement("p");
paymentMessage.textContent = "Please proceed with your payment.";

paymentDetailsContainer.appendChild(totalText);
paymentDetailsContainer.appendChild(paymentMessage);
