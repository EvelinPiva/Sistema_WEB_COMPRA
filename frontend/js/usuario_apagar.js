let btn_apagar = document.getElementById('btn_apagar')
let resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value

    if (!codigo) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe um código válido.</p>'
        return
    }

    const confirmar = confirm(`Tem certeza que deseja apagar o usuário de código ${codigo}? Essa ação também apagará o histórico de compras vinculado a ele.`)
    if (!confirmar) return

    fetch(`http://localhost:3000/usuarios/${codigo}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = dados.message.includes('sucesso')
            ? `<p style="color: lightgreen;">${dados.message}</p>`
            : `<p style="color: red;">${dados.message}</p>`
    })
    .catch(err => {
        console.error('Erro ao apagar usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao se comunicar com o servidor.</p>'
    })
})