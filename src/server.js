const express = require("express") //faz requisição do express e adiciona na nossa variavel express, tornando-a uma função express()
const server = express() //server é um objeto com varias funções

//pegar banco de dados
const db = require("./database/db")


//configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação, permite usar o corpo do form no metodo POST para o savepoint
server.use(express.urlencoded({ extended: true }))

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
    // req.query: query strings da url 
    //console.log(req.query) não existe no metodo post
    return res.render("create-point.html")//retorna a pagina inicial do projeto
} )

server.post("/savepoint", function(req, res) { //cria uma nova rota, fazendo o 'post' no savepoint
    
    // req.body: o corpo do formulario nesta aplicação (action do form no create-point)
    //console.log(req.body)


    //inserir os dados no banco dedados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){

        if(err) {
            console.log(err)
            return res.render("create-point.html", {err: true})
        }

        console.log("Cadastrado com sucesso")
        console.log(this) 
                            
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
    
} )

server.get("/search-results", function(req, res) { /* server.get("/", (req, res) => {} */

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }


    //buscar os dados no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){ //o '*' pode ser substituido pelo item desejado: name, address, address2, etc
        
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão os registros: ")
        console.log(rows)

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total })//retorna a pagina inicial do projeto
    })


    
} )

server.listen(3000) //ligar o servidor 