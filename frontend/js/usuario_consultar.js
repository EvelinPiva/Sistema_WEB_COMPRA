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

    fetch(`http://localhost:3000/usuarios/${codigo}`)
    .then(res => res.json())
    .then(usuario => {
        if (usuario.message) {
            resposta.innerHTML = `<p style="color: red;">${usuario.message}</p>`
            return
        }

        resposta.innerHTML = ''
        resultado.innerHTML = `
            <p><strong>Código:</strong> ${usuario.codUsuario}</p>
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Sobrenome:</strong> ${usuario.sobrenome}</p>
            <p><strong>Idade:</strong> ${usuario.idade}</p>
            <p><strong>E-mail:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.telefone || '-'}</p>
            <p><strong>Endereço:</strong> ${usuario.endereco || '-'}</p>
            <p><strong>Cidade:</strong> ${usuario.cidade || '-'}</p>
            <p><strong>Estado:</strong> ${usuario.estado || '-'}</p>
        `
    })
    .catch(err => {
        console.error('Erro ao consultar usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao consultar o usuário.</p>'
    })
})