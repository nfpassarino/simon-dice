import {
    actualizarVisor,
    actualizarRonda,
    prenderPad,
    bloquearEmpezar,
    desbloquearEmpezar,
    bloquearUsuario,
    desbloquearUsuario
} from './ui.js';

let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

actualizarVisor('Apretá en empezar para Jugar!');
actualizarRonda('-');
bloquearUsuario();

document.querySelector('#btn-empezar').onclick = comenzarJuego;

function comenzarJuego() {
    reiniciarJuego();
    jugarRonda();
}

function reiniciarJuego() {
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
}

function jugarRonda() {
    const padNuevo = generarAleatorio();
    const RETRASO_JUGADOR = (secuenciaMaquina.length + 1) * 800;
    secuenciaUsuario = [];
    ronda++;
    bloquearUsuario();
    bloquearEmpezar();
    setTimeout(() => {
        actualizarRonda(ronda);
        actualizarVisor('Turno de la Computadora');
    }, 800);

    secuenciaMaquina.push(padNuevo);
    secuenciaMaquina.forEach(function(pad, i) {
        const RETRASO_MAQUINA = (i + 1) * 800;
        setTimeout(() => {
            prenderPad(pad);
        }, RETRASO_MAQUINA);
    });

    setTimeout(function() {
        setTimeout(() => {
            actualizarVisor('Turno del Jugador');
        }, 800);
        desbloquearUsuario();
    }, RETRASO_JUGADOR);
}

export function jugarUsuario(evento) {
    const padUsuario = evento.target;
    prenderPad(padUsuario);
    secuenciaUsuario.push(padUsuario);
    const padMaquina = secuenciaMaquina[(secuenciaUsuario.length - 1)];

    if (padUsuario.id !== padMaquina.id) {
        perder();
        return
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        bloquearUsuario();
        setTimeout(jugarRonda, 1000);
    }
}

function generarAleatorio() {
    const $pad = document.querySelectorAll('.pad');
    const i = Math.floor(Math.random() * $pad.length);
    return $pad[i];
}

function perder() {
    const $pads = document.querySelectorAll('.pad');
    $pads.forEach(function(pad) {
        prenderPad(pad);
    });
    bloquearUsuario();
    desbloquearEmpezar();
    actualizarVisor('Perdiste. Para volver a jugar, apretá en Empezar');
}
