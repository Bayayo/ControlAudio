(function audio(){

var reproduccion = document.getElementById("player");
var segs = 5;

reproduccion.addEventListener('timeupdate', function() {
    var tiempo = reproduccion.currentTime;
    reproduccion.setAttribute('data-time', segs);
    

    if (tiempo > segs -2) {
        Fade();
    }

    if (tiempo > segs ) {
        reproduccion.pause();
        console.log(reproduccion.currentTime);
    }

});

function Fade () {

    console.log('ok');
    var fadePoint = reproduccion.duration - 2; 

    var fadeAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((reproduccion.currentTime >= fadePoint) && (reproduccion.volume != 0.0)) {
            reproduccion.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (reproduccion.volume === 0.0) {
            clearInterval(fadeAudio);
        }
    }, 20);

}

})();

