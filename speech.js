$(document).ready(function(){
	setTimeout(function(){
		executeSamaritan('what are your commands ?');
	}, 1000);

	var executeSamaritanWrapper = function(msg){
		return function(){executeSamaritanWrapper(msg)};
	};

	if (annyang) {

		var commands = {
			'hello (samaritan)': executeSamaritanWrapper('hello'),
			'who are you': executeSamaritanWrapper('i am samaritan !'),
			'turn off': executeSamaritanWrapper('turning off'),
			'reboot': executeSamaritanWrapper('rebooting'),
			'restart': executeSamaritanWrapper('rebooting'),
			'who created you': executeSamaritanWrapper("it's irrelevant"),
			'find :name': function(name){
				executeSamaritan('searching for ' + name);
			},
			'search (for) :name': function(name){
				executeSamaritan('searching for ' + name);
			}
		};

		annyang.addCommands(commands);
		annyang.start();

	}

});
