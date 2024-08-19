// let lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
let lancamentos = localStorage.lancamentos ? JSON.parse(localStorage.lancamentos) : [];

function salvarLacamento() {
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
};