let grid_cards = document.getElementById('grid_cards')
let resposta = document.getElementById('resposta')

fetch('http://localhost:3000/produtos')
.then(res => res.json())
.then(produtos => {
    if (produtos.length === 0) {
        resposta.innerHTML = 'Nenhum produto cadastrado ainda.'
        return
    }

    grid_cards.innerHTML = ''
    for (let i = 0; i < produtos.length; i++) {
        const p = produtos[i]
        const critico = p.qtdeEstoque < 10

        const imagemHtml = p.imagem
            ? `<img src="${p.imagem}" alt="${p.nome}">`
            : `<div class="sem_imagem">Sem imagem</div>`

        grid_cards.innerHTML += `
            <div class="card_produto ${critico ? 'card_critico' : ''}">
                ${imagemHtml}
                <h3>${p.nome}</h3>
                <p><strong>Categoria:</strong> ${p.categoria}</p>
                <p><strong>Preço:</strong> R$ ${parseFloat(p.preco).toFixed(2)}</p>
                <p><strong>Estoque:</strong> ${p.qtdeEstoque} ${critico ? '⚠️' : ''}</p>
                <p><strong>Marca:</strong> ${p.marca || '-'}</p>
            </div>
        `
    }
})
.catch(err => {
    console.error('Erro ao carregar dashboard de produtos:', err)
    resposta.innerHTML = '<p style="color: red;">Erro ao carregar os produtos do dashboard.</p>'
})