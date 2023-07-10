// Variables
const cart = document.getElementById("cart");
const courses = document.getElementById("course-list");
const courselist = document.querySelector("#lista-carrito tbody");
const emptyCartBtn = document.getElementById("vaciar-carrito");
const buyBtn = document.getElementById("buy-btn");

// Listeners
loadEventListeners();

function loadEventListeners() {
  // Trigger when "Add Cart" is pressed
  courses.addEventListener("click", buyCourse);
  // When removing a course from the cart
  cart.addEventListener("click", removeCourse);
  // When emptying the cart
  emptyCartBtn.addEventListener("click", emptyCart);

  buyBtn.addEventListener("click", buyCart);
  // When loading the document, display LocalStorage
  document.addEventListener("DOMContentLoaded", readLocalStorage);
}

// Functions

// Function that adds the course to the cart
function buyCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const course = e.target.parentElement.parentElement;
    readCurrentData(course);
  }
}

// Read the course data
function readCurrentData(course) {
  const courseInfo = {
    img: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".discount").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };
  insertToCart(courseInfo);
}

// Display the selected course in the Cart
function insertToCart(course) {
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>
  <img src="${course.img}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
  </td>
  `;
  courselist.appendChild(row);
  saveCourseLocalStorage(course);
}

// Remove the cart course in the DOM
function removeCourse(e) {
  e.preventDefault();
  let course, courseId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");
  }
  removeLocalStorageCourse(courseId);
}

// Remove the courses from the cart in the DOM
function emptyCart() {
  while (courselist.firstChild) {
    courselist.removeChild(courselist.firstChild);
  }

  // Empty LocalStorage
  emptyLocalStorage();
  return false;
}

//redirect to thanks page
function buyCart() {
  location.replace("../pages/payment.html");
}

// Store courses in cart to Local Storage
function saveCourseLocalStorage(course) {
  let courses;
  // Take the value of an array with data from LA or empty
  courses = getCoursesLocalStorage();
  // selected course is added to array
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Check for items in Local Storage
function getCoursesLocalStorage() {
  let coursesLS;
  // check if there's anything in localStorage

  if (localStorage.getItem("courses") === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse(localStorage.getItem("courses"));
  }
  return coursesLS;
}

// Print the Local Storage courses in the cart
function readLocalStorage() {
  let coursesLS;
  coursesLS = getCoursesLocalStorage();
  coursesLS.forEach(function (course) {
    // build the template
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>
  <img src="${course.img}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
  </td>
  `;
    courselist.appendChild(row);
  });
}

// Delete the course by ID in Local Storage
function removeLocalStorageCourse(course) {
  let coursesLS;
  // Get the array of courses
  coursesLS = getCoursesLocalStorage();
  // We iterate comparing the ID of the deleted course with those of the LS
  coursesLS.forEach(function (coursesLS, index) {
    if (coursesLS.id === course) {
      coursesLS.splice(index, 1);
    }
  });
  // Add the current array to storage
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}

// Delete all courses from Local Storage
function emptyLocalStorage() {
  localStorage.clear();
}
