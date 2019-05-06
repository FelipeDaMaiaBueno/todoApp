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

//console.log(conexao);        //verifica a conexão

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

//numero total de tarefas
app.get('/todo/count', (req, res) => {
    const contaProd = `SELECT COUNT(idtodo) as totalCount FROM todo`;
    conexao.query(contaProd, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            console.log('funfou')
            return res.send(results);
        }
    });
});

//insere
app.get('/todo/add', (req, res) => {                         //to controller.js ou routes
    const { taskdescription, estadoatual } = req.query;
    const InsereTask = `INSERT INTO todo (taskdescription, estadoatual) VALUES('${taskdescription}', '${estadoatual}')`;
    conexao.query(InsereTask, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            console.log('funfou')
            return res.send('Tarefa adicionada com sucesso');
        }
    });
});

//del pelo id
app.get('/todo/delete', (req, res) => {                           //to controller.js
    const { idtodo } = req.query;
    const Deletetask = `DELETE FROM todo WHERE idtodo = '${idtodo}' limit 1`;     //deleta id mais antigo
    conexao.query(Deletetask, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('Tarefa apagada');
        }
    })
});

//atualiza prod
app.get('/todo/update', (req, res) => {                             //to controller.js
    const { idtodo, taskdescription, estadoatual} = req.query;
    const UpdateTask = `UPDATE todo SET taskdescription = '${taskdescription}', estadoatual = '${estadoatual}' WHERE idtodo = ${idtodo}`;
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