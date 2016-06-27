var speechModule = (function () {

	var _writeWrapper = function (msg) {
		return function () {
			samaritanModule.write(msg);
		};
	};

	var _commands = {
		'locate the machine': _writeWrapper('Target can not be reached !'),
		'where are you': _writeWrapper("I am everywhere , i am god"),
		'who am I': _writeWrapper("Asset"),
		'who are you': _writeWrapper('i am samaritan !'),
		'find Finch': _writeWrapper('Locating Harold Finch ?'),
		'yes': _writeWrapper('yes what ?'),
		'no': _writeWrapper('ok then what is your suggestion ?'),
		'what are you': _writeWrapper('i am samaritan !'),
		'turn off': _writeWrapper('shutdown initiated'),
		'restart': _writeWrapper('initiating reboot sequence'),
		'who created you': _writeWrapper("it's irrelevant"),
		'who won': _writeWrapper('team machine'),
		'find (me) *name': function (name) {
			samaritanModule.write('searching for ' + name);
		},
		'search (for) *name': function (name) {
			samaritanModule.write('searching for ' + name);
		},
		//repeats everything if it's not one of the above
		'*phrase': function (phrase) {
			samaritanModule.write(phrase);
		}
	};

	//PUBLIC **********************************

	var start = function () {
		if (annyang) {
			setTimeout(function () {
				samaritanModule.write('what are your commands ?');
			}, 10000);

			annyang.addCommands(_commands);
			annyang.start();
		} else {
			setTimeout(function () {
				samaritanModule.write('speech recognition not supported in this browser !');
			}, 10000);
		}
	};

	return {
		start: start
	};

})();
