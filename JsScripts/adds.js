var images = [
  "../images/fifa1.jpg",
  "../images/gta1.jpg",
  "../images/minicraft.jpg",
  "../images/forza.jpg",
  "../images/redead.jpg",
  "../images/nfs.jpg",
  "../images/spider.jpg",
  "../images/wwe.jpg",
  "../images/sims.jpg",
];
var titles = [
  "Fifa 2023",
  "Grand-Theft-Auto",
  "MineCraft",
  "forza",
  "Red Dead",
  "Need For Speed",
  "Spider Man",
  "WWE",
  "The Sims",
];
var descriptions = [
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
  "תיאור המוצר",
];
var prices = [
  "מחיר: ₪99.99",
  "מחיר: ₪129.99",
  "מחיר: ₪129.99",
  "מחיר: ₪99.99",
  "מחיר: ₪129.99",
  "מחיר: ₪129.99",
  "מחיר: ₪99.99",
  "מחיר: ₪129.99",
  "מחיר: ₪129.99",
];

var salePrices = [
  "מחיר מבצע: ₪79.99",
  "מחיר מבצע: ₪99.99",
  "מחיר מבצע: ₪99.99",
  "מחיר מבצע: ₪79.99",
  "מחיר מבצע: ₪99.99",
  "מחיר מבצע: ₪99.99",
  "מחיר מבצע: ₪79.99",
  "מחיר מבצע: ₪99.99",
  "מחיר מבצע: ₪99.99",
];

var links = [
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
  "../pages/store.html",
];

function createSlider() {
  var sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider");

  var slideContainer = document.createElement("div");
  slideContainer.classList.add("slide-container1");

  for (var i = 0; i < images.length; i++) {
    var slide = document.createElement("div");
    slide.classList.add("slide");

    var sliderTitle = document.createElement("h2");
    sliderTitle.classList.add("slider-title");
    sliderTitle.textContent = "SALES & NEW ARRIVALS";
    slide.appendChild(sliderTitle);

    var slideImage = document.createElement("img");
    slideImage.src = images[i];
    slideImage.alt = "Product " + (i + 1);
    slideImage.classList.add("slide-image");
    slide.appendChild(slideImage);

    var slideContent = document.createElement("div");
    slideContent.classList.add("slide-content");

    var slideTitle = document.createElement("h3");
    slideTitle.classList.add("slide-title");
    slideTitle.textContent = titles[i];
    slideContent.appendChild(slideTitle);

    var slideDescription = document.createElement("p");
    slideDescription.classList.add("slide-description");
    slideDescription.textContent = descriptions[i];
    slideContent.appendChild(slideDescription);

    var slidePrice = document.createElement("p");
    slidePrice.classList.add("slide-price");
    slidePrice.textContent = prices[i];
    slideContent.appendChild(slidePrice);

    var slideSalePrice = document.createElement("p");
    slideSalePrice.classList.add("slide-sale-price");
    slideSalePrice.textContent = salePrices[i];
    slideContent.appendChild(slideSalePrice);

    var slideLink = document.createElement("a");
    slideLink.href = links[i];
    slideLink.classList.add("slide-link");
    slideLink.textContent = "קנה עכשיו";
    slideContent.appendChild(slideLink);

    slide.appendChild(slideContent);
    slideContainer.appendChild(slide);
  }

  sliderContainer.appendChild(slideContainer);

  var sliderNav = document.createElement("div");
  sliderNav.classList.add("slider-nav");

  var prevButton = document.createElement("button");
  prevButton.classList.add("nav-button", "prev-button");
  prevButton.innerHTML = "&lt;";
  sliderNav.appendChild(prevButton);

  var nextButton = document.createElement("button");
  nextButton.classList.add("nav-button", "next-button");
  nextButton.innerHTML = "&gt;";
  sliderNav.appendChild(nextButton);

  sliderContainer.appendChild(sliderNav);

  // הוספת הסליידר לאלמנט ב-HTML
  var sliderElement = document.getElementById("slider-container");
  sliderElement.appendChild(sliderContainer);
}

// קריאה לפונקציה על מנת ליצור את הסליידר
createSlider();

const slider = document.querySelector(".slider");
const slideContainer = document.querySelector(".slide-container1");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentSlide = 0;
let isAnimating = false;

function goToSlide(index) {
  slideContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  if (!isAnimating) {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }
}

function prevSlide() {
  if (!isAnimating) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }
}

// Auto play the slides
const autoPlayInterval = setInterval(nextSlide, 5000);

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);
