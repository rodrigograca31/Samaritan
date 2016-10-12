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
	//Added Real Power of AI - with AI API from api.ai
	var accessToken = "Client access token from api.ai";//Please use your own accessToken. 
	var baseUrl = "https://api.api.ai/v1/";
	var _send = function (phrase) {
		console.log('Welcome to Samaritan ASI!');
		console.log('processing send');
		var text = phrase;
		$.ajax({
			type: "POST",
			url: baseUrl + "query?v=20160910",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			data: JSON.stringify({ q: text, lang: "en" }),
			success: function(data) {
				var txt = data.result.fulfillment.speech;
				samaritanModule.write(txt);
				console.log(txt);
			},
			error: function() {
				samaritanModule.write('Internal Server Error');
			}
		});
		samaritanModule.write('...');
	};
	//Added Real Power of AI - Ends Here
	
	var _commands = {
		'locate the machine': _writeWrapper('Target can not be reached !'),
		//'where are you': _writeWrapper("I am everywhere , i am god"),//implemented in AI
		'who am I': _writeWrapper("Admin"),
		//'who are you': _writeWrapper('i am samaritan !'),//implemented in AI
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
		//This is now handled by AI
		'*phrase': _send
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
