const express = require("express");
const router = express.Router();

const conexao = require("../database/conexao");

router.get("/resumo", (req, res) => {

    const mes = req.query.mes || (new Date().getMonth() + 1);
    const ano = req.query.ano || new Date().getFullYear();

    const resumoSQL = `
        SELECT
            COALESCE(SUM(servicos.preco), 0) AS faturamentoMes,
            COUNT(agendamentos.id) AS atendimentosMes,
            COALESCE(AVG(servicos.preco), 0) AS ticketMedio

        FROM agendamentos

        INNER JOIN servicos
            ON agendamentos.servico_id = servicos.id

        WHERE agendamentos.status = 'realizado'
        AND MONTH(agendamentos.data) = ?
        AND YEAR(agendamentos.data) = ?
    `;

    const maisRealizadoSQL = `
        SELECT
            servicos.nome,
            COUNT(*) AS quantidade

        FROM agendamentos

        INNER JOIN servicos
            ON agendamentos.servico_id = servicos.id

        WHERE agendamentos.status = 'realizado'
        AND MONTH(agendamentos.data) = ?
        AND YEAR(agendamentos.data) = ?

        GROUP BY servicos.id, servicos.nome

        ORDER BY quantidade DESC

        LIMIT 1
    `;

    const maiorFaturamentoSQL = `
        SELECT
            servicos.nome,
            SUM(servicos.preco) AS faturamento

        FROM agendamentos

        INNER JOIN servicos
            ON agendamentos.servico_id = servicos.id

        WHERE agendamentos.status = 'realizado'
        AND MONTH(agendamentos.data) = ?
        AND YEAR(agendamentos.data) = ?

        GROUP BY servicos.id, servicos.nome

        ORDER BY faturamento DESC

        LIMIT 1
    `;

    conexao.query(resumoSQL, [mes, ano], (erro, resumo) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({ erro: "Erro ao buscar resumo financeiro." });
        }

        conexao.query(maisRealizadoSQL, [mes, ano], (erro, realizado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({ erro: "Erro ao buscar serviço mais realizado." });
            }

            conexao.query(maiorFaturamentoSQL, [mes, ano], (erro, faturamento) => {

                if (erro) {
                    console.log(erro);
                    return res.status(500).json({ erro: "Erro ao buscar serviço com maior faturamento." });
                }

                res.json({

                    faturamentoMes: resumo[0].faturamentoMes,

                    atendimentosMes: resumo[0].atendimentosMes,

                    ticketMedio: resumo[0].ticketMedio,

                    servicoMaisRealizado: realizado.length ? realizado[0] : null,

                    servicoMaiorFaturamento: faturamento.length ? faturamento[0] : null

                });

            });

        });

    });

});

module.exports = router;