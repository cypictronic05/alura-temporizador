const html = document.querySelector("html")
const botonEnfoque = document.querySelector(".app__card-button--enfoque")
const botonCorto = document.querySelector(".app__card-button--corto")
const botonLargo = document.querySelector(".app__card-button--largo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sonidos/SOLTERO.mpeg')
const botonIniciarPausar = document.querySelector("#start-pause")
const textoButton = document.querySelector("#start-pause span")
const iconButton = document.querySelector(".app__card-primary-butto-icon")
const tiempoEnPantalla = document.querySelector("#timer")


const sonidoPlay = new Audio('./sonidos/play.wav')
const sonidoPause = new Audio('./sonidos/pause.mp3')
const sonidoFinal = new Audio('./sonidos/beep.mp3')

let tiempoEnSegundos = 1500;
let idIntervalo = null

musica.loop = true

inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused)
    {
        musica.play()
    }
    else{
        musica.pause()
    }
})

botonEnfoque.addEventListener('click',()=>{
    tiempoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonCorto.addEventListener('click',()=>{
    tiempoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonLargo.addEventListener('click',()=>{
    tiempoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})


function cambiarContexto(contexto)
{
    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagenes/${contexto}.png`)

    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¡Haz una pausa corta!<br>
                <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`;
            break;     
            
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie<br>
                <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            break;              
    
        default:
            break;
    }
}

const cuentaRegresiva = ()=>{
    tiempoEnSegundos -= 1
    console.log("temporizador: " + tiempoEnSegundos)
    mostrarTiempo()

    if(tiempoEnSegundos<=0)
    {
        sonidoFinal.play()
        reiniciar()
        return
    }
}

botonIniciarPausar.addEventListener('click',iniciarPausar)

function iniciarPausar() {
    
    if(idIntervalo)
    {
        reiniciar()
        return
    }
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar() {
    clearInterval(idIntervalo)
    idIntervalo=null
    iconButton.src = '/imagenes/play_arrow.png' 
    textoButton.textContent = 'Comenzar'
    
}

textoButton.addEventListener("click",()=>{
    textoButton.textContent = textoButton.textContent === 'Comenzar' ? 'Pausar' : 'Comenzar';
    if(textoButton.textContent === 'Comenzar')
    {
        iconButton.src = '/imagenes/play_arrow.png' 
        sonidoPlay.play()
    }
    else
    {
        iconButton.src = '/imagenes/pause.png'
        sonidoPause.play()
    }
})

function mostrarTiempo() {
    const tiempo = new Date(tiempoEnSegundos*1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()