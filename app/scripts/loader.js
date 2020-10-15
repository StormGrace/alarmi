
let loadingBar 	= document.getElementById('loading-bar');
let loadingText = document.getElementById('loading-info');
let loadingPage = document.getElementById('loading-bar-container');
let clock 		= document.getElementById('display-container-inner');

let executionStart, executionEnd, executionTime;
let processCount, step;

let loadingBarTimeline = new TimelineLite();

class Script{
	constructor(scriptPath, processName){
		this.scriptPath  = scriptPath;
		this.processName = processName;
	}
}

document.addEventListener('DOMContentLoaded', function(event){

	let scripts = [new Script('scripts/templating.js', 'Loading Tabs'),
				   new Script('scripts/timer-animations.js', 'Loading Clock Animations'),
			       new Script('scripts/ui-animations.js', 'Setting UI Animations'),
			       new Script('scripts/ui-buttons.js', 'Setting UI Buttons'),
			       new Script('scripts/ui-window.js', 'Setting UI Window'),
			       new Script('scripts/time.js', 	'Configuring Time'),
			       new Script('scripts/server.js',	'Connecting to Server'),
			       new Script('scripts/clock.js', 	'Initializing Clock Display'),];

    loadScript(scripts);
})

async function loadScript(scripts){
	processCount = scripts.length;
	step = Math.floor(100 / processCount);

	for(let script of scripts){
		let Script =  document.createElement('script');

	 	Script.src = script.scriptPath;
		Script.type = "application/javascript";
		Script.async = false;

	 	document.body.appendChild(Script);

	 	await loadCurrentScript(Script, script.processName);
	}

	loadingPage.style.display = "none";
	openClock();
}

async function loadCurrentScript(Script, processName){
 	return new Promise(function(resolve, reject){
 		let executionStart = performance.now();
 		let executionEnd, executionTime;

 		Script.addEventListener('load', function(){
 			if(processName != "Connecting to Server"){
 				executionEnd = performance.now();
 				executionTime = executionEnd - executionStart;
 			}else{
 				resolve(connectToServer());
 		 		executionEnd = performance.now();
 				executionTime = executionEnd - executionStart;
 			}
 			resolve(UpdateProgressBar(processName, executionTime));
 		})
 	})
 } 	

async function UpdateProgressBar(processName, executionTime){
 	return new Promise(function(resolve, reject){
 		loadingText.innerHTML = processName + "...";
		loadingBarTimeline.fromTo(loadingBar, executionTime / 500, {width: loadingBar.style.width}, {width: step + "%"});
		loadingBarTimeline.set(loadingBar, {width: step + "%", onComplete: function(){step += step; resolve();}});
	})
}
 

 