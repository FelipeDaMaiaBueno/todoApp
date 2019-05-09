const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAllProducts = 'SELECT * FROM todo';

const conexao = mysql.createConnection({            //to config.js
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydb',
    insecureAuth: 'true'
});

conexao.connect(err => {                             //to config.js
    if (err) {
        console.log(err)
    }
    else {
        console.log('Conectado')
    }
});

app.use(cors());                //to index.js

app.get('/', (req, res) => {
    return res.send('Vá para /todo para visualizar as tarefas');
});

//lista as tarefa com páginação
app.get('/todo', (req, res) => {
    const { page, limit } = req.query;
    if (page != null) {
        let limit_pages = limit ? limit : 5;
        let pgIni = (page - 1) * limit_pages;
        let pgEnd = pgIni + limit_pages;
        conexao.query(`SELECT * FROM todo LIMIT ${pgIni},${pgEnd}`, (err, results) => {
            if (err) {
                return res.send(err)
            }
            else {
                return res.status(200).json({           //status
                    data: results
                })
            }

        });
    }
    else {
        conexao.query(selectAllProducts, (err, results) => {

            if (err) {
                return res.send(err)
            }
            else {
                return res.status(200).json({           
                    data: results
                })
            }
        });
    }
});

//busca uma task pelo id
app.get('/todo/select/:id', (req, res) =>{
    const {id} = req.params;
    const selectTodoId = `SELECT * FROM todo WHERE idtodo = '${id}'`;
    conexao.query(selectTodoId, (err, results) => {
        if (!results) {
            return res.status(404).json('')
        }
        else if (err) {
            
            return res.send(err)
        }
        else {
            console.log('Tarefa Selecionada')
            return res.send(results);
        }
    });
});

//numero total de tarefas
app.get('/todo/count', (req, res) => {
    const contaProd = `SELECT COUNT(idtodo) as totalCount FROM todo`;
    conexao.query(contaProd, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            console.log('Contou as paginas')
            return res.send(results);
        }
    });
});

//insere uma nova tarefa
app.get('/todo/add', (req, res) => {                         //to controller.js ou routes
    const { descricao, feito } = req.query;
    const InsereTask = `INSERT INTO todo (descricao, feito) VALUES('${descricao}', '${feito}')`;
    conexao.query(InsereTask, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            console.log('Tarefa adicionada')
            return res.send('Tarefa adicionada com sucesso');
        }
    });
});

//deleta uma tarefa 
app.get('/todo/delete/:id', (req, res) => {                           //to controller.js
    const {id} = req.params;
    const Deletetask = `DELETE FROM todo WHERE idtodo = '${id}' `;     //deleta id mais antigo
    conexao.query(Deletetask, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('Tarefa apagada');
        }
    })
});

//atualiza uma tarefa tarefa
app.get('/todo/update', (req, res) => {                             //to controller.js
    const { id, descricao, feito} = req.query;
    const UpdateTask = `UPDATE todo SET descricao = '${descricao}', feito = '${feito}' WHERE idtodo = ${id}`;
    conexao.query(UpdateTask, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('Tarefa Atualizada');
        }
    })
});

app.listen(4000, () => {                                                    //index.js
    console.log(`Tarefas na porta 4000`)
});