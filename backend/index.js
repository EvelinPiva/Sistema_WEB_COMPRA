const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const produtoController = require('./controller/produto.controller')
const usuarioController = require('./controller/usuario.controller')
const compraController = require('./controller/compra.controller')
const relatVwController = require('./controller/relatVW.controller')

const hostname = 'localhost' // 127.0.0.1
const PORT = 3000

// ------------ Middleware ----------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//--------------- Rotas --------------

// Rotas de Usuário
app.post('/usuarios/carga-lote', usuarioController.cargaLote) // Carga em lote vinda do Front
app.post('/usuarios', usuarioController.cadastrarManual)      // Cadastro manual
app.get('/usuarios', usuarioController.listar)                // Listagem geral
app.get('/usuarios/:id', usuarioController.consultar)         // Consulta por ID
app.put('/usuarios/:id', usuarioController.atualizar)         // Atualização
app.delete('/usuarios/:id', usuarioController.apagar)         // Exclusão

// Rotas de Produto
app.post('/produtos/carga-lote', produtoController.cargaLote) // Carga em lote vinda do Front
app.post('/produtos', produtoController.cadastrarManual)      // Cadastro manual
app.get('/produtos', produtoController.listar)                // Listagem geral (e Dashboard de cards)
app.get('/produtos/:id', produtoController.consultar)         // Consulta por ID
app.put('/produtos/:id', produtoController.atualizar)         // Atualização
app.delete('/produtos/:id', produtoController.apagar)         // Exclusão

// Rotas de Compra (Movimentação de Estoque)
app.post('/compra', compraController.cadastrar)
app.get('/compra', compraController.listar)                   // Histórico completo de movimentações

// Rotas de Relatórios Analíticos (Views SQL Nativas)
app.get('/relatorio/produtos-criticos', relatVwController.listarHistoricoSaidas)
app.get('/relatorio/volume-compras', relatVwController.listarPorCategorias)

// Rota de Teste do Servidor
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!!!' })
})

// -------------- Server -------------
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados!', err)
    })