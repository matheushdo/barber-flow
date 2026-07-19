const conexao = require("../database/conexao");


// Buscar clientes no banco
exports.listarClientes = (req, res) => {

    const sql = "SELECT * FROM clientes";

    conexao.query(sql, (erro, resultado) => {

        if (erro) {
            console.log(erro);
            res.status(500).json({
                erro: "Erro ao buscar clientes"
            });
            return;
        }

        res.json(resultado);

    });

};


// Criar cliente no banco
exports.criarCliente = (req, res) => {

    const { nome, telefone } = req.body;


    // Verificar campos obrigatórios
    if (!nome || !telefone) {
        return res.status(400).json({
            erro: "Nome e telefone são obrigatórios"
        });
    }


    // Verificar telefone
    const telefoneValido = /^[0-9]{10,11}$/;

    if (!telefoneValido.test(telefone)) {
        return res.status(400).json({
            erro: "Telefone inválido"
        });
    }


    const sql = `
        INSERT INTO clientes (nome, telefone)
        VALUES (?, ?)
    `;


    conexao.query(
        sql,
        [nome, telefone],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                res.status(500).json({
                    erro: "Erro ao cadastrar cliente"
                });
                return;
            }


            res.json({
                mensagem: "Cliente cadastrado com sucesso!",
                id: resultado.insertId,
                nome,
                telefone
            });

        }
    );

};

// Buscar cliente por ID
exports.buscarClientePorId = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM clientes WHERE id = ?";


    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar cliente"
            });
        }


        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }


        res.json(resultado[0]);

    });

};



// Editar cliente
exports.editarCliente = (req, res) => {

    const { id } = req.params;

    const {
        nome,
        telefone
    } = req.body;


    if (!nome || !telefone) {
        return res.status(400).json({
            erro: "Nome e telefone são obrigatórios"
        });
    }


    const sql = `
        UPDATE clientes
        SET nome = ?, telefone = ?
        WHERE id = ?
    `;


    conexao.query(
        sql,
        [nome, telefone, id],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao atualizar cliente"
                });
            }


            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Cliente não encontrado"
                });
            }


            res.json({
                mensagem: "Cliente atualizado com sucesso!"
            });

        }
    );

};



// Excluir cliente
exports.excluirCliente = (req, res) => {

    const { id } = req.params;


    const verificar = `
        SELECT * FROM agendamentos
        WHERE cliente_id = ?
    `;


    conexao.query(verificar, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao verificar agendamentos"
            });
        }


        if (resultado.length > 0) {
            return res.status(400).json({
                erro: "Cliente possui agendamentos e não pode ser excluído"
            });
        }


        const sql = "DELETE FROM clientes WHERE id = ?";


        conexao.query(sql, [id], (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao excluir cliente"
                });
            }


            res.json({
                mensagem: "Cliente excluído com sucesso!"
            });

        });

    });

};