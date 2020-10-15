function resize(timeLine, targetElement, duration, targetWidth, targetHeight, 
				timeLineOffset,  callbackFunction, callbackFunctionParams){

	timeLine.to(targetElement, duration, 
				{
					width: targetWidth, 
					height: targetHeight, 
					onComplete: callbackFunction,
					onCompleteParams: callbackFunctionParams

				}, timeLineOffset);
}

function fadeIn(timeLine, targetElement, duration, timeLineOffset, 
				 callbackFunction, callbackFunctionParams){

	timeLine.fromTo(targetElement, duration, 
				{
					opacity: 0,
				 	display: "none"
				},
				{
					opacity: 1, 
					display: "flex", //CAUTION, prone to some unexpected results, Keep in Mind.
					onComplete: callbackFunction,
					onCompleteParams: callbackFunctionParams

				}, timeLineOffset);
}

function fadeOut(timeLine, targetElement, duration, timeLineOffset, 
				 callbackFunction, callbackFunctionParams){

	timeLine.fromTo(targetElement, duration, 
				{
					opacity: 1,
					display: targetElement.style.display
				},
				{
					opacity: 0, 
					display: "none",
					onComplete: callbackFunction,
					onCompleteParams: callbackFunctionParams

				}, timeLineOffset);
}
