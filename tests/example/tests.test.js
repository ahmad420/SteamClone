//הוספת מוצר חדש למאגר המוצרים:
describe('Add new product', function() {
  it('should add a new product to the product repository', function() {
    // Arrange
    var itemsData = []; // Define an empty itemsData array
    var newItem = { name: 'New Product', price: 10 }; // Define a new product
    
    // Act
    // Add the new item to the itemsData array
    itemsData.push(newItem);
    // Save the updated itemsData in local storage (mock implementation)
    localStorage.setItem('itemsData', JSON.stringify(itemsData));
    // Perform any necessary additional operations based on your code implementation

    // Assert
    // Check the expected result, for example:
    // Expect the length of itemsData to be 1 after adding the new product
    expect(itemsData.length).toBe(1);
  });
});
  

  //הוספת מוצר לעגלה:
describe('Add product to cart', function() {
  it('should add a product to the shopping cart', function() {
    // Arrange
    var cart = []; // Define an empty cart
    var obj = {}; // Create an object to hold the functions

    // Act
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          return;
        }
      }
      var item = { name: name, price: price, count: count };
      cart.push(item);
    };

    obj.addItemToCart('Product 1', 10, 1); // Add a product to the cart

    // Assert
    expect(cart.length).toBe(1); // Check that the product was added to the cart
    expect(cart[0].name).toBe('Product 1'); // Check that the product name is correct
  });
});

  

  //הסרת מוצר מהעגלה:
  describe('Remove product from cart', function() {
    it('should remove a product from the shopping cart', function() {
      // Arrange
      var cart = []; // Define an empty cart
      var obj = {}; // Create an object to hold the functions
  
      // Act
      obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count--;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
        }
      };
  
      // Add a product to the cart
      cart.push({ name: 'Product 1', price: 10, count: 1 });
      
      obj.removeItemFromCart('Product 1'); // Remove the product from the cart
  
      // Assert
      expect(cart.length).toBe(0); // Check that the product was removed from the cart
    });
  });
  

  //תהליך רכישה כללי:
  describe('General purchase process', function() {
    it('should complete the general purchase process', function() {
      // Arrange
      const queryString = '?total=100'; // Define the query parameter for total price
      const urlParams = new URLSearchParams(queryString);
      const totalPrice = urlParams.get('total');
  
      const paymentDetailsContainer = document.createElement('div'); // Create a container element
      const totalText = document.createElement('p');
      totalText.textContent = 'Total Price: ש' + totalPrice;
      const paymentMessage = document.createElement('p');
      paymentMessage.textContent = 'Please proceed with your payment.';
  
      paymentDetailsContainer.appendChild(totalText);
      paymentDetailsContainer.appendChild(paymentMessage);
  
      // Act
      // Perform any necessary actions to simulate the purchase process, such as clicking the "Make payment" button
  
      // Assert
      // Check the expected result, for example:
      // Expect the paymentDetailsContainer to contain the expected text content
      expect(paymentDetailsContainer.textContent).toContain('Total Price: ש' + totalPrice);
      expect(paymentDetailsContainer.textContent).toContain('Please proceed with your payment.');
    });
  });
  