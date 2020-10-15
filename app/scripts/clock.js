 var isTimerInitialized = false;

  let initialSegmentColor = "#333031";
  let targetSegmentColor = "#11b20e";

  let updateInterval;

  let segmentList = ['ABCDEF','BC', 'ABDEG', 'ABCDG','BCFG','ACDFG', 'ACDEFG','ABC','ABCDEFG','ABCDFG']

  let segments = document.getElementsByClassName('timer-segment');
  let lastCombination = new Array(segments.length)

   function updateTime(){
    const segmentTime = getCurrentSegmentTime();
    updateSegments(segmentList, segments, segmentTime);
  }

  function updateSegments(Combinations, Segments, Time, UpdateCount){
    let segmentType = null, segmentTarget = null, combination = null;
    let timeValues = Object.values(Time);
    
    for(let i = Segments.length - 1; i >= 0; i--){
        segmentType = Segments[i];
        combination = Combinations[timeValues[i]];

        if(combination !== lastCombination[i]){
          let fill, unfill;

          if(isTimerInitialized == true){

              fill   = combination.match(new RegExp("[^" + lastCombination[i] + "]", 'g'));
              unfill = lastCombination[i].match(new RegExp("[^" + combination + "]", 'g'));
          
              lastCombination[i] = combination;

            }else{fill = lastCombination[i] = combination;}

            if(unfill != null){
              unfill = unfill.toString();

              for(let uf = 0; uf < unfill.length; uf++){
                  segmentTarget = unfill.charAt(uf);
                  styleSegment(segmentType, segmentTarget, initialSegmentColor);
              }
            }
            if(fill != null){
               fill = fill.toString();

               for(let f = 0; f < fill.length; f++){
                  segmentTarget = fill.charAt(f);
                  styleSegment(segmentType, segmentTarget, targetSegmentColor);
              }
            }
          }else{break;}
        } 

    if(isTimerInitialized == false)
      {
        isTimerInitialized = true; 

        updateInterval = ((60 - getCurrentSegmentTime().seconds) * 1000); 
        console.log(getCurrentSegmentTime().seconds);

    }else{updateInterval = 60000;}
  }

  function styleSegment(SegmentElement, SegmentTarget, SegmentColor){
    SegmentElement.style.setProperty('--' + SegmentTarget + '-sub-segment', SegmentColor);
  }

  var interval = function() {
    updateTime(); 
    setTimeout(interval, updateInterval);
  }

  interval();