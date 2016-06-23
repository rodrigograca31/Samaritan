$(document).ready(function(){
	setTimeout(function(){
		executeSamaritan('what are your commands ?');
//		executeSamaritanWrapper('adsasd')();
	}, 700);

	var executeSamaritanWrapper = function(msg){
		return function(){executeSamaritan(msg)};
	};

	if (annyang) {
		var commands = {
			'yes': executeSamaritanWrapper('yes what ?'),
			'no': executeSamaritanWrapper('ok then what is your suggestion ?'),
			'hello': executeSamaritanWrapper('hello'),
			'who are you': executeSamaritanWrapper('i am samaritan !'),
			'what are you': executeSamaritanWrapper('i am samaritan !'),
			'turn off': executeSamaritanWrapper('shutdown initiated'),
			'restart': executeSamaritanWrapper('initiating reboot sequence'),
			'who created you': executeSamaritanWrapper("it's irrelevant"),
			'who won': executeSamaritanWrapper('team machine'),
			'say my name': executeSamaritanWrapper('heisenberg'),
			'find :name': function(name){
				executeSamaritan('searching for ' + name);
			},
			'search (for) :name': function(name){
				executeSamaritan('searching for ' + name);
			},
			//repeats words if it's not one of the above
			':first :second :third': function(first, second, third){
				executeSamaritan(first + ' ' + second + ' ' + third + ' ?');
			},
			':first :second': function(first, second){
				executeSamaritan(first + ' ' + second + ' ?');
			},
			':word': function(word){
				executeSamaritan(word + ' ?');
			}
		};

		annyang.addCommands(commands);
		annyang.start();
	}

});
