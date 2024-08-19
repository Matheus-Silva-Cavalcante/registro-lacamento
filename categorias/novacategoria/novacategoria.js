const btnSalvarNovaCategoria = document.querySelector('.btn-salvar-categoria');

function gerarCategoria() {
    //debugger
    const categoria = {
        categoria:  textoCategoria.value,
        cor: corCategoria.value,
        corFonte: definirCor(corCategoria.value)
    };

    let campoVazio = false

    if (categoria.categoria.length === 0) {
        inputCategoriaVasio.style.display = '';
        textoCategoria.classList.add('erro');
        campoVazio = true
    } else {
        inputCategoriaVasio.style.display = 'none';
        textoCategoria.classList.remove('erro');
    }

    if(campoVazio) return;

    const indexCategoriaEditar = localStorage.getItem('categoriaEditarIndex');

    if (indexCategoriaEditar !== null) {
        categorias[indexCategoriaEditar] = categoria;
        localStorage.removeItem('categoriaEditarIndex');
    } else {
        categorias.push(categoria);
    }

    salvarCategoria();   
    history.back(); 
}

btnSalvarNovaCategoria?.addEventListener('click', () => {
    gerarCategoria();
});

document.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        gerarCategoria();
    };
});

function definirCor(background){
    var hex = background;
    var r, g, b, lum;

    hex = hex.replace('#', '');

    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);

    lum = (r * 299 + g * 587 + b * 114) / 1000;

    if (lum > (255 / 2)) {
        return '#000000'
    } else {
        return '#ffffff'
    };
};

document.addEventListener('DOMContentLoaded', function () {
    const indexCategoria = localStorage.getItem('categoriaEditarIndex');
    
    if (indexCategoria !== null) {
        const categoria = categorias[indexCategoria];

        document.querySelector('#textoCategoria').value = categoria.categoria;

        document.querySelector('#corCategoria').value = categoria.cor;
    }
});

function btnCancelarAcaoNovaCategoria() {
    const indexCategoria = localStorage.getItem('categoriaEditarIndex');
    location.href = "/categorias/categorias.html";

    if (indexCategoria) {
        localStorage.removeItem('categoriaEditarIndex');
    };
};