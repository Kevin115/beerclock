// YouTube iFrame api

// create script element and
var tag = document.createElement('script');

// creates src attr
tag.src = "https://www.youtube.com/iframe_api";

// insert script tag before first script element
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

module.exports = {
    // fires once iframe api is loaded
    onIFrameReady: function onYouTubeIframeAPIReady() {
        console.log('ready');
    }
};
