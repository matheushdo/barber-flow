const conexao = require("../database/conexao");


// Buscar agendamentos
exports.listarAgendamentos = (req, res) => {

    const sql = "SELECT * FROM agendamentos";

    conexao.query(sql, (erro, resultado) => {

        if (erro) {
            console.log(erro);
            res.status(500).json({
                erro: "Erro ao buscar agendamentos"
            });
            return;
        }

        res.json(resultado);

    });

};


// Buscar agendamento por ID
exports.buscarAgendamentoPorId = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM agendamentos WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            res.status(500).json({
                erro: "Erro ao buscar agendamento"
            });
            return;
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
        nome,
        telefone,
        barbeiro,
        servico,
        data,
        horario
    } = req.body;


    // Verificar campos obrigatórios
    if (!nome || !telefone || !barbeiro || !servico || !data || !horario) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }


    // Verificar telefone
    const telefoneValido = /^[0-9]{10,11}$/;

    if (!telefoneValido.test(telefone)) {
        return res.status(400).json({
            erro: "Telefone inválido"
        });
    }

    // Verificar se horário já está ocupado
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
            (nome, telefone, barbeiro, servico, data, horario)
            VALUES (?, ?, ?, ?, ?, ?)
        `;


        conexao.query(
            sql,
            [nome, telefone, barbeiro, servico, data, horario],
            (erro, resultado) => {

                if (erro) {
                    console.log(erro);
                    return res.status(500).json({
                        erro: "Erro ao criar agendamento"
                    });
                }


                res.json({
                    mensagem: "Agendamento realizado com sucesso!",
                    id: resultado.insertId
                });

            }
        );

    }
);


    const sql = `
        INSERT INTO agendamentos
        (nome, telefone, barbeiro, servico, data, horario)
        VALUES (?, ?, ?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [nome, telefone, barbeiro, servico, data, horario],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                res.status(500).json({
                    erro: "Erro ao criar agendamento"
                });
                return;
            }

            res.json({
                mensagem: "Agendamento realizado com sucesso!",
                id: resultado.insertId
            });

        }
    );

};
// Excluir agendamento
exports.excluirAgendamento = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM agendamentos WHERE id = ?";


    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            res.status(500).json({
                erro: "Erro ao excluir agendamento"
            });
            return;
        }


        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Agendamento não encontrado"
            });
        }


        res.json({
            mensagem: "Agendamento cancelado com sucesso!"
        });

    });

};

// Editar agendamento
exports.editarAgendamento = (req, res) => {

    const { id } = req.params;

    const {
        nome,
        telefone,
        barbeiro,
        servico,
        data,
        horario
    } = req.body;


    if (!nome || !telefone || !barbeiro || !servico || !data || !horario) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }


    const telefoneValido = /^[0-9]{10,11}$/;

    if (!telefoneValido.test(telefone)) {
        return res.status(400).json({
            erro: "Telefone inválido"
        });
    }


    const sql = `
        UPDATE agendamentos
        SET nome = ?, telefone = ?, barbeiro = ?, servico = ?, data = ?, horario = ?
        WHERE id = ?
    `;


    conexao.query(
        sql,
        [nome, telefone, barbeiro, servico, data, horario, id],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao atualizar agendamento"
                });
            }


            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Agendamento não encontrado"
                });
            }


            res.json({
                mensagem: "Agendamento atualizado com sucesso!"
            });

        }
    );

};
// Verificar disponibilidade de horário
exports.verificarHorario = (req, res) => {

    const { data, horario } = req.params;


    const sql = `
        SELECT * FROM agendamentos
        WHERE data = ? AND horario = ?
    `;


    conexao.query(sql, [data, horario], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao verificar horário"
            });
        }


        if (resultado.length > 0) {
            return res.json({
                disponivel: false,
                mensagem: "Horário já ocupado"
            });
        }


        res.json({
            disponivel: true,
            mensagem: "Horário disponível"
        });

    });

};