(function audio(){

var reproduce = false;
var reproduccion = document.getElementById("player");
var play = document.getElementById("btn-play");
var segs = 20;

play.onclick = function() { 

    reproduce = reproduce ? false : true;
    revisaPlay();

};

revisaPlay = function(){

    if(reproduce){
        reproduccion.play();
        $(play).attr("class", "fas fa-pause-circle");
    } 
    if(!reproduce) {
        reproduccion.stop();
        $(play).attr("class", "fas fa-play-circle");
    }
};

reproduccion.addEventListener('progress', function() {
    if (segs > 0) {
      for (var i = 0; i < reproduccion.buffered.length; i++) {
            if (reproduccion.buffered.start(reproduccion.buffered.length - 1 - i) < reproduccion.currentTime) {
                document.getElementById("objAudio").style.width = (reproduccion.buffered.end(reproduccion.buffered.length - 1 - i) / duration) * 100 + "%";
                break;
            }
        }
    }
  });

reproduccion.addEventListener('timeupdate', function() {

    var tiempo = reproduccion.currentTime;
    reproduccion.setAttribute('data-time', segs);
    
    if (tiempo > 0) {
        document.getElementById('progreso').style.width = ((reproduccion.currentTime / segs )*100) + "%";
    }

    if (tiempo >= segs - 2) {
        Fade();
    }

    if (tiempo >= segs ) {
        console.log(reproduccion.currentTime);
        reproduccion.pause();
        
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
            $(play).attr("class", "fas fa-play-circle");
        }
    }, 200);

}

function stop(){

}

})();

