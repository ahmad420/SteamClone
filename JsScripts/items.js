/****** */
window.addEventListener("DOMContentLoaded", displayAllItems);
function displayAllItems() {
    const itemsContainer = document.getElementById("items-container");
  
    // Clear existing items
    itemsContainer.innerHTML = "";
  
    // Retrieve items data from local storage
    const storedItemsData = localStorage.getItem("itemsData");
    const itemsData = JSON.parse(storedItemsData);
  
    // Render each item
    itemsData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card col-md-3";
  
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = item.image;
      img.alt = item.name;
  
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
  
      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = item.name;
  
      const price = document.createElement("p");
      price.className = "card-text";
      price.textContent = "Price: ש " + item.price;
  
      const editButton = document.createElement("button");
      editButton.textContent = "עריכה";
      editButton.addEventListener("click", () => editItem(item.id));
  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteItem(item.id));

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(editButton);
      cardBody.appendChild(deleteBtn);

      
  
      card.appendChild(img);
      card.appendChild(cardBody);
  
      itemsContainer.appendChild(card);
    });
  }
  

function editItem(itemId) {
  // Retrieve items data from local storage
  const storedItemsData = localStorage.getItem("itemsData");
  const itemsData = JSON.parse(storedItemsData);

  // Find the item to edit based on the itemId
  const itemToEdit = itemsData.find((item) => item.id === itemId);

  // Perform the edit action, for example, display a form to edit the item details
  console.log("Editing item:", itemToEdit);

  // Find the index of the item in the itemsData array
  const itemIndex = itemsData.findIndex((item) => item.id === itemId);

  // If the item is found
  if (itemIndex !== -1) {
    // Prompt the user for the new item details
    const newName = prompt("Enter the new name:", itemToEdit.name);
    const newPrice = parseFloat(prompt("Enter the new price:", itemToEdit.price));
    const newCategory = prompt("Enter the new category:", itemToEdit.category);
    const newImage = prompt("Enter the new image URL:", itemToEdit.image);

    // Update the item details in the itemsData array
    itemsData[itemIndex] = {
      ...itemToEdit,
      name: newName,
      price: newPrice,
      category: newCategory,
      image: newImage,
    };

    // Save the updated itemsData array back to local storage
    localStorage.setItem("itemsData", JSON.stringify(itemsData));

    // Redirect to the admin page to refresh the items display
    window.location.href = "items.html";
  } else {
    alert("Item not found.");
  }
}

function deleteItem(itemId) {
    // Retrieve items data from local storage
    const storedItemsData = localStorage.getItem("itemsData");
    const itemsData = JSON.parse(storedItemsData);
  
    // Find the index of the item to delete based on the itemId
    const itemIndex = itemsData.findIndex((item) => item.id === itemId);
  
    // If the item is found
    if (itemIndex !== -1) {
      // Remove the item from the itemsData array
      itemsData.splice(itemIndex, 1);
  
      // Save the updated itemsData array back to local storage
      localStorage.setItem("itemsData", JSON.stringify(itemsData));
  
      // Redirect to the admin page to refresh the items display
      window.location.href = "items.html";
    } else {
      alert("Item not found.");
    }
  }
  

  // קוד JavaScript שמוסיף אירועים וכפתורים לכל מוצר בדף
  const itemsContainer = document.getElementById("items-container");
  itemsData.forEach((item) => {
    const itemElement = document.createElement("div");
    // הוספת התכונה 'data-item-id' לאלמנט שמכיל את המזהה של המוצר
    itemElement.setAttribute("data-item-id", item.id);

    const itemNameElement = document.createElement("span");
    itemNameElement.textContent = item.name;

    // הוספת כפתור "עריכה" עם אירוע 'click' שקורא לפונקציה editItem ומעביר לה את המזהה של המוצר
    const editButton = document.createElement("button");
    editButton.textContent = "עריכה";
    editButton.addEventListener("click", function () {
      const itemId = this.parentElement.getAttribute("data-item-id");
      editItem(itemId);
    });

    // הוספת כפתור "מחיקה" עם אירוע 'click' שקורא לפונקציה deleteItem ומעביר לה את המזהה של המוצר
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "מחיקה";
    deleteButton.addEventListener("click", function () {
      const itemId = this.parentElement.getAttribute("data-item-id");
      deleteItem(itemId);
    });

    // הוספת האלמנטים לאלמנט המוצר
    itemElement.appendChild(itemNameElement);
    itemElement.appendChild(editButton);
    itemElement.appendChild(deleteButton);

    // הוספת האלמנט המוצר לתצוגה הכוללת של המוצרים
    itemsContainer.appendChild(itemElement);
  });
  
  