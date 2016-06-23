$(document).ready(function(){
	setTimeout(function(){
		executeSamaritan('what are your commands ?');
//		executeSamaritanWrapper('adsasd')();
	}, 1000);

	var executeSamaritanWrapper = function(msg){
		return function(){executeSamaritan(msg)};
	};

	if (annyang) {

		var commands = {
			'yes': executeSamaritanWrapper('yes?'),
			'hello': executeSamaritanWrapper('hello'),
			'who are you': executeSamaritanWrapper('i am samaritan !'),
			'turn off': executeSamaritanWrapper('turning off'),
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
