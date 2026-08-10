let corpo_tabela = document.getElementById('corpo_tabela')
let resposta = document.getElementById('resposta')

fetch('http://localhost:3000/produtos')
.then(res => res.json())
.then(produtos => {
    if (produtos.length === 0) {
        resposta.innerHTML = 'Nenhum produto cadastrado ainda.'
        return
    }

    corpo_tabela.innerHTML = ''
    for (let i = 0; i < produtos.length; i++) {
        const p = produtos[i]
        corpo_tabela.innerHTML += `
            <tr>
                <td>${p.codProduto}</td>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                <td>${p.qtdeEstoque}</td>
                <td>${p.marca || '-'}</td>
            </tr>
        `
    }
})
.catch(err => {
    console.error('Erro ao listar produtos:', err)
    resposta.innerHTML = '<p style="color: red;">Erro ao carregar a lista de produtos.</p>'
})