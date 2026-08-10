const Produto = require('../models/Produto')

// Operação de Carga Inicial em Lote 
const cargaLote = (req, res) => {
    const listaProdutos = req.body

    if (!listaProdutos || listaProdutos.length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido foi enviado para a carga em lote!' })
    }

    const produtosMapeados = []

    for (let i = 0; i < listaProdutos.length; i++) {
        const item = listaProdutos[i]

        produtosMapeados.push({
            nome: item.nome || item.title,
            descricao: item.descricao || item.description,
            categoria: item.categoria || item.category,
            preco: item.preco || item.price,
            desconto: item.desconto || item.discountPercentage,
            qtdeEstoque: item.qtdeEstoque || item.stock,
            marca: item.marca || item.brand,
            imagem: item.imagem || item.thumbnail
        })
    }

    Produto.bulkCreate(produtosMapeados)
        .then(() => {
            res.status(201).json({ message: 'Carga em lote de produtos realizada com sucesso no banco!' })
        })
        .catch((err) => {
            console.error('Erro no bulkCreate de produtos:', err)
            res.status(500).json({ message: 'Erro ao salvar os produtos em lote no banco de dados' })
        })
}

// Cadastro manual (formulário produto_cadastrar.html)
const cadastrarManual = async (req, res) => {
    const { nome, categoria, quantidade, precoUnit, descricao, desconto, marca, imagem } = req.body

    if (!nome || !categoria || quantidade === undefined || precoUnit === undefined) {
        return res.status(400).json({ message: 'Nome, categoria, quantidade e preço são obrigatórios!' })
    }

    try {
        const produto = await Produto.create({
            nome,
            categoria,
            qtdeEstoque: quantidade,
            preco: precoUnit,
            descricao: descricao || null,
            desconto: desconto || 0.00,
            marca: marca || null,
            imagem: imagem || null
        })
        res.status(201).json(produto)
    } catch (err) {
        console.error('Erro ao cadastrar produto manualmente:', err)
        res.status(500).json({ message: 'Erro ao cadastrar o produto' })
    }
}

// Listagem geral (usado na tela de Listar e no Dashboard de cards)
const listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ order: [['codProduto', 'ASC']] })
        res.status(200).json(produtos)
    } catch (err) {
        console.error('Erro ao listar produtos:', err)
        res.status(500).json({ message: 'Erro ao listar os produtos' })
    }
}

// Consulta por ID
const consultar = async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        res.status(200).json(produto)
    } catch (err) {
        console.error('Erro ao consultar produto:', err)
        res.status(500).json({ message: 'Erro ao consultar o produto' })
    }
}

// Atualização por ID
const atualizar = async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        await produto.update(req.body)
        res.status(200).json(produto)
    } catch (err) {
        console.error('Erro ao atualizar produto:', err)
        res.status(500).json({ message: 'Erro ao atualizar o produto' })
    }
}

// Exclusão por ID
// ATENÇÃO: rel.js define onDelete: 'CASCADE' entre Produto e Compra,
// então apagar um produto apaga também o histórico de compras vinculado a ele.
const apagar = async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        await produto.destroy()
        res.status(200).json({ message: 'Produto removido com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar produto:', err)
        res.status(500).json({ message: 'Erro ao apagar o produto' })
    }
}

module.exports = { cargaLote, cadastrarManual, listar, consultar, atualizar, apagar }