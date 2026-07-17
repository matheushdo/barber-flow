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

    const sql = `
        INSERT INTO clientes (nome, telefone)
        VALUES (?, ?)
    `;


    conexao.query(sql, [nome, telefone], (erro, resultado) => {

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

    });

};