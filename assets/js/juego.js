/**
 * 2C = 2 de Clubs (2 de trébol)
 * 2D = 2 de Diamonds
 * 2H = 2 de Hearts
 * 2S = 2 de Spades
 */

/**
 * let deck = [];

const crearDeck = () => {

    //Los palos de los naipes
    const palos = ['C', 'D', 'H', 'S'];

    // Itera las 12 cartas que hay en los naipes * los 4 tipos de palos
    for (let i = 1; i <= 12; i++) {

        //Los tipos de figuras
        const figura = (i == 1)  ? 'A' :
                        (i == 10) ? 'J' :
                        (i == 11) ? 'Q' :
                        (i == 12) ? 'K' : i ;

        //Union de la figura con el palo
        for (let palo of palos) {
            deck.push(`${figura}${palo}`);
        }
    }

};

crearDeck();
console.log(deck);
 */



// PATRÓN MODULO

//Funcion anonima
const miModulo = (()=> {
    //Evalúe el codigo de forma estricta
    'use strict';

    
    let deck = [];
    const   tipos = ['C','H','S','D'],
            especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosCompu = 0;
    let puntosJugadores = [];

    //Referencias del HTML
    const   btnPedirCarta = document.querySelector('#btnPedirCarta'),
            btnNuevoJuego = document.querySelector('#btnNuevoJuego'),
            btnDetener = document.querySelector('#btnDetener');


    const   puntaje = document.querySelectorAll('small'),
            divCartasJugadores = document.querySelectorAll('.divCartas');


    const iniciarJuego = (numJugadores = 2)=>{
        deck = crearDeck();
        puntosJugadores=[]; 
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        //Borro los puntajes
        puntaje.forEach( element => {
            element.innerText=0
        });

        divCartasJugadores.forEach( element => {
            element.innerHTML = '';
        })

        btnDetener.disabled = false;
        btnPedirCarta.disabled = false;
    }
    
    //Funcion crear una nueva baraja
    const crearDeck = ()=>{

        deck= [];
        for(let i=2; i<=10; i++){
            for (let tipo of tipos){
                deck.push(i+tipo);
            }
        }

        for (let tipo of tipos){
            for (const especial of especiales) {
                deck.push(especial+tipo);
            }
        }

        return _.shuffle(deck);
    }
    

    //Esta funcion me permite tomar una carta
    const pedirCarta = ()=>{

        if (deck.length ===0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta)=>{
        const valor = carta.substring(0, carta.length-1);

        return  (isNaN(valor))? 
                (valor === 'A') ? 11 : 10
                :(valor *1);

    }


    //Acumular Puntos Jugador, TURNO: el ultimo es de la CPU
    const acumuladorPuntos = (carta,turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntaje[turno].innerHTML = puntosJugadores[turno];

        return puntosJugadores[turno];
    };

    const crearCarta = (carta,turno)=>{
        const imgCarta = document.createElement('img');
        imgCarta.src =`assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divCartasJugadores[turno].append(imgCarta);

    }

    const ganador = ()=>{

        const [puntosMinimos,puntosCompu] = puntosJugadores;

        setTimeout(() => {
            if ((puntosMinimos>21)) {
                alert('Computadora gana');
            }else if(puntosCompu===puntosMinimos){
                alert('Ninguno gana');
            }else if(puntosCompu>21){
                alert('Jugador ganó');
            }else{
                alert('Computadora gana')
            }
        }, 15);
    }

    //Turno de Computadora
    const turnoCompu = (puntosMinimos)=>{
        
        let puntosCompu = 0;

        do {

            const carta = pedirCarta();
            console.log(carta);
            
            puntosCompu = acumuladorPuntos(carta,puntosJugadores.length-1);

            crearCarta(carta,puntosJugadores.length-1);

        } while ((puntosCompu<puntosMinimos)&&(puntosMinimos<=21));

        ganador();
    }



    //EVENTOS

    btnPedirCarta.addEventListener('click',()=>{
        const carta = pedirCarta();
        // console.log(carta);
        
        const puntosJugador= acumuladorPuntos(carta,0);

        crearCarta(carta,0);

        if (puntosJugador >21) {
            
            console.warn('Perdiste pa');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;

            turnoCompu(puntosJugador);

        }else if (puntosJugador === 21) {
            console.log('21, genial!');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;

            turnoCompu(puntosJugador);
        }

    });

    btnDetener.addEventListener('click',()=>{
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click',()=>{
        console.clear();

        iniciarJuego();

    })


    return {
        nuevoJuego : iniciarJuego
    }

})();







