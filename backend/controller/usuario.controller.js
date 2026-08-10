const Usuario = require('../models/Usuario')

// Operação de Carga Inicial em Lote 
const cargaLote = (req, res) => {
    const listaUsuarios = req.body

    if (!listaUsuarios || listaUsuarios.length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido foi enviado para a carga em lote de usuários!' })
    }

    const usuariosMapeados = []

    for (let i = 0; i < listaUsuarios.length; i++) {
        const item = listaUsuarios[i]

        usuariosMapeados.push({
            nome: item.nome || item.firstName,
            sobrenome: item.sobrenome || item.lastName,
            idade: item.idade || item.age,
            email: item.email,
            telefone: item.telefone || item.phone,
            endereco: item.endereco || (item.address ? item.address.address : ''),
            cidade: item.cidade || (item.address ? item.address.city : ''),
            estado: item.estado || (item.address ? item.address.state : '')
        })
    }

    Usuario.bulkCreate(usuariosMapeados)
        .then(() => {
            res.status(201).json({ message: 'Carga em lote de usuários realizada com sucesso no banco!' })
        })
        .catch((err) => {
            console.error('Erro no bulkCreate de usuários:', err)
            res.status(500).json({ message: 'Erro ao salvar os usuários em lote no banco de dados' })
        })
}

// Cadastro manual (formulário usuario_cadastrar.html)
const cadastrarManual = async (req, res) => {
    const { nome, sobrenome, idade, email, telefone, endereco, cidade, estado } = req.body

    if (!nome || !sobrenome || idade === undefined || !email) {
        return res.status(400).json({ message: 'Nome, sobrenome, idade e e-mail são obrigatórios!' })
    }

    try {
        const usuario = await Usuario.create({
            nome,
            sobrenome,
            idade,
            email,
            telefone: telefone || null,
            endereco: endereco || null,
            cidade: cidade || null,
            estado: estado || null
        })
        res.status(201).json(usuario)
    } catch (err) {
        console.error('Erro ao cadastrar usuário manualmente:', err)
        res.status(500).json({ message: 'Erro ao cadastrar o usuário' })
    }
}

// Listagem geral
const listar = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ order: [['codUsuario', 'ASC']] })
        res.status(200).json(usuarios)
    } catch (err) {
        console.error('Erro ao listar usuários:', err)
        res.status(500).json({ message: 'Erro ao listar os usuários' })
    }
}

// Consulta por ID
const consultar = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao consultar usuário:', err)
        res.status(500).json({ message: 'Erro ao consultar o usuário' })
    }
}

// Atualização por ID
const atualizar = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        await usuario.update(req.body)
        res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err)
        res.status(500).json({ message: 'Erro ao atualizar o usuário' })
    }
}

// Exclusão por ID
// ATENÇÃO: rel.js define onDelete: 'CASCADE' entre Usuario e Compra,
// então apagar um usuário apaga também o histórico de compras vinculado a ele.
const apagar = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        await usuario.destroy()
        res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar usuário:', err)
        res.status(500).json({ message: 'Erro ao apagar o usuário' })
    }
}

module.exports = { cargaLote, cadastrarManual, listar, consultar, atualizar, apagar }