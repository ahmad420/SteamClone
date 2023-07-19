//הוספת מוצר חדש למאגר המוצרים:
describe("Add new product", function () {
  it("should add a new product to the product itemsData", function () {
    // Arrange
    var itemsData = JSON.parse(localStorage.getItem("itemsData")) || [];
    var storedItemsData = JSON.parse(JSON.stringify(itemsData)); // Create a copy of the stored itemsData
    var newItem = {
      id: itemsData.length + 1,
      name: "New Product",
      price: 10,
      category: "Category 1",
      image: "../images/product.jpg",
    }; // Define a new product

    // Act
    // Add the new item to the storedItemsData array
    storedItemsData.push(newItem);

    // Update the itemsData in local storage
    localStorage.setItem("itemsData", JSON.stringify(storedItemsData));

    // Assert
    // Check if the length of storedItemsData has increased after adding the new product
    expect(storedItemsData.length).toBe(itemsData.length + 1);
  });
});

// הוספת מוצר לעגלה:
describe("Add product to cart", function () {
  it("should add a product to the shopping cart", function () {
    // Arrange
    var itemToAdd = {
      id: "1",
      name: "Product 1",
      price: 10,
      category: "Category 1",
      image: "../images/product.jpg",
    }; // Product to add to the cart
    let cartItems;
    // Act
    function addToCart(item) {
      cartItems = localStorage.getItem("items");

      if (cartItems) {
        cartItems = JSON.parse(cartItems);
      } else {
        cartItems = [];
      }

      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        item.quantity = 1;
        cartItems.push(item);
      }

      localStorage.setItem("items", JSON.stringify(cartItems));
    }

    addToCart(itemToAdd); // Add a product to the cart

    // Assert
    var updatedCartItems = JSON.parse(localStorage.getItem("items"));
    expect(updatedCartItems.length).toBe(cartItems.length); // Check that the product was added to the cart
  });
});

//הורדת מוצר מהעגלה:
describe("Remove product from cart", function () {
  it("should remove a product from the shopping cart", function () {
    // Arrange
    var itemToRemove = {
      id: "1",
      name: "Product 1",
      price: 10,
      category: "Category 1",
      image: "../images/product.jpg",
    }; // Product to remove from the cart
    let cartItems;
    // Act
    function removeFromCart(item) {
      cartItems = localStorage.getItem("items");

      if (cartItems) {
        cartItems = JSON.parse(cartItems);
      } else {
        cartItems = [];
      }

      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        cartItems.splice(existingItemIndex, 1);
      }

      localStorage.setItem("items", JSON.stringify(cartItems));
    }

    removeFromCart(itemToRemove); // Remove a product from the cart

    // Assert
    var updatedCartItems = JSON.parse(localStorage.getItem("items"));
    expect(updatedCartItems.length).toBe(cartItems.length); // Check that the product was removed from the cart
  });
});

describe("General purchase process", function () {
  it("should complete the general purchase process", function () {
    // Arrange
    const queryString = "?total=100"; // Define the query parameter for total price
    const urlParams = new URLSearchParams(queryString);
    const totalPrice = urlParams.get("total");

    // Create the necessary elements for displaying payment details
    const paymentDetailsContainer = document.createElement("div");
    const totalText = document.createElement("p");
    totalText.textContent = "Total Price: ש" + totalPrice;
    const paymentMessage = document.createElement("p");
    paymentMessage.textContent = "Please proceed with your payment.";

    paymentDetailsContainer.appendChild(totalText);
    paymentDetailsContainer.appendChild(paymentMessage);

    // Simulate the purchase process
    const form = document.createElement("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent actual form submission

      // Simulate form validation
      const cardholder = document
        .getElementById("pagarTarjetaTit")
        .value.trim();
      const cardNumber = document
        .getElementById("pagarTarjetaNum")
        .value.trim();
      const expMonth = document.getElementById("pagarTarjetaMes").value.trim();
      const expYear = document.getElementById("pagarTarjetaAno").value.trim();
      const cvv = document.getElementById("pagarTarjetaCVV").value.trim();

      // Assume all validation checks pass
      const allValidationsPass =
        cardholder !== "" &&
        cardNumber !== "" &&
        /^\d{4}\d{4}\d{4}\d{4}$/.test(cardNumber) &&
        expMonth !== "" &&
        expYear !== "" &&
        /^\d{2}$/.test(expMonth) &&
        /^\d{4}$/.test(expYear) &&
        cvv !== "" &&
        /^\d{3}$/.test(cvv);

      // Assert
      expect(allValidationsPass).toBe(true); // Check if all validation checks pass

      // Submit the form
      form.submit();

      // Perform additional assertions
      expect(localStorage.getItem("items")).toBeNull(); // Check if local storage is cleared
      expect(total.textContent).toBe("Total Price: ש0"); // Assuming the total is updated to 0 after submission
    });

    // Act
    // Append the payment details container and form to the document body
    document.body.appendChild(paymentDetailsContainer);
    document.body.appendChild(form);

    // Assert
    // Check the expected result, for example:
    expect(paymentDetailsContainer.textContent).toContain(
      "Total Price: ש" + totalPrice
    );
    expect(paymentDetailsContainer.textContent).toContain(
      "Please proceed with your payment."
    );
  });
});
