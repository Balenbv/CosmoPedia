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




function validar() {
    var nombreValido = /^[a-zA-Z\s]+$/;
    var emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (document.getElementById("nombre").value == "" || !nombreValido.test(document.getElementById("nombre").value)) {
        document.getElementById("nombre").style = "background-color:rgb(223, 0, 1, 0.6);";
    } else {
        document.getElementById("nombre").style = "background-color: rgba(0, 0, 0, 0.5);";
    }
    if (document.getElementById("apellido").value == "" || !nombreValido.test(document.getElementById("apellido").value)) {
        document.getElementById("apellido").style = "background-color:rgb(223, 0, 1, 0.6);";
    } else {
        document.getElementById("apellido").style = "background-color: rgba(0, 0, 0, 0.5);";
    }

    if (document.getElementById("email").value == "" || !emailValido.test(document.getElementById("email").value)) {
        document.getElementById("email").style = "background-color:rgb(223, 0, 1, 0.6);";
    } else {
        document.getElementById("email").style = "background-color: rgba(0, 0, 0, 0.5);";
    }

    if(document.getElementById("genero").value == ""){
        document.getElementById("genero").style = "background-color:rgb(223, 0, 1, 0.6);";
    } else{
        document.getElementById("genero").style = "background-color: rgba(0, 0, 0, 0.5);";
    }

    if(document.getElementById("dni").value.length < 7){
        document.getElementById("dni").style = "background-color:rgb(223, 0, 1, 0.6);";
    } else{
        document.getElementById("dni").style = "background-color: rgba(0, 0, 0, 0.5);";
    }

}