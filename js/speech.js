$(document).ready(function(){
	setTimeout(function(){
		executeSamaritan('what are your commands ?');
	}, 700);

	var executeSamaritanWrapper = function(msg){
		return function(){executeSamaritan(msg)};
	};

	if (annyang) {
		var commands = {
			'locate the machine': executeSamaritanWrapper('Target can not be reached !'),
			'where are you': executeSamaritanWrapper("I am everywhere , i am god"),
			'hello': executeSamaritanWrapper('hello'),
			'who am I': executeSamaritanWrapper("Asset"),
			'who are you': executeSamaritanWrapper('i am samaritan !'),
			'find Finch': executeSamaritanWrapper('Locating Harold Finch ?'),
			'yes': executeSamaritanWrapper('yes what ?'),
			'no': executeSamaritanWrapper('ok then what is your suggestion ?'),
			'what are you': executeSamaritanWrapper('i am samaritan !'),
			'turn off': executeSamaritanWrapper('shutdown initiated'),
			'restart': executeSamaritanWrapper('initiating reboot sequence'),
			'who created you': executeSamaritanWrapper("it's irrelevant"),
			'who won': executeSamaritanWrapper('team machine'),
			'say my name': executeSamaritanWrapper('heisenberg'),
			'find (me) *name': function(name){
				executeSamaritan('searching for ' + name);
			},
			'search (for) *name': function(name){
				executeSamaritan('searching for ' + name);
			},
			//repeats everything if it's not one of the above
			'*phrase': function(phrase){
				executeSamaritan(phrase);
			}
		};

		annyang.addCommands(commands);
		annyang.start();
	}
});
