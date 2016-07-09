$(document).ready(function(){
	samaritanModule.start();
	speechModule.start();

//	var baseSpeed = 8770;
//	var scrollBarInterval = 3000;
//	var imageInterval = 537;
//
//	var leftRatio = Math.random() / 2 + 1.1;
//
//	setInterval(function(){
//		var image = $('<img src="http://lorempixel.com/200/200/?v=1404442966794?v=' + Math.random() + '">');
//		$('body').append(image);
//		image.attr('style', 'position: fixed; left: 20vw; top: 2000px; z-index: -1;');
//		image.velocity({
//			top: '-2000px'
//		}, baseSpeed * leftRatio, 'linear', function(){
//			image.remove();
//		});
//
//
//	}, imageInterval * leftRatio);
//
//	setInterval(function(){
//		var scrollbar = $('<img src="img/scrollbar.png">');
//		$('body').append(scrollbar);
//		scrollbar.attr('style', 'position: fixed; left: 10vw; top: 2000px; z-index: -1;');
//		scrollbar.velocity({
//			top: '-2000px'
//		}, baseSpeed * leftRatio, 'linear', function(){
//			scrollbar.remove();
//		});
//	}, scrollBarInterval * leftRatio);
//
//	var rightRatio = Math.random() / 2 + 1.1;
//
//	setInterval(function(){
//		var image = $('<img src="http://lorempixel.com/200/200/?v=1404442966794?v=' + Math.random() + '">');
//		$('body').append(image);
//		image.attr('style', 'position: fixed; right: 20vw; top: 2000px; z-index: -1;');
//		image.velocity({
//			top: '-2000px'
//		}, baseSpeed * rightRatio, 'linear', function(){
//			image.remove();
//		});
//
//
//	}, imageInterval * rightRatio);
//
//	setInterval(function(){
//		var scrollbar = $('<img src="img/scrollbar.png">');
//		$('body').append(scrollbar);
//		scrollbar.attr('style', 'position: fixed; right: 10vw; top: 2000px; z-index: -1; transform: scaleX(-1); filter: FlipH;');
//		scrollbar.velocity({
//			top: '-2000px'
//		}, baseSpeed * rightRatio, 'linear', function(){
//			scrollbar.remove();
//		});
//	}, scrollBarInterval * rightRatio);

});
