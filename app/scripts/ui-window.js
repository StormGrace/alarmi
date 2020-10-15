
const appWindow = document.getElementById("clock-window-main");
const appWidth  = appWindow.offsetWidth;
const appHeight = appWindow.offsetHeight;

const clockDisplay = document.getElementById("display-container-inner");

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

function openClock(){
	let windowTimeline = new TimelineLite();
 	fadeIn(windowTimeline, clockDisplay, 2, "");
}

function openOptions(buttonClicked){
	let windowTimeline = new TimelineLite();

	fadeOut(windowTimeline, clockDisplay, 0.5, "", sendWindowEvent, ["openOptions", buttonClicked]);
	resize(windowTimeline, appWindow, 0.5, "85%", 165, "+=0.02", openOptionsCallback, [buttonClicked]);
}

function openOptionsCallback(buttonClicked){
	if(buttonClicked == "bell-button")	{
		optionsContainer.appendChild(alarmContent);
	}
 	else if(buttonClicked == settingsButtonId)	{
 		optionsContainer.appendChild(settingsContent);
 	}

 	let windowTimeline = new TimelineLite();
 	fadeIn(windowTimeline, optionsContainer, 1, "");
}

function sendWindowEvent(event, data){
	ipcRenderer.send(event, data);
}