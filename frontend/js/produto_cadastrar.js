let resposta = document.getElementById('resposta')
let form_manual = document.getElementById('form_manual')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO 1: CADASTRO MANUAL (POST real para /produtos)
// =========================================================================
form_manual.addEventListener('submit', (e) => {
    e.preventDefault()

    const produto = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        precoUnit: parseFloat(document.getElementById('precoUnit').value)
    }

    resposta.innerHTML = '<p style="color: yellow;">Cadastrando produto...</p>'

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.codProduto) {
            resposta.innerHTML = `<p style="color: lightgreen;">Produto "${dados.nome}" cadastrado com sucesso! (cod: ${dados.codProduto})</p>`
            form_manual.reset()
        } else {
            resposta.innerHTML = `<p style="color: red;">${dados.message || 'Erro ao cadastrar o produto.'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao cadastrar produto manualmente:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao se comunicar com o servidor.</p>'
    })
})

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Buscando catálogos de produtos na API DummyJSON...</p>'

    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(dadosExternos => {
        resposta.innerHTML = '<p style="color: cyan;">Dados recebidos com sucesso! Transmitindo lote para o back-end...</p>'
        
        return fetch('http://localhost:3000/produtos/carga-lote', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosExternos.products)
        })
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga estrutural de produtos realizada com sucesso!'}</p>`
    })
    .catch(err => {
        console.error('Erro na carga em lote de produtos:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao processar os dados da carga de produtos em lote.</p>'
    })
})