const menuToggle = document.querySelector("button#menuToggle");

menuToggle.addEventListener("click", function () {
	document.querySelector(".menu_mobile").classList.toggle("show");
	const icon = document.querySelector(".menuToggleIcon");
	if (icon.classList.contains("fa-bars")) {
		icon.classList.remove("fa-bars");
		icon.classList.add("fa-times");
	} else if (icon.classList.contains("fa-times")) {
		icon.classList.remove("fa-times");
		icon.classList.add("fa-bars");
	}
});

window.addEventListener("scroll", function () {
	const navbar = document.querySelector("nav");
	navbar.classList.toggle("scrolled", window.pageYOffset > 100);
});
