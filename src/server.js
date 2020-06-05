const express = require("express") //faz requisição do express e adiciona na nossa variavel express, tornando-a uma função express()
const server = express() //server é um objeto com varias funções


//configurar pasta publica
server.use(express.static("public"))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//get() solicitação da pagina inicial "/"
//req requisição
//res resposta
//configuração de rota
//server.get("/", function(req, res) { /* server.get("/", (req, res) => {} */
//    res.sendFile(__dirname +"/views/index.html")//retorna a pagina inicial do projeto
//} )
//Desse jeito sem o nunjuck configurado^^
//com o nunjucks \/\/
//server.get("/", (req, res) => { /* server.get("/", (req, res) => {} */
//    return res.render("index.html", { title: "Seu Marketplace de Coléta de Resíduos"})//retorna a pagina inicial do projeto
//} )exemplo de conteudo dinamico com o nunjucks index.html ln 29
server.get("/", (req, res) => { /* server.get("/", (req, res) => {} */
    return res.render("index.html")//retorna a pagina inicial do projeto
} )

server.get("/create-point", function(req, res) { /* server.get("/", (req, res) => {} */
    return res.render("create-point.html")//retorna a pagina inicial do projeto
} )

server.get("/search-results", function(req, res) { /* server.get("/", (req, res) => {} */
    return res.render("search-results.html")//retorna a pagina inicial do projeto
} )

server.listen(3000) //ligar o servidor 