$State = {
    isText: false,
    wordTime: 750, // Time to display a word
    wordAnim: 150, // Time to animate a word
    randomInterval: 18000,
    lastRandomIndex: -1,
    randomTimer: null,
    lastMouseUp: -1
};

// From Stack Overflow
// http://stackoverflow.com/questions/1582534/calculating-text-width-with-jquery
$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};

// http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function processMessageFromHash()
{
    var message = decodeURIComponent(window.location.hash.slice(1));
    if (message)
    {
        setTimeout(function(){executeSamaritan(message);}, $State.wordTime);
    }
}

$(document).ready(function(){
    // Cache the jquery things
    $State.triangle = $('#triangle');
    $State.text  = $('#main p');
    $State.line = $('#main hr');

    // Start the triangle blinking
    blinkTriangle();

    // URL parameter message
    var urlMsg = getUrlParameter('msg');
    if (urlMsg !== undefined)
    {
        urlMsg = urlMsg.split('%20').join(' ').split('%22').join('').split('%27').join("'");
        $State.phraselist = [urlMsg];
        setTimeout(function(){executeSamaritan(urlMsg);}, $State.wordTime);
    }
    else
    {
      // Message from URL fragment
      processMessageFromHash();
    }

    // Show a new message whenever the URL fragment changes
    $(window).on('hashchange', processMessageFromHash);

    // Store the phrase list in the state
    if ($State.phraselist !== undefined)
      phraselist = phraselist.concat($State.phraselist);
    $State.phraselist = phraselist;

    $(document).bind("mouseup", function(){
        if ((Date.now() - $State.lastMouseUp) <= 500)
        {
            console.log("DblClick");
            if (screenfull.enabled) {
                screenfull.toggle();
            }
        }
        $State.lastMouseUp = Date.now();
    }).bind("click", runRandomPhrase);

    // And do a timed random phrase
    randomTimePhrase();
})

var blinkTriangle = function()
{
    // Stop blinking if samaritan is in action
    if ($State.isText){
        $State.line.css("opacity","1");
        return;
      }
    //$State.line.fadeTo(500, 0).fadeTo(500, 1, blinkTriangle);
    x=Math.floor((Date.now()/500)%2)+0.5;
    //console.log(x);
    //console.log("hello world");
    $State.line.css("opacity",x.toString());
    window.requestAnimationFrame(blinkTriangle);
}

var runRandomPhrase = function()
{
    // Get a random phrase and execute samaritan
    var randomIndex = 0;
    if($State.phraselist.length > 1){
        if(getUrlParameter('random') == 'false'){ //if random parameter is set to false
            if($State.lastRandomIndex+1 != $State.phraselist.length){ //if it's not the last one
                randomIndex = $State.lastRandomIndex+1;
            }
        } else {
            randomIndex = Math.floor(Math.random() * ($State.phraselist.length - 0));
            while (randomIndex == $State.lastRandomIndex)
                randomIndex = Math.floor(Math.random() * ($State.phraselist.length - 0));
        }
    }
    $State.lastRandomIndex = randomIndex;
    executeSamaritan($State.phraselist[randomIndex]);
}

var randomTimePhrase = function()
{
    if ($State.randomTimer !== null)
        clearTimeout($State.randomTimer);
    var randomTime = Math.floor(Math.random() * (3000 - 0));
    randomTime += $State.randomInterval;
    $State.randomTimer = setTimeout( runRandomPhrase, randomTime);
}

var executeSamaritan = function(phrase)
{
    if ($State.isText)
        return;

    $State.isText = true
    var phraseArray = phrase.split(" ");
    // First, finish() the blink animation and
    // scale down the marker triangle
    $State.triangle.finish().animate({
        'font-size': '0em',
        'opacity': '1'
    }, {
        'duration': $State.wordAnim,
        // Once animation triangle scale down is complete...
        'done': function() {
            var timeStart = 0;
            // Create timers for each word
            phraseArray.forEach(function (word, i) {
                var wordTime = $State.wordTime;
                if (word.length > 8)
                    wordTime *= (word.length / 8);
                setTimeout(function(){
                    // Set the text to black, and put in the word
                    // so that the length can be measured
                    $State.text.addClass('hidden').html(word);
                    // Then animate the line with extra padding
                    $State.line.animate({
                        'width' : ($State.text.textWidth() + 18) + "px"
                    }, {
                        'duration': $State.wordAnim,
                        // When line starts anmating, set text to white again
                        'start': $State.text.removeClass('hidden')
                    })
                }, (timeStart + $State.wordAnim));
                timeStart += wordTime;
            });

            // Set a final timer to hide text and show triangle
            setTimeout(function(){
                // Clear the text
                $State.text.html("");
                // Animate trinagle back in
                $State.triangle.finish().animate({
                    'font-size': '2em',
                    'opacity': '1'
                }, {
                    'duration': $State.wordAnim,
                    // Once complete, blink the triangle again and animate the line to original size
                    'done': function(){
                        $State.isText = false;
                        randomTimePhrase();

                        blinkTriangle();
                        $State.line.animate({
                            'width' : "30px"
                        }, {
                            'duration': $State.wordAnim,
                            'start': $State.text.removeClass('hidden')
                        })
                    }
                });
            },
            timeStart + $State.wordTime);
        }
    });
}
