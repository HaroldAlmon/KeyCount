// This function splits the textarea into separate lines and
// then splits each line into tokens.
function keyCounts() {
	var i;
	var arraySize;
	var text;
	var keyCount = {};
	var line;
	var tokenArray;
	var msg;
	var errorLog = '';
	var key = '';
	var keyValue = '';
	
	text = document.getElementById("textarea").value;
	
	// Clear out the previous results...
	var resultElem = document.getElementById("result");
	resultElem.innerHTML = '';
	
	if(text.length === 0) {
		alert("Please enter the key counts.");
		return;
	}

	// Map the lines to line array...
	line = text.split('\n');
	//console.log(line);
	arraySize = line.length;
	
	// Parse the textarea...
	for(i=0; i < arraySize; i++) {
		//console.log("Line" + i + " = " + line[i]);
		
		// Map the tokens to the token array...
		tokenArray = line[i].split(',');
		key = tokenArray[0];
		keyValue = tokenArray[1];
		
		if( key === '' ) {
			//logError("[] Empty line ignored.");
			continue;
		}
		
		if( tokenArray.length !== 2 ) {
			logError("[" + line[i] + "] Invalid input format in line ignored.");
			continue;
		}
		
		// Need to force the key-count to be an integer... 
		if( isNaN( keyValue ) ) {
			logError("[" + line[i] + "] Invalid number in line ignored.");
			continue;
		}
		
		keyValue = parseInt(tokenArray[1], 10);
		//console.log(key + '|' + keyValue); 
		
		// Add the keys to the keyCount object as an attribute...
		if( typeof keyCount[key] === 'number' ) {
			keyCount[key] += keyValue;
		}
		else {
			keyCount[key] = keyValue;
		}
	}
	displayResult(keyCount, resultElem);
	return;
	
	function displayResult(keyCount, resultElem) {
		var propertyName;
		
		// Display the key count totals...
		resultElem.innerHTML = '<p>*** Results ***</p>';
		for ( propertyName in keyCount) {
			msg = propertyName + ", Total = " + keyCount[propertyName];
			//console.log(msg);
			resultElem.innerHTML += "<p>" + msg + "</p>";
		}
		if (errorLog !== '') {
			resultElem.innerHTML += '<p>*** Errors detected in input text ***</p>';
			resultElem.innerHTML += errorLog;
		}		
	}
	
	function logError(msg) {
		errorLog += "<p>" + msg + "</p>";
	}
}