var alarmButtonId = "bell-button";
var settingsButtonId = "settings-button";

 	var uiButtons = document.querySelector('#buttons-main-container-inner');
		uiButtons.addEventListener('click', onClickOptions);
	  
function onClickOptions(e){
	let elementClicked = e.target;

	if(elementClicked != e.currentTarget){
		 openOptions(elementClicked.id);
    }

    //disable Buble effect on elements.
  	e.stopPropagation();  
}

