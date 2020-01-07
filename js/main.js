(function reproductor(){

var segs = 5;

var reproduce = false;
var musica = document.getElementById("player");
var play = document.getElementById("btn-play");
var stop = document.getElementById("btn-stop");


play.onclick = function() { 

    if(!reproduce){
        musica.play();
        reproduce = reproduce ? false : true;
        $(play).attr("class", "fas fa-pause-circle");
        console.log(reproduce);
    } 
    else if(reproduce) {
        musica.pause();
        reproduce = reproduce ? false : true;
        $(play).attr("class", "fas fa-play-circle");
        console.log(reproduce);
    }

};

stop.onclick = function(){

    reproduce = false;

    $(play).attr("class", "fas fa-play-circle");
    document.getElementById("progreso").style.width = 0;
    musica.volume =  1;
    musica.pause();
    musica.currentTime = 0;

};



musica.addEventListener('progress', function() {
    if (segs > 0) {
      for (var i = 0; i < musica.buffered.length; i++) {
            if (musica.buffered.start(musica.buffered.length - 1 - i) < musica.currentTime) {
                document.getElementById("objAudio").style.width = (musica.buffered.end(musica.buffered.length - 1 - i) / duration) * 100 + "%";
                break;
            }
        }
    }
});

musica.addEventListener('timeupdate', function() {

    var tiempo = musica.currentTime;

    function formatTime(tiempo) {
        minutes = Math.floor(tiempo / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        tiempo = Math.floor(tiempo % 60);
        tiempo = (tiempo >= 10) ? tiempo : "0" + tiempo;
        return minutes + ":" + tiempo;
    }
    cancion.innerHTML = $("#nombre").attr('src').replace("./audio/",'').slice(0,-4);
    transcurrido.innerHTML = formatTime(tiempo);
    duracion.innerHTML = formatTime(segs);
    musica.setAttribute('data-time', segs);

    if (tiempo > 0) {
        document.getElementById('progreso').style.width = ((musica.currentTime / segs )*100) + "%";
    }

    if (tiempo >= segs - 2) {
        Fade();
    } 
    if (tiempo > segs ) {
        reproduce = false;
        musica.pause();
        musica.volume =  1;
        musica.currentTime = 0;
        document.getElementById("progreso").style.width = 0;

        $(play).attr("class", "fas fa-play-circle");
        
    }

});

function Fade () {

    var fadePoint = segs - 2.5; 

    var fadeAudio = setInterval(function () {
        if ((musica.currentTime >= fadePoint) && (musica.volume != 0.1)) {
            musica.volume -= 0.1;
            clearInterval(fadeAudio);
        }
        else if(musica.volume === 0.1) {
            clearInterval(fadeAudio);
        }
    }, 200);
}


})();

