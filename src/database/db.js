//importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()//retorna um obejto para a variavel sqlite3

//criar o objeto de dados
const db = new sqlite3.Database("./src/database/database.db")//criando um novo objeto    

module.exports = db
//utilizar o objeto de vanco de dados para nossas operações
/*
 db.serialize(() => {
    //criar uma tabela com comandos sql
    // "`" usando crase para permitir a quebra de linhas template literals
    /*
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados na tabela
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim America",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, e Lâmpadas"
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this) /*Resposta do this:
                            Statement {
                            sql: '\n' +
                                '        INSERT INTO places (\n' +
                                '            image,\n' +
                                '            name,\n' +
                                '            address,\n' +
                                '            address2,\n' +
                                '            state,\n' +
                                '            city,\n' +
                                '            items\n' +
                                '        ) VALUES (?,?,?,?,?,?,?);\n' +
                                '    ',
                            lastID: 1,
                            changes: 1
                            }
                            
    }

    db.run(query, values, afterInsertData)

    //consultar dados da tabela
     db.all(`SELECT * FROM places`, function(err, rows){ //o '*' pode ser substituido pelo item desejado: name, address, address2, etc
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão os registros: ")
        console.log(rows)/* Resposta do Rows:
                            Aqui estão os registros:
                            [
                            {
                                id: 1,
                                image: 'https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1
                            &ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                                name: 'Colectoria',
                                address: 'Guilherme Gemballa, Jardim America',
                                address2: 'Nº 260',
                                state: 'Santa Catarina',
                                city: 'Rio do Sul',
                                items: 'Resíduos Eletrônicos, e Lâmpadas'
                            }
                            ]
                        // !!!!!!!!!!!!!!!!!!!!!!!! finalizar comentario aqui !!!!!!!!!!!!!
    }) 

    //deletar dados da tabela*

     db.run(`DELETE FROM places WHERE id = ?`, [6], function(err) {// se não usar WHERE, todos os dados da tabela serão apagados
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })  

    

}) */