const sectionLacamentos = document.querySelector('#lancamentos');

function montarLancamento(lancamento, index) {
    let opacity = 80;

    const categoria = categorias[lancamento.categoria]

    const htmlCategoria = categoria ? `
                <div id="lancamentoConteudoCategorias" class="lancamento-conteudo__categoria">
                    <div class="lancamento-conteudo__categorias" 
                        style="background-color: ${categoria?.cor + opacity}; color: ${categoria?.corFonte};"
                        >
                            ${categoria?.categoria || ''}
                        <div class="lancamento-conteudo__categoria__color" style="background: ${categoria?.cor};"></div>
                    </div>
                </div>` : '';

    let htmlLancamento = `
        <div id="divContainerLancamento" class="lancamento" onclick="eventoContainerLancamento(this)" data-index="${index}">
            <div class="lancamento-conteudo">
                <div class="lancamento-conteudo__icon ${lancamento.tipo == "entrada" ? "lancamento-conteudo__icon__mais" : "lancamento-conteudo__icon__menos"}">
                    <div class="${lancamento.tipo == "entrada" ? "icon-dinheiro-mais" : "icon-dinheiro-menos"} icon-dinheiro__menos__mais"></div>
                </div>
            </div>

            <div class="informacao">
                <div class="lancamento-conteudo__descricao__valor">
                    <div class="lancamento-conteudo__descricao__data">
                        <div class="lancamento-conteudo__descricao">
                            ${lancamento.descricao}
                        </div>

                        <div class="lancamento-conteudo__data">
                            ${formatarData(lancamento.data)}                            
                        </div>
                    </div>


                    <div class="lancamento-conteudo__valor">
                        <img src="img/R$.svg">
                        ${lancamento.valor}
                    </div>                    
                </div>

                ${htmlCategoria}
            </div>
        </div>

        <div id='divContainerButton' class="lancamento-conteudo__bnt" style="display: none;">
            <button class="btn-opcao-lancamento btn-editar" onclick="eventoEditarLancamento()" data-index="${index}">
                <div class="icon-editor"></div>
            </button>

            <button class="btn-opcao-lancamento btn-lixeira" onclick="eventoExcluirLancamento(this)" data-index="${index}">
                <div class="icon-white"></div>
            </button>
        </div>`;


        let divLancamento = document.createElement('div');
        divLancamento.classList.add('divlancamento');
        
        divLancamento.innerHTML = htmlLancamento;

        return divLancamento;
};

lancamentos.forEach((lancamento, index) => {
    if(!lancamento) return;

    sectionLacamentos.prepend(montarLancamento(lancamento, index));
});

function buscarLancamento(buscarLacamento) {
    //debugger
    document.querySelectorAll('.divlancamento').forEach(elemento => {
        //debugger
        const lancamento = elemento.innerHTML.toLowerCase();

        if (lancamento.indexOf(buscarLacamento.toLowerCase()) > -1) {
            elemento.style.display = '';
        } else {
            elemento.style.display = 'none';
        };
    });
};

btnBuscarLancamento.addEventListener('click', () => {
    buscarLancamento(campoBusca.value);
});

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarLancamento(campoBusca.value);
    };
});

function eventoContainerLancamento(element){     
    let botoesControle = element.parentElement.getElementsByClassName('lancamento-conteudo__bnt')[0];
    
    const lancamentoSelecionado = element.classList.contains('lancamento-ativo');
    const lancamentoAtivo = document.querySelectorAll('.lancamento-ativo');

    if(lancamentoSelecionado){
        element.classList.remove('lancamento-ativo');
        botoesControle.style.display = 'none';

    } else {
        if (lancamentoAtivo.length) {
            lancamentoAtivo.forEach(function(item){
                item.classList.remove('lancamento-ativo')
                 item.parentElement.getElementsByClassName('lancamento-conteudo__bnt')[0].style.display = 'none';
            });

            element.classList.add('lancamento-ativo');
            botoesControle.style.display = '';

        } else {
            element.classList.add('lancamento-ativo');
            botoesControle.style.display = '';
        };    
    };
};

function eventoExcluirLancamento(elemento){
    //console.log(elemento.getAttribute('data-index'));
    //elemento.getAttribute('data-index');

    const lancamentoSelecionado = '.lancamento-ativo';
    
    document.querySelectorAll(lancamentoSelecionado).forEach(excluirLancamento => {
        //let botoesControle = document.querySelector('.lancamento-conteudo__bnt');       

        let botoesControle = excluirLancamento.parentElement.getElementsByClassName('lancamento-conteudo__bnt')[0];

        const indiceLancamento = excluirLancamento.getAttribute('data-index');

        let confirmaRemocao = confirm('Deseja excluir esse Laçamento ?')

        if (confirmaRemocao) {            
            delete lancamentos[indiceLancamento];
    
            salvarLacamento();
            excluirLancamento.remove();
            botoesControle.style.display = 'none';
        }
    });

    exibirSaldo()
};

function eventoEditarLancamento() {
    const lancamentoAtivo = document.querySelector('.lancamento-ativo');
    console.log(lancamentoAtivo);

    if (lancamentoAtivo) {
        const indexLancamento = lancamentoAtivo.getAttribute('data-index');
        console.log(indexLancamento);

        localStorage.setItem('lancamentoEditarIndex', indexLancamento);

        window.location.href = "/novolancamento/novolancamento.html";
    }
};

function formatarData(data) {
    const objData = new Date(data);
    return objData.toLocaleDateString('pt-BR', {timeZone: 'UTC'});      
};

function calcularSaldo() {
    let saldoTotal = 0;

    lancamentos.forEach((lancamento) => {
        if (lancamento) {
            const valor = parseFloat(lancamento.valor);
            console.log(valor);

            if (lancamento.tipo === 'entrada') {
                saldoTotal += valor;
            } else if (lancamento.tipo === 'saida') {
                saldoTotal -= valor;
            };
        };
    });

    return saldoTotal;
};

function exibirSaldo() {
    const saldo = calcularSaldo();
    const saldoElemento = document.querySelector('#valorTotal');
    saldoElemento.textContent = `R$ ${saldo.toFixed(2)}`;
}

exibirSaldo();
