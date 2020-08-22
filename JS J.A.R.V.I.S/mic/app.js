let Commands;
const API_KEY = "77e48ff07f547668e7b10424afa62bae";

function fetchCommands() {
	fetch("/mic/process.json").then((response) => {
		response.json().then((data) => {
			Commands = data;
		});
	});
}

fetchCommands();

const SpeechRecognition =
	window.speechRecognition || window.webkitSpeechRecognition;

function startListening() {
	let recog = new SpeechRecognition();
	recog.start();
	recog.onstart = microphoneButton.classList.add("listen");

	recog.onresult = function (data) {
		microphoneButton.classList.remove("listen");
		handleResults(data);
	};
	// new
	recog.onend = function () {
		microphoneButton.classList.remove("listen");
	};
}

function handleResults(data) {
	let text = data.results[0][0].transcript;
	text = text.toLowerCase();

	ProcessCommand(text);
}

function ProcessCommand(UserText) {
	for (eachCommand in Commands) {
		if (UserText.includes(eachCommand) || UserText == eachCommand) {
			let task = Commands[eachCommand];
			eval(task);

			break;
		}
	}
}

function Speak(TEXT) {
	const utter = new SpeechSynthesisUtterance();
	utter.volume = 1;
	utter.text = TEXT;
	window.speechSynthesis.speak(utter);
}
function getCurrentTime() {
	const date = new Date();

	let hour = date.getHours();
	let minutes = date.getMinutes();
	currentTimeIs = `${hour} ${minutes}`;
	Speak("The Time Is... " + currentTimeIs);
}

microphoneButton.addEventListener("click", startListening);

function openWeb(Url) {
	window.open(Url);
}

function getWeatherDetails() {
	// Get Geolocation

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(async function (position) {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;

			// Making API Url

			const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
			let response = await fetch(api_url);

			let data = await response.json();

			manipulateWeatherData(data);
		});
	}
}

function manipulateWeatherData(data) {
	let city = data.name;

	let temp = data.main.temp;

	let icon = data.weather[0].icon;
	let description = data.weather[0].main;

	let msg = `Current Temperature Is ${temp} Degree Celcius`;

	Speak(msg);
}

function setTimer(timerDuration) {
	let time = {
		hours: undefined,
		minutes: undefined,
		seconds: undefined,
	};

	timerDuration = timerDuration.split(" ");

	timerDuration.forEach(function (word, index) {
		switch (word) {
			case "hour":
				hour = parseInt(timerDuration[index - 1]);
				time.hours = hour;
				break;
			case "minute":
				minute = parseInt(timerDuration[index - 1]);

				time.minutes = minute;

				break;
			case "second":
				second = parseInt(timerDuration[index - 1]);

				time.seconds = second;

				break;
			case "hours":
				hour = parseInt(timerDuration[index - 1]);

				time.hours = hour;

				break;
			case "minutes":
				minutes = parseInt(timerDuration[index - 1]);

				time.minutes = minutes;

				break;
			case "seconds":
				seconds = parseInt(timerDuration[index - 1]);

				time.seconds = seconds;

				break;
		}
	});

	let timeInString = `${time.hours ? time.hours + " hours" : ""} ${
		time.minutes ? time.minutes + " minutes" : ""
	} ${time.seconds ? time.seconds + " seconds" : ""}`.trim();

	let countingTime = 0;

	let countingHour = time.hours ? time.hours * (60 * 60 * 1000) : 0;

	let countingMinute = time.minutes ? time.minutes * (60 * 1000) : 0;

	let countingSecond = time.seconds ? time.seconds * 1000 : 0;

	countingTime += countingHour;
	countingTime += countingMinute;
	countingTime += countingSecond;

	Speak(`Hey Your Timer For ${timeInString} Has Been Set`);
	setTimeout(function () {
		notifyMe(timeInString);
	}, countingTime);
}
function notifyMe(speakTime) {
	if (!("Notification" in window)) {
		alert("This browser does not support system notifications");
	} else if (Notification.permission === "granted") {
		notify();
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission(function (permission) {
			if (permission === "granted") {
				notify();
			}
		});
	}

	function notify() {
		Speak(`Your Timer Is Over For ${speakTime}`);
		var notification = new Notification("Your Timer Is Over!", {
			icon: "http://carnes.cc/jsnuggets_avatar.jpg",
			body: "Hey! Your Timer Out",
		});

		notification.onclick = function () {
			window.open("http://127.0.0.1:5500/mic/");
		};
		setTimeout(notification.close.bind(notification), 7000);
	}
}
