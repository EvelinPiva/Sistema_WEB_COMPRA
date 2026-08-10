let btn_buscar = document.getElementById('btn_buscar')
let form_atualizar = document.getElementById('form_atualizar')
let resposta = document.getElementById('resposta')

btn_buscar.addEventListener('click', () => {
    const codigo = document.getElementById('codigo_busca').value

    if (!codigo) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe um código válido.</p>'
        return
    }

    fetch(`http://localhost:3000/produtos/${codigo}`)
    .then(res => res.json())
    .then(produto => {
        if (produto.message) {
            form_atualizar.style.display = 'none'
            resposta.innerHTML = `<p style="color: red;">${produto.message}</p>`
            return
        }

        document.getElementById('codProduto').value = produto.codProduto
        document.getElementById('nome').value = produto.nome
        document.getElementById('descricao').value = produto.descricao || ''
        document.getElementById('categoria').value = produto.categoria
        document.getElementById('preco').value = produto.preco
        document.getElementById('desconto').value = produto.desconto || 0
        document.getElementById('qtdeEstoque').value = produto.qtdeEstoque
        document.getElementById('marca').value = produto.marca || ''

        form_atualizar.style.display = 'block'
        resposta.innerHTML = ''
    })
    .catch(err => {
        console.error('Erro ao buscar produto:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao buscar o produto.</p>'
    })
})

form_atualizar.addEventListener('submit', (e) => {
    e.preventDefault()

    const codigo = document.getElementById('codProduto').value
    const produtoAtualizado = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        desconto: parseFloat(document.getElementById('desconto').value) || 0,
        qtdeEstoque: parseInt(document.getElementById('qtdeEstoque').value),
        marca: document.getElementById('marca').value
    }

    fetch(`http://localhost:3000/produtos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.codProduto) {
            resposta.innerHTML = '<p style="color: lightgreen;">Produto atualizado com sucesso!</p>'
        } else {
            resposta.innerHTML = `<p style="color: red;">${dados.message || 'Erro ao atualizar.'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao atualizar produto:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao se comunicar com o servidor.</p>'
    })
})