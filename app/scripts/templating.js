var optionsContainer;
var alarmContent;
var settingsContent;

var loadTemplates = function(){

	optionsContainer = document.getElementById("options-container");

 	alarmContent = document.createElement('div');
	settingsContent = document.createElement('div');

	alarmContent.setAttribute("id", "alarm-container");
	settingsContent.setAttribute("id", "settings-container");

	load('./alarm.html', alarmContent);
	load('./settings.html', settingsContent);
}

function load(filePath, element) {
  	var xhttp = new XMLHttpRequest();

  	xhttp.open("GET", filePath, true);
  	xhttp.send();

  	xhttp.onreadystatechange = function () {
    	if (xhttp.readyState != 4 || xhttp.status != 200) return null;  
    		element.innerHTML = xhttp.responseText;

  	};
}

loadTemplates();