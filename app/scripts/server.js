let datetimeAPI_URL = 'https://timedate.herokuapp.com/datetime';

const https = require('https');

async function connectToServer(){
return new Promise(function(resolve, reject){
	https.get(datetimeAPI_URL, async function(res){
        res.on('data', async function(data){
            try{
            		let TimeObject = JSON.parse(data);
					setGlobalTime(TimeObject);
					
            	 	console.log("Connection to the DateTime-API has been established with IP of: !\n" + 
                       		"Received DateTime:\n" + data + "\n" + 
                        	"Switching to global time...");
        	}
        	catch(e)
        	{
        		console.log("[ERROR] The Received JSON String Couldn't be Parsed!\n" + 
        					"Switching to LocalTime...");
        	}finally{
        		resolve();
        	}

        });
	}).on('error', function(error){
        console.log("[ERROR]Connection to the DateTime-API couldn't be established!'\n" + 
                    "Switching to Local Time...\n" + error);
  			resolve();
		})
	});
}

function parseJSONString(JSONString){
	let TimeObject = JSON.parse(JSONString);
	setGlobalTime(TimeObject);
}

