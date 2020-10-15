 let moment = require('moment');

 let globalTime;
 let isServerActive = false;

class TimeData{
	constructor(ISO){
		let now = moment(ISO);

		this.now 	 = now;
    	this.hours 	 = now.hours();
    	this.minutes = now.minutes();
    	this.seconds = now.seconds();
    	this.date    = now.format("ddd, MMMM DD");
	}
}

class SegmentTime{
     constructor(currentTime){
       this.hoursTens = Math.floor((currentTime.hours / 10) % 10);
       this.hoursOnes = currentTime.hours % 10;

       this.minutesTens = Math.floor((currentTime.minutes / 10) % 10);     
       this.minutesOnes = currentTime.minutes % 10;  

       this.seconds = currentTime.seconds;
     }
 }

function getCurrentSegmentTime(){
 	if(isServerActive){
 		return new SegmentTime(new TimeData(globalTime.iso));
 	}
 	else{	 
 		return new SegmentTime(new TimeData(moment().local().format())); 
 	}
}

function setGlobalTime(timeObject){
	 globalTime = timeObject;
	 isServerActive = true;
	 console.log(globalTime.iso8601);
}
