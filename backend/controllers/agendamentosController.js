const conexao = require("../database/conexao");


// Listar agendamentos
exports.listarAgendamentos = (req, res) => {

    const sql = `
        SELECT 
            agendamentos.id,
            usuarios.nome AS cliente,
            servicos.nome AS servico,
            DATE_FORMAT(agendamentos.data, '%Y-%m-%d') AS data,
            TIME_FORMAT(agendamentos.horario, '%H:%i') AS horario,
            agendamentos.criado_em

        FROM agendamentos

        INNER JOIN usuarios
        ON agendamentos.usuario_id = usuarios.id

        INNER JOIN servicos
ON agendamentos.servico_id = servicos.id
    `;


    conexao.query(sql, (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar agendamentos"
            });
        }

        res.json(resultado);

    });

};



// Buscar agendamento por ID
exports.buscarAgendamentoPorId = (req, res) => {

    const { id } = req.params;


    const sql = `
        SELECT 
            agendamentos.id,
            usuarios.nome AS cliente,
            servicos.nome AS servico,
            DATE_FORMAT(agendamentos.data, '%Y-%m-%d') AS data,
            TIME_FORMAT(agendamentos.horario, '%H:%i') AS horario,
            agendamentos.criado_em

        FROM agendamentos

        INNER JOIN usuarios
        ON agendamentos.usuario_id = usuarios.id

        INNER JOIN servicos
        ON agendamentos.servico_id = servicos.id

        WHERE agendamentos.id = ?
    `;


    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar agendamento"
            });
        }


        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Agendamento não encontrado"
            });
        }


        res.json(resultado[0]);

    });

};



// Criar agendamento
exports.criarAgendamento = (req, res) => {

    const {
        usuario_id,
        servico_id,
        data,
        horario
    } = req.body;



    if (!usuario_id || !servico_id || !data || !horario) {

        return res.status(400).json({
            erro: "Usuário, serviço, data e horário são obrigatórios"
        });

    }



    const verificarSql = `
        SELECT * FROM agendamentos
        WHERE data = ? AND horario = ?
    `;



    conexao.query(
        verificarSql,
        [data, horario],
        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                return res.status(500).json({
                    erro: "Erro ao verificar horário"
                });

            }



            if (resultado.length > 0) {

                return res.status(400).json({
                    erro: "Horário já ocupado"
                });

            }




            const sql = `
                INSERT INTO agendamentos
                (usuario_id, servico_id, data, horario)
                VALUES (?, ?, ?, ?)
            `;



            conexao.query(
                sql,
                [
                    usuario_id,
                    servico_id,
                    data,
                    horario
                ],
                (erro, resultado) => {


                    if (erro) {

                        console.log(erro);

                        return res.status(500).json({
                            erro: "Erro ao criar agendamento"
                        });

                    }



                    res.json({

                        mensagem:
                            "Agendamento realizado com sucesso!",

                        id:
                            resultado.insertId

                    });


                }
            );


        }
    );


};




// Editar agendamento
exports.editarAgendamento = (req, res) => {


    const { id } = req.params;


    const {
        usuario_id,
        servico_id,
        data,
        horario
    } = req.body;



    if (!usuario_id || !servico_id || !data || !horario) {

        return res.status(400).json({

            erro:
                "Usuário, serviço, data e horário são obrigatórios"

        });

    }



    const sql = `

        UPDATE agendamentos

        SET usuario_id = ?, servico_id = ?, data = ?, horario = ?

        WHERE id = ?

    `;



    conexao.query(

        sql,

        [
            usuario_id,
            servico_id,
            data,
            horario,
            id
        ],

        (erro, resultado) => {



            if (erro) {

                console.log(erro);

                return res.status(500).json({

                    erro:
                        "Erro ao atualizar agendamento"

                });

            }



            if (resultado.affectedRows === 0) {

                return res.status(404).json({

                    erro:
                        "Agendamento não encontrado"

                });

            }



            res.json({

                mensagem:
                    "Agendamento atualizado com sucesso!"

            });


        }

    );


};




// Excluir agendamento
exports.excluirAgendamento = (req, res) => {


    const { id } = req.params;


    const sql =
        "DELETE FROM agendamentos WHERE id = ?";



    conexao.query(

        sql,

        [id],

        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                return res.status(500).json({

                    erro:
                        "Erro ao excluir agendamento"

                });

            }



            if (resultado.affectedRows === 0) {

                return res.status(404).json({

                    erro:
                        "Agendamento não encontrado"

                });

            }



            res.json({

                mensagem:
                    "Agendamento cancelado com sucesso!"

            });



        }

    );


};




// Verificar horário
exports.verificarHorario = (req, res) => {


    const {
        data,
        horario
    } = req.params;



    const sql = `

        SELECT *

        FROM agendamentos

        WHERE data = ? AND horario = ?

    `;



    conexao.query(

        sql,

        [
            data,
            horario
        ],

        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                return res.status(500).json({

                    erro:
                        "Erro ao verificar horário"

                });

            }



            res.json({

                disponivel:
                    resultado.length === 0

            });



        }

    );


};

// Marcar agendamento como realizado
exports.realizarAgendamento = (req, res) => {

    const id = req.params.id;


    const sql = `
        UPDATE agendamentos
        SET status = 'realizado'
        WHERE id = ?
    `;


    conexao.query(sql, [id], (erro, resultado) => {


        if (erro) {

            console.log(erro);

            return res.status(500).json({
                erro: "Erro ao atualizar agendamento"
            });

        }


        res.json({
            mensagem: "Agendamento realizado com sucesso!"
        });


    });

};