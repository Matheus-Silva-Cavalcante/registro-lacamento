const areaConteudoCategoria = document.querySelector('.area-conteudo');

// function exibiCategorias(categoria) {
//     const divCategorias = document.createElement('div');
//     divCategorias.classList.add('area-conteudo__categoria');
//     divCategorias.style.background = categoria.cor;
//     divCategorias.style.color = categoria.corFonte;
//     divCategorias.innerHTML = `
//         <div class="categoria">
//             ${categoria.categoria}
            
//             <div class="categoria__color"></div>
//         </div>

//         <div class="categoria-editar__excluir">
//             <button class="categoria-editar btn-editar__excluir">
//                 <div class="icon-editor"></div>
//             </button>

//             <button class="categoria-excluir btn-editar__excluir">
//                 <div class="icon-white"></div>
//             </button>
//         </div>
//     `

//     return divCategorias;
// };

function exibiCategoria(categoria, index) {
    let opacity = 80; // hex

    let htmlCategoria = `
    <div class="categoria" style="background-color: ${categoria?.cor + opacity}; color: ${categoria?.corFonte};" data-index="${index}" onclick="eventoContainerCategoria(this)">
        <span class="nome-categoria">${categoria?.categoria}</span>
        
        <div class="categoria__color" style="background-color: ${categoria?.cor};"></div>
    </div>

    <div class="categoria-editar__excluir" style="display: none;">
        <button class="categoria-editar btn-editar__excluir" data-index="${index}" onclick="eventoEditarCategoria()">
            <div class="icon-editor"></div>
        </button>

        <button class="categoria-excluir btn-editar__excluir" data-index="${index}" onclick="eventoExcluirCategoria()">
            <div class="icon-white"></div>
        </button>
    </div>
    `;

    

    // const divAreaCategorias = document.createElement('div');
    // divAreaCategorias.setAttribute('data-index', index)
    // divAreaCategorias.classList.add('area-conteudo__categoria');
    
    // const divCategoria = document.createElement('div');
    // divCategoria.classList.add('categoria');
    // divCategoria.style.background = (categoria.cor + opacity);
    // divCategoria.style.color = categoria.corFonte;
    
    // divCategoria.innerHTML = `
    //     ${categoria.categoria}                
    // `    
    
    // const divCategoriaCor = document.createElement('div');
    // divCategoriaCor.classList.add('categoria__color');

    // divCategoria.append(divCategoriaCor);
    
    // divCategoriaCor.style.background = categoria.cor;
    // divCategoriaCor.style.color = categoria.corFonte;    
    
    // const divContainerButton = document.createElement('div');
    // divContainerButton.classList.add('categoria-editar__excluir');
    // divContainerButton.style.display = 'none';
    
    // divContainerButton.innerHTML = `
    //     <button class="categoria-editar btn-editar__excluir">
    //         <div class="icon-editor"></div>
    //     </button>
        
    //     <button id="btnExcluirCategoria" class="categoria-excluir btn-editar__excluir" onclick="eventoExcluirCategoria(this)">
    //         <div class="icon-white"></div>
    //     </button>
    // `;

    // divAreaCategorias.innerHTML =`
    //     <div class="categoria-editar__excluir" style="display: none;">
    //         <button class="categoria-editar btn-editar__excluir">
    //             <div class="icon-editor"></div>
    //         </button>
            
    //         <button id="btnExcluirCategoria" class="categoria-excluir btn-editar__excluir">
    //             <div class="icon-white"></div>
    //         </button>
    //     </div>
    // `;

    // divAreaCategorias.prepend(divCategoria);
    // divAreaCategorias.append(divContainerButton);

    // divCategoria.onclick = () => {
    //     const contemClass = divCategoria.classList.contains('categoria-ativo');
    //     const categoriaAtiva = document.querySelectorAll('.categoria-ativo');

    //     categoriaAtiva.forEach(elemento => {
    //         elemento.classList.remove('categoria-ativo');
    //         elemento.nextElementSibling.style.display = 'none'
    //     });
        
    //     if (contemClass) {
    //         divContainerButton.style.display = 'none';
    //         divCategoria.classList.remove('categoria-ativo');
    //     } else {
    //         divCategoria.classList.add('categoria-ativo');
    //         divContainerButton.style.display = '';
    //     }
    //     //debugger
    //     // const contemClass = divCategoria.classList.contains('categoria-ativo');
    //     // const categoriaAtiva = document.querySelectorAll('.categoria-ativo');

    //     // categoriaAtiva.forEach(elemento => {
    //     //     elemento.classList.remove('categoria-ativo');
    //     // });
        
    //     // if (contemClass) {
    //     //     //debugger
    //     //     divContainerButton.style.display = 'none';
    //     //     return
    //     // }

    //     // divCategoria.classList.add('categoria-ativo');

    //     // divContainerButton.style.display = '';
    // } 

    // const btnExcluirCategoria = divContainerButton.querySelector('#btnExcluirCategoria');

    // btnExcluirCategoria.onclick = () => {
    //     //divAreaCategorias.remove();
    // };

    //return divAreaCategorias;

    let divAreaCategorias = document.createElement('div');
    divAreaCategorias.classList.add('area-conteudo__categoria');

    divAreaCategorias.innerHTML = htmlCategoria;

    return divAreaCategorias;

};

categorias.forEach((categoria, index) => {
    if (!categoria) return

    areaConteudoCategoria.prepend(exibiCategoria(categoria, index));
});

function eventoContainerCategoria(elemento) {
    let btnCategoriaControles = elemento.parentElement.getElementsByClassName('categoria-editar__excluir')[0];

    const categoriaSelecionada = elemento.classList.contains('categoria-ativo');
    const categoriaAtiva = document.querySelectorAll('.categoria-ativo');

    if(categoriaSelecionada){
        elemento.classList.remove('categoria-ativo');
        btnCategoriaControles.style.display = 'none';

    } else {
        if (categoriaAtiva.length) {
            categoriaAtiva.forEach(function(item){
                item.classList.remove('categoria-ativo')
                 item.parentElement.getElementsByClassName('categoria-editar__excluir')[0].style.display = 'none';
            });

            elemento.classList.add('categoria-ativo');
            btnCategoriaControles.style.display = '';

        } else {
            elemento.classList.add('categoria-ativo');
            btnCategoriaControles.style.display = '';
        };    
    };
};

function eventoExcluirCategoria() {
    const categoriaSelecionada = '.categoria-ativo';
    
    document.querySelectorAll(categoriaSelecionada).forEach(excluirCategoria => {
        //debugger
        let btnCategoriaControles = excluirCategoria.parentElement.getElementsByClassName('categoria-editar__excluir')[0];
        
        let indexCategoria = excluirCategoria.getAttribute('data-index');

        const confirmaRemocao = confirm('Deseja excluir essa categoria ?');

        if (confirmaRemocao) {            
            delete categorias[indexCategoria];
    
            salvarCategoria();

            excluirCategoria.remove();
            btnCategoriaControles.style.display = 'none';
        };
    });
};

function eventoEditarCategoria() {
    const categoriaAtiva = document.querySelector('.categoria-ativo');
    
    if (categoriaAtiva) {
        const indexCategoria = categoriaAtiva.getAttribute('data-index');
        
        localStorage.setItem('categoriaEditarIndex', indexCategoria);
        
        location.href = "/categorias/novacategoria/novacategoria.html";
    }
}
