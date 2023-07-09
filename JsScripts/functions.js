// קוד JavaScript thnx page
window.onload = function() {
	var element = document.querySelector('.circle-link');
	element.style.opacity = '0'; // הצגת האלמנט על המסך

	setTimeout(function() {
		element.style.opacity = '1'; // הסתרת האלמנט מהמסך
	}, 2000); // 2000 מילישניות = 2 שניות
};