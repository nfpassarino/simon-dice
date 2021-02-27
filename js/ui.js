import { jugarUsuario } from './index.js';

export function actualizarVisor(msj) {
    const $visor = document.querySelector('#visor');
    $visor.value = msj;
    if (msj === 'Turno del Jugador') {
        $visor.className = 'input jugador';
    } else if (msj === 'Turno de la Computadora') {
        $visor.className = 'input computadora';
    } else {
        $visor.className = 'input otromsj';
    }
}

export function actualizarRonda(nro) {
    document.querySelector('#ronda').value = nro;
}

export function prenderPad(pad) {
    pad.style.opacity = 1;
    setTimeout(() => {
        pad.style.opacity = 0.5;
    }, 400);
}

export function bloquearEmpezar() {
    document.querySelector('#btn-empezar').disabled = true;
}

export function desbloquearEmpezar() {
    document.querySelector('#btn-empezar').disabled = false;
}

export function bloquearUsuario() {
    document.querySelectorAll('.pad').forEach(function(pad) {
        pad.style.cursor = 'default';
        pad.onclick = function() {};
    });
}

export function desbloquearUsuario() {
    document.querySelectorAll('.pad').forEach(function(pad) {
        pad.style.cursor = 'pointer';
        pad.onclick = jugarUsuario;
    });
}