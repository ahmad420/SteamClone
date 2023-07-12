// Sample item data
const itemsData = [
  {
    id: 1,
    name: "Item 1",
    price: 10,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Item 2",
    price: 15,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Item 3",
    price: 20,
    image: "https://via.placeholder.com/200",
  },
];

// Add item to cart
function addToCart(item) {
  let cartItems = localStorage.getItem("items");

  if (cartItems) {
    cartItems = JSON.parse(cartItems);
  } else {
    cartItems = [];
  }

  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    item.quantity = 1;
    cartItems.push(item);
  }

  localStorage.setItem("items", JSON.stringify(cartItems));
}

// Jasmine test suite
describe("addToCart", function () {
  beforeEach(function () {
    // Clear cart before each test case
    localStorage.removeItem("items");
  });

  afterEach(function () {
    // Clean up cart modifications after each test case
    localStorage.removeItem("items");
  });

  it("should add the item to the cart", function () {
    // Arrange
    const item = {
      id: 15,
      name: "Item 15",
      price: 65,
      category: "Category 3",
      image: "https://via.placeholder.com/200",
    };
    const initialCartItems = JSON.parse(localStorage.getItem("items"));

    // Act
    addToCart(item);
    const updatedCartItems = JSON.parse(localStorage.getItem("items"));

    // Assert
    expect(updatedCartItems).toBeDefined();
    expect(updatedCartItems.length).toBe(
      initialCartItems ? initialCartItems.length + 1 : 1
    );
    expect(
      updatedCartItems.find((cartItem) => cartItem.id === item.id)
    ).toBeDefined();
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const jasmineEnv = jasmine.getEnv();
  jasmineEnv.configure({ random: false });
  jasmineEnv.addReporter(
    new jasmine.HtmlReporter({
      container: document.getElementById("jasmine-html"),
    })
  );
  jasmineEnv.execute();
});
