const { Sequelize } = require('sequelize')

const db = new Sequelize('db_compras','root','senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

db.authenticate()
.then(()=>{
    console.log('conexão realizada com sucesso!')
})
.catch((err)=>{
    console.error('não foi possível conectar com o banco')
})

module.exports = db