var speechModule = (function () {

	var _writeWrapper = function (msg) {
		return function () {
			samaritanModule.write(msg);
		};
	};

	var _flickrSearchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c359958b98a60fc24acdc9b2e3f11c90&format=json&per_page=20&tags=';

	var _flickrSearch = function(name){
		samaritanModule.write('searching for ' + name);
//			console.log(_flickrSearchUrl + name);
		$.ajax({
			url: _flickrSearchUrl + name,
			type: 'GET',
			dataType: 'json'
		}).always(function(data){
//				console.log(data.responseText.substring(18, data.responseText.length - 1));
			//18
			var photos = JSON.parse(data.responseText.substring(14, data.responseText.length - 1)).photos.photo;
			//console.log(photos);

			var photosURL = [];

			for(var i = 0; i < photos.length; i++){
				photosURL.push('https://farm' + photos[i].farm +'.static.flickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg');
			}

			console.log(photosURL);

			samaritanModule.showImages(photosURL);
		});
	}

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
		'find (me) *name': _flickrSearch,
		'search (for) *name': _flickrSearch,
		'show (me) *name': _flickrSearch,
		//repeats everything if it's not one of the above
		'*phrase': function (phrase) {
			samaritanModule.write(phrase);
		}
	};

	//PUBLIC **********************************

	var start = function () {
		if (annyang) {
			setTimeout(function () {
				samaritanModule.writeFromUrl();
				samaritanModule.write('what are your commands ?');
			}, 10000);

			annyang.addCommands(_commands);
			annyang.start();
		} else {
			setTimeout(function () {
				samaritanModule.writeFromUrl();
				samaritanModule.write('speech recognition not supported in this browser !');
			}, 10000);
		}
	};

	return {
		start: start
	};

})();
