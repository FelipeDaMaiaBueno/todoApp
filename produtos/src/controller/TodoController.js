const express = require('express');

const app = express();
const conexao = require('../index');

const selectAllProducts = 'SELECT * FROM todo';

/*
Pré-condição: Nenhuma
Pós-condição: Mostra na tela a mensagem do return
*/

class TodoController {

    /*
    Pré-condição: Nenhuma
    Pós-condição: Mostra a msg na tela
    */
    async inicialTodo(req, res) {
         
    }

    /*
    Pré-condição: Nenhuma
    Pós-condição: Lista as tarefas com paginação
    */
    async listaTodo(req, res) {
        const { page, limit } = await req.query;
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
    
    }

    /*
    Pré-condição:
    Pós-condição:
    */


}

module.exports = new TodoController();
