var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubePlayerAPIReady() {
	player = new YT.Player('boot-video', {
		height: '100%',
		width: '100%',
		videoId: 'xHAzhkIt0z4',
		playerVars: {
			rel: 0,
			autoplay: 1,
			showinfo: 0,
			iv_load_policy: 3,
			controls: 0,
			modestbranding: 1,
			enablejsapi: 1
		},
		events: {
			'onReady': onPlayerReady,
		}
	});
}

function onPlayerReady(event) {
	event.target.mute();
}
