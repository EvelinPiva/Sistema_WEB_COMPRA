let corpo_tabela = document.getElementById('corpo_tabela')
let resposta = document.getElementById('resposta')

fetch('http://localhost:3000/compra')
.then(res => res.json())
.then(movimentos => {
    if (movimentos.length === 0) {
        resposta.innerHTML = 'Nenhuma movimentação registrada ainda.'
        return
    }

    corpo_tabela.innerHTML = ''
    for (let i = 0; i < movimentos.length; i++) {
        const m = movimentos[i]
        const nomeUsuario = m.usuarioCompra ? `${m.usuarioCompra.nome} ${m.usuarioCompra.sobrenome}` : '-'
        const nomeProduto = m.produtoCompra ? m.produtoCompra.nome : '-'

        corpo_tabela.innerHTML += `
            <tr>
                <td>${m.codCompra}</td>
                <td>${nomeUsuario}</td>
                <td>${nomeProduto}</td>
                <td>${m.tipoMovimento}</td>
                <td>${m.quantidadeMovimentada}</td>
                <td>R$ ${parseFloat(m.precoUnitario).toFixed(2)}</td>
                <td>${m.descontoAplicado || 0}%</td>
                <td>R$ ${parseFloat(m.precoFinal).toFixed(2)}</td>
                <td>${m.formaPagamento}</td>
                <td>${m.statusCompra}</td>
                <td>${m.dataCompra}</td>
            </tr>
        `
    }
})
.catch(err => {
    console.error('Erro ao listar movimentações:', err)
    resposta.innerHTML = '<p style="color: red;">Erro ao carregar o histórico de movimentações.</p>'
})