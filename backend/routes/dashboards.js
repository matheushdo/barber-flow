const express = require("express");

const router = express.Router();

const conexao = require("../database/conexao");


router.get("/servicos-populares", (req,res)=>{


    const sql = `

    SELECT 
        servicos.nome,
        COUNT(agendamentos.servico_id) AS quantidade

    FROM agendamentos


    INNER JOIN servicos

    ON agendamentos.servico_id = servicos.id


    WHERE agendamentos.status = 'realizado'


    GROUP BY servicos.nome


    ORDER BY quantidade DESC

    `;


    conexao.query(sql,(erro,resultado)=>{


        if(erro){

            console.log(erro);

            return res.status(500).json({
                erro:"Erro ao buscar serviços"
            });

        }


        res.json(resultado);


    });


});


module.exports = router;