(function reproductor(){

    var track = document.getElementsByClassName("track");

    Object.entries(track).map(( object ) => {

        //console.log(object);
        //VARIABLES DE DURACION Y REPRODUCCIÓN
        var segs = 25;
        var reproduce = false;
       

        //PLAY
        object[1].children[0].onclick = function() { 

            if(!reproduce){
                object[1].children[2].play();
                reproduce = reproduce ? false : true;
                $( object[1].children[0] ).attr("class", "btn-play fas fa-pause-circle");
                //console.log(reproduce);
            } 
            else if(reproduce) {
                object[1].children[2].pause();
                reproduce = reproduce ? false : true;
                $( object[1].children[0] ).attr("class", "btn-play fas fa-play-circle");
                //console.log(reproduce);
            }
        
        };
        
        //STOP
        object[1].children[4].onclick = function(){
        
            reproduce = false;
        
            $( object[1].children[0] ).attr("class", "btn-play fas fa-play-circle");
            object[1].children[2].volume =  1;
            object[1].children[2].pause();
            object[1].children[2].currentTime = 0;
            object[1].children[5].children[0].style.width = 0;
        
        };
        
        //PROGRESO
        object[1].children[2].addEventListener('progress', function() {
            if (segs > 0) {
              for (var i = 0; i < object[1].children[2].buffered.length; i++) {
                    if (object[1].children[2].buffered.start(object[1].children[2].buffered.length - 1 - i) < object[1].children[2].currentTime) {
                        object[1].children[0].style.width = (object[1].children[2].buffered.end(object[1].children[2].buffered.length - 1 - i) / duration) * 100 + "%";
                        break;
                    }
                }
            }
        });
        
        //TIEMPO
        object[1].children[2].addEventListener('timeupdate', function() {
        
            var tiempo = object[1].children[2].currentTime;
        
            function formatTime(tiempo) {
                minutes = Math.floor(tiempo / 60);
                minutes = (minutes >= 10) ? minutes : "0" + minutes;
                tiempo = Math.floor(tiempo % 60);
                tiempo = (tiempo >= 10) ? tiempo : "0" + tiempo;
                return minutes + ":" + tiempo;
            }
            
            // DURACIÓN
            object[1].children[3].children[0].innerHTML = formatTime(tiempo);
            object[1].children[3].children[1].innerHTML = formatTime(segs);
            object[1].children[2].setAttribute('data-time', segs);
        
            if (tiempo > 0) {
                object[1].children[5].children[0].style.width = ((object[1].children[2].currentTime / segs )*100) + "%";
            }
            if (tiempo >= segs - 3) {
                Fade();
            } 
            if (tiempo > segs ) {
                reproduce = false;
                object[1].children[2].pause();
                object[1].children[2].volume =  1;
                object[1].children[2].currentTime = 0;
                object[1].children[5].children[0].style.width = 0;
                $( object[1].children[0] ).attr("class", "btn-play fas fa-play-circle");
                
            }
        
        });
        
        //FADE
        function Fade () {
        
            var fadePoint = segs - 3; 
            var fadeAudio = setInterval(function () {
                if ((object[1].children[2].currentTime >= fadePoint) && (object[1].children[2].volume != 0.1)) {
                    object[1].children[2].volume -= 0.08;
                    clearInterval(fadeAudio);
                    console.log("Tiempo: " + object[1].children[2].currentTime +  " , Volumen: " + object[1].children[2].volume + " || FADE:" + fadePoint);
                }
                else if(object[1].children[2].volume === 0.08 || object[1].children[2].volume >= 0.07) {
                    clearInterval(fadeAudio);
                }
            }, 100);
        }
        
        //ASIGNAR NOMBRE DE ARCHIVO
        (function(){
            //Nombre de las canciones 
            var m = $(object[1].children[2].children[0]).attr('src').lastIndexOf("/");
            var nArchivo = $(object[1].children[2].children[0]).attr('src').slice(m + 1,-4);
        
            object[1].children[1].innerHTML = nArchivo;
            //Reset progreso
            object[1].children[5].children[0].style.width = 0;
        })();
    });

})();

