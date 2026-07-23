const conexao = require("../database/conexao");

function gerarHorarios(inicio, fim) {

    const horarios = [];

    let atual = new Date(`2000-01-01T${inicio}`);
    const limite = new Date(`2000-01-01T${fim}`);


    while (atual < limite) {

        const hora = atual.toTimeString().substring(0, 5);

        horarios.push(hora);


        atual.setMinutes(
            atual.getMinutes() + 15
        );

    }


    return horarios;

}

function gerarIntervaloOcupado(hora, duracao) {

    const horarios = [];

    let inicio = new Date(`2000-01-01T${hora}`);

    const fim = new Date(inicio);

    fim.setMinutes(
        fim.getMinutes() + duracao
    );


    while (inicio < fim) {

        horarios.push(
            inicio.toTimeString().substring(0, 5)
        );

        inicio.setMinutes(
            inicio.getMinutes() + 15
        );

    }


    return horarios;

}


//Verificar se horário cabe

function horarioCabe(horaInicio, horaFim, duracao) {

    const inicio = new Date(`2000-01-01T${horaInicio}:00`);
    const fim = new Date(`2000-01-01T${horaFim}:00`);


    inicio.setMinutes(
        inicio.getMinutes() + duracao
    );


    return inicio <= fim;

}


// Horários de funcionamento

exports.listarHorarios = (req, res) => {

    const sql = `
        SELECT *
        FROM horarios_funcionamento
        ORDER BY dia_semana, hora_inicio
    `;

    conexao.query(sql, (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar horários de funcionamento."
            });
        }

        res.status(200).json(resultado);

    });

};

exports.editarHorario = (req, res) => {



    const { id } = req.params;

    const {
        dia_semana,
        hora_inicio,
        hora_fim,
        ativo
    } = req.body;

    const sql = `
        UPDATE horarios_funcionamento
        SET
            dia_semana = ?,
            hora_inicio = ?,
            hora_fim = ?,
            ativo = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [dia_semana, hora_inicio, hora_fim, ativo, id],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao atualizar horário."
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Horário não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Horário atualizado com sucesso!"
            });

        }
    );

};

// Bloqueios

exports.listarBloqueios = (req, res) => {

    const sql = `
        SELECT *
        FROM bloqueios_agenda
        ORDER BY data_inicio ASC
    `;

    conexao.query(sql, (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar bloqueios."
            });
        }

        res.status(200).json(resultado);

    });

};

exports.criarBloqueio = (req, res) => {

    const {
        tipo,
        data_inicio,
        data_fim,
        dia_inteiro,
        hora_inicio,
        hora_fim,
        motivo
    } = req.body;

    const sql = `
        INSERT INTO bloqueios_agenda
        (
            tipo,
            data_inicio,
            data_fim,
            dia_inteiro,
            hora_inicio,
            hora_fim,
            motivo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            tipo,
            data_inicio,
            data_fim,
            dia_inteiro,
            hora_inicio,
            hora_fim,
            motivo
        ],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao criar bloqueio."
                });
            }

            res.status(201).json({
                mensagem: "Bloqueio criado com sucesso!",
                id: resultado.insertId
            });

        }
    );

};

exports.editarBloqueio = (req, res) => {

    const { id } = req.params;

    const {
        tipo,
        data_inicio,
        data_fim,
        dia_inteiro,
        hora_inicio,
        hora_fim,
        motivo,
        ativo
    } = req.body;

    const sql = `
        UPDATE bloqueios_agenda
        SET
            tipo = ?,
            data_inicio = ?,
            data_fim = ?,
            dia_inteiro = ?,
            hora_inicio = ?,
            hora_fim = ?,
            motivo = ?,
            ativo = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [
            tipo,
            data_inicio,
            data_fim,
            dia_inteiro,
            hora_inicio,
            hora_fim,
            motivo,
            ativo,
            id
        ],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao atualizar bloqueio."
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Bloqueio não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Bloqueio atualizado com sucesso!"
            });

        }
    );

};

exports.excluirBloqueio = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM bloqueios_agenda
        WHERE id = ?
    `;

    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao excluir bloqueio."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Bloqueio não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Bloqueio excluído com sucesso!"
        });

    });

};

