let intervalId;
let tiempoRestante = 0
let tiempoInicial = 0
let tiempoDeFinalizacion = 0;

function actualizarTemporizador () {
    const tiempoActual = Date.now()
     tiempoRestante = Math.floor((tiempoDeFinalizacion - tiempoActual) / 1000)

    if(tiempoRestante <= 0){
        clearInterval(intervalId)
        tiempoRestante = 0;
    }

    const days = Math.floor(tiempoRestante/ 86400)
    const hours = Math.floor((tiempoRestante % 86400) / 3600)
    const minutes = Math.floor((tiempoRestante % 3600) / 60)
    const seconds = tiempoRestante % 60 

    document.getElementById("dias").textContent = padNumber (days)
    document.getElementById("horas").textContent = padNumber (hours)
    document.getElementById("minutos").textContent = padNumber (minutes)
    document.getElementById("segundos").textContent = padNumber (seconds)
}

function startTimer () {
    const inputTiempo = document.getElementById("tiempo")
    tiempoInicial = parseInt(inputTiempo.value)

    if(isNaN (tiempoInicial) || tiempoInicial <= 0) {
        alert("Por favor, ingresa un tiempo válido en segundos")
        return;
     }

    clearInterval(intervalId)
    
    const horaDeInicio = Date.now();
    tiempoDeFinalizacion = horaDeInicio + tiempoInicial * 1000
    
    intervalId = setInterval(actualizarTemporizador, 1000)
    
    actualizarTemporizador()

}

function padNumber (number) {
    return number.toString().padStart(2, "0")
}

document.getElementById("stop").addEventListener("click", function () {
    clearInterval(intervalId)
})

document.getElementById("continue").addEventListener("click", function () {
    if(tiempoRestante > 0){
        const horaDeInicio = Date.now();
         tiempoDeFinalizacion = horaDeInicio + tiempoRestante * 1000;
        clearInterval(intervalId)
        intervalId = setInterval(actualizarTemporizador, 1000)
    }
        else{
            startTimer()
    }
} )
    