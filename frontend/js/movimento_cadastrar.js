let form_movimento = document.getElementById('form_movimento')
let resposta = document.getElementById('resposta')

form_movimento.addEventListener('submit', (e) => {
    e.preventDefault()

    const movimento = {
        idUsuario: parseInt(document.getElementById('idUsuario').value),
        idProduto: parseInt(document.getElementById('idProduto').value),
        tipoMovimento: document.getElementById('tipoMovimento').value,
        quantidadeMovimentada: parseInt(document.getElementById('quantidadeMovimentada').value),
        descontoAplicado: parseFloat(document.getElementById('descontoAplicado').value) || 0,
        formaPagamento: document.getElementById('formaPagamento').value,
        statusCompra: document.getElementById('statusCompra').value,
        dataCompra: document.getElementById('dataCompra').value
    }

    resposta.innerHTML = '<p style="color: yellow;">Registrando movimentação...</p>'

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movimento)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.codCompra) {
            resposta.innerHTML = `<p style="color: lightgreen;">Movimentação registrada com sucesso! (cod: ${dados.codCompra})</p>`
            form_movimento.reset()
        } else {
            resposta.innerHTML = `<p style="color: red;">${dados.message || 'Erro ao registrar a movimentação.'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao registrar movimentação:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao se comunicar com o servidor.</p>'
    })
})