// Horários disponíveis

exports.listarHorariosDisponiveis = (req, res) => {

    const { data, servico } = req.query;


    if (!data || !servico) {
        return res.status(400).json({
            erro: "Informe data e serviço."
        });
    }


    const sqlBloqueios = `
    SELECT *
    FROM bloqueios_agenda
    WHERE ?
    BETWEEN data_inicio AND data_fim
    AND ativo = true
`;

    // Buscar duração do serviço
    const sqlServico = `
        SELECT duracao
        FROM servicos
        WHERE id = ?
    `;


    conexao.query(sqlServico, [servico], (erro, servicoResult) => {


        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar serviço."
            });
        }


        if (servicoResult.length === 0) {
            return res.status(404).json({
                erro: "Serviço não encontrado."
            });
        }


        const duracao = servicoResult[0].duracao;


        const dataObj = new Date(data);
        const diaSemana = dataObj.getDay();



        // Buscar horários do dia
        const sqlHorario = `
            SELECT *
            FROM horarios_funcionamento
            WHERE dia_semana = ?
            AND ativo = true
        `;


        conexao.query(sqlHorario, [diaSemana], (erro, horarios) => {


            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao buscar horários."
                });
            }


            if (horarios.length === 0) {
                return res.json([]);
            }


            let listaHorarios = [];


            horarios.forEach(periodo => {

                const gerados = gerarHorarios(
                    periodo.hora_inicio,
                    periodo.hora_fim
                );


                gerados.forEach(hora => {

                    listaHorarios.push({
                        hora: hora,
                        limite: String(periodo.hora_fim).substring(0, 5)
                    });

                });

            });



            // Buscar agendamentos existentes
            const sqlAgendamentos = `
             SELECT 
    agendamentos.horario,
    servicos.duracao
FROM agendamentos
JOIN servicos
ON agendamentos.servico_id = servicos.id
WHERE data = ?
AND status != 'cancelado'
            `;


            conexao.query(
                sqlAgendamentos,
                [data],
                (erro, agendamentos) => {


                    if (erro) {
                        console.log(erro);

                        return res.status(500).json({
                            erro: "Erro ao buscar agendamentos."
                        });
                    }


                    let ocupados = [];


                    agendamentos.forEach(item => {

                        const intervalos = gerarIntervaloOcupado(
                            String(item.horario).substring(0, 5),
                            item.duracao
                        );

                        ocupados.push(...intervalos);

                    });



                    // Buscar bloqueios
                    conexao.query(
                        sqlBloqueios,
                        [data],
                        (erro, bloqueios) => {

                            if (erro) {
                                console.log(erro);

                                return res.status(500).json({
                                    erro: "Erro ao buscar bloqueios."
                                });
                            }


                            const disponiveis = listaHorarios.filter(item => {


                                if (ocupados.includes(item.hora)) {
                                    return false;
                                }


                                for (let bloqueio of bloqueios) {


                                    if (bloqueio.dia_inteiro == 1) {
                                        return false;
                                    }


                                    if (
                                        bloqueio.hora_inicio &&
                                        bloqueio.hora_fim &&
                                        item.hora >= String(bloqueio.hora_inicio).substring(0, 5) &&
                                        item.hora < String(bloqueio.hora_fim).substring(0, 5)
                                    ) {
                                        return false;
                                    }

                                }


                                return true;

                            });



                            const horariosValidos = disponiveis.filter(item =>
                                horarioCabe(
                                    item.hora,
                                    item.limite,
                                    duracao
                                )
                            );


                            res.json({
                                duracao,
                                horarios: horariosValidos.map(item => item.hora)
                            });


                        }
                    );


                }
            );


        }
        );


    });


}; 