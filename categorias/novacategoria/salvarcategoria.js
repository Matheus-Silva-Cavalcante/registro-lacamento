let categorias = localStorage.categorias ? JSON.parse(localStorage.categorias) : [
    {categoria: 'Salário', cor: '#222222', corFonte: '#ffffff'},
    {categoria: 'Super Mercado', cor: '#0e2a67', corFonte: '#ffffff'},
    {categoria: 'Despesa de Casa', cor: '#187e10', corFonte: '#ffffff'}
];

function salvarCategoria() {
    localStorage.setItem('categorias', JSON.stringify(categorias));
};
