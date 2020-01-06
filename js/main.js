(function audio(){

var reproduccion = document.getElementById("player");
var segs = 5;

reproduccion.buffered.end(segs);

reproduccion.addEventListener('progress', function() {
    if (segs > 0) {
      for (var i = 0; i < reproduccion.buffered.length; i++) {
            if (reproduccion.buffered.start(reproduccion.buffered.length - 1 - i) < reproduccion.currentTime) {
                document.getElementById("buffered-amount").style.width = (reproduccion.buffered.end(reproduccion.buffered.length - 1 - i) / duration) * 100 + "%";
                break;
            }
        }
    }
  });

reproduccion.addEventListener('timeupdate', function() {

    var tiempo = reproduccion.currentTime;
    reproduccion.setAttribute('data-time', segs);
    
    if (tiempo > 0) {
        document.getElementById('progress-amount').style.width = ((reproduccion.currentTime / segs )*100) + "%";
    }

    if (tiempo > segs -2) {
        Fade();
    }

    if (tiempo > segs ) {
        reproduccion.pause();
        console.log(reproduccion.currentTime);
    }

});

function Fade () {

    var fadePoint = segs - 2; 

    var fadeAudio = setInterval(function () {
        if ((reproduccion.currentTime >= fadePoint) && (reproduccion.volume != 0.1)) {
            reproduccion.volume -= 0.1;
            clearInterval(fadeAudio);
        }
        if (reproduccion.volume === 0.1) {
            clearInterval(fadeAudio);
        }
    }, 200);

}

})();

