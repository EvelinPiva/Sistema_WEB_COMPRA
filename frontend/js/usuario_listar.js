let corpo_tabela = document.getElementById('corpo_tabela')
let resposta = document.getElementById('resposta')

fetch('http://localhost:3000/usuarios')
.then(res => res.json())
.then(usuarios => {
    if (usuarios.length === 0) {
        resposta.innerHTML = 'Nenhum usuário cadastrado ainda.'
        return
    }

    corpo_tabela.innerHTML = ''
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i]
        corpo_tabela.innerHTML += `
            <tr>
                <td>${u.codUsuario}</td>
                <td>${u.nome}</td>
                <td>${u.sobrenome}</td>
                <td>${u.idade}</td>
                <td>${u.email}</td>
                <td>${u.cidade || '-'}</td>
                <td>${u.estado || '-'}</td>
            </tr>
        `
    }
})
.catch(err => {
    console.error('Erro ao listar usuários:', err)
    resposta.innerHTML = '<p style="color: red;">Erro ao carregar a lista de usuários.</p>'
})