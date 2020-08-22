const microphoneButton = document.getElementById("microphoneButton");

microphoneButton.addEventListener("click", function () {
	window.open(
		"http://localhost:5500/mic/",
		"nativeWindow",
		"width=350,height=300"
	);
});
