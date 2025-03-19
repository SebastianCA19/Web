var randomNumber = 0;
var maxAttempts = 10;
var attempts = 0;
var damageSound = new Audio("./resources/sounds/damage.mp3");
var winSound = new Audio("./resources/sounds/victory.wav");

//Evento para cargar el contenido de la página
document.addEventListener("DOMContentLoaded", function(){
    createRandomNumber();
    renderHealthBar();
    console.log(randomNumber);
} );

//Función para renderizar la barra de vida
function renderHealthBar() {
    let healthBar = document.getElementById("health-bar");
    healthBar.innerHTML = "";

    for (let i = 0; i < maxAttempts; i++) {
        let heart = document.createElement("img");
        heart.src = "./resources/img/Heart.webp";
        heart.alt = "heart";
        heart.width = 30;
        heart.height = 30;
        heart.classList.add("heart"); 
        healthBar.appendChild(heart);
    }
}

//Función para crear un número aleatorio
function createRandomNumber(){
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

//Función para comprobar el número
function checkNumber(){
    if(document.getElementById("btn").innerHTML == "Reset"){
        location.reload();
        return;
    }

    var inputNumber = document.getElementById("number").value;
    var comment = document.getElementById("comment");

    if(inputNumber != "" && !isNaN(parseInt(inputNumber))){
        
        attempts++;
        
        if(inputNumber > randomNumber){
            comment.innerHTML = "El número es menor que "+ inputNumber;
            removeHeart();
            shakeMain();
            playDamageSound();
        }else if(inputNumber < randomNumber){
            comment.innerHTML = "El número es mayor que " + inputNumber;
            removeHeart();
            shakeMain();
            playDamageSound();
        }else{
            comment.innerHTML = "🎉 ¡FELICIDADES, HAS GANADO! 🎉";
            changeButton();
            playWinSound();
            return;
        }

        if(attempts == maxAttempts){
            comment.innerHTML = "Has perdido, el número era: " + randomNumber;
            changeButton();
            playDamageSound();
            return;
        }
    }else{
        comment.innerHTML = "Digita un número"
    }
}

//Función para cambiar el botón a reset
function changeButton(){
    var button = document.getElementById("btn");
    button.innerHTML = "Reset";
}


//Funciones para añadir animaciones
function removeHeart() {
    let hearts = document.querySelectorAll(".heart"); 
    if (hearts.length > 0) {
        let lastHeart = hearts[hearts.length - 1];

        lastHeart.classList.add("fade-out");
        
        setTimeout(() => {
            lastHeart.remove();
        }, 500);
    }
}

function shakeMain() {
    let mainDiv = document.querySelector(".main");

    mainDiv.classList.add("shake");

    setTimeout(() => {
        mainDiv.classList.remove("shake");
    }, 300); 
}

//Funciones para reproducir sonidos
function playDamageSound(){
    damageSound.play();
}

function playWinSound(){
    winSound.play();
}