function reproducirVideo(id, num) {
    var video = document.getElementById(id);
    if (num == 1) {
        video.play();
    } else {
        video.pause();
    }
}

function agujeroNegro(num) {
    reproducirVideo("videoAgujeroNegro", num);
}

function enanaBlanca(num) {
    reproducirVideo("videoEnanaBlanca", num);
}

function sol(num) {
    reproducirVideo("videoSol", num);
}

function estrellaNeutron(num) {
    reproducirVideo("videoEstrellaNeutron", num);
}

function teegardenb(num) {
    reproducirVideo("videoTeegardenb", num);
}
