let btn_consultar = document.getElementById('btn_consultar')
let resultado = document.getElementById('resultado')
let resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value

    if (!codigo) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe um código válido.</p>'
        return
    }

    resultado.innerHTML = ''
    resposta.innerHTML = 'Consultando...'

    fetch(`http://localhost:3000/produtos/${codigo}`)
    .then(res => res.json())
    .then(produto => {
        if (produto.message) {
            resposta.innerHTML = `<p style="color: red;">${produto.message}</p>`
            return
        }

        resposta.innerHTML = ''
        resultado.innerHTML = `
            <p><strong>Código:</strong> ${produto.codProduto}</p>
            <p><strong>Nome:</strong> ${produto.nome}</p>
            <p><strong>Descrição:</strong> ${produto.descricao || '-'}</p>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
            <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${produto.desconto || 0}%</p>
            <p><strong>Estoque:</strong> ${produto.qtdeEstoque}</p>
            <p><strong>Marca:</strong> ${produto.marca || '-'}</p>
        `
    })
    .catch(err => {
        console.error('Erro ao consultar produto:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao consultar o produto.</p>'
    })
})