let btn_buscar = document.getElementById('btn_buscar')
let form_atualizar = document.getElementById('form_atualizar')
let resposta = document.getElementById('resposta')

btn_buscar.addEventListener('click', () => {
    const codigo = document.getElementById('codigo_busca').value

    if (!codigo) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe um código válido.</p>'
        return
    }

    fetch(`http://localhost:3000/usuarios/${codigo}`)
    .then(res => res.json())
    .then(usuario => {
        if (usuario.message) {
            form_atualizar.style.display = 'none'
            resposta.innerHTML = `<p style="color: red;">${usuario.message}</p>`
            return
        }

        document.getElementById('codUsuario').value = usuario.codUsuario
        document.getElementById('nome').value = usuario.nome
        document.getElementById('sobrenome').value = usuario.sobrenome
        document.getElementById('idade').value = usuario.idade
        document.getElementById('email').value = usuario.email
        document.getElementById('telefone').value = usuario.telefone || ''
        document.getElementById('endereco').value = usuario.endereco || ''
        document.getElementById('cidade').value = usuario.cidade || ''
        document.getElementById('estado').value = usuario.estado || ''

        form_atualizar.style.display = 'block'
        resposta.innerHTML = ''
    })
    .catch(err => {
        console.error('Erro ao buscar usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao buscar o usuário.</p>'
    })
})

form_atualizar.addEventListener('submit', (e) => {
    e.preventDefault()

    const codigo = document.getElementById('codUsuario').value
    const usuarioAtualizado = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        idade: parseInt(document.getElementById('idade').value),
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    }

    fetch(`http://localhost:3000/usuarios/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioAtualizado)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.codUsuario) {
            resposta.innerHTML = '<p style="color: lightgreen;">Usuário atualizado com sucesso!</p>'
        } else {
            resposta.innerHTML = `<p style="color: red;">${dados.message || 'Erro ao atualizar.'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao atualizar usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao se comunicar com o servidor.</p>'
    })
})