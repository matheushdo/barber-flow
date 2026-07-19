const conexao = require("../database/conexao");


// Buscar serviços no banco
exports.listarServicos = (req, res) => {

    const sql = "SELECT * FROM servicos";

    conexao.query(sql, (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar serviços"
            });
        }

        res.json(resultado);

    });

};


// Criar serviço no banco
exports.criarServico = (req, res) => {

    const { nome, preco, duracao } = req.body;


    // Verificar campos obrigatórios
    if (!nome || preco == null || duracao == null) {
        return res.status(400).json({
            erro: "Nome, preço e duração são obrigatórios"
        });
    }


    // Verificar preço
    if (preco <= 0) {
        return res.status(400).json({
            erro: "Preço inválido"
        });
    }


    // Verificar duração
    if (duracao <= 0) {
        return res.status(400).json({
            erro: "Duração inválida"
        });
    }


    const sql = `
        INSERT INTO servicos (nome, preco, duracao)
        VALUES (?, ?, ?)
    `;


    conexao.query(
        sql,
        [nome, preco, duracao],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao cadastrar serviço"
                });
            }


            res.json({
                mensagem: "Serviço cadastrado com sucesso!",
                id: resultado.insertId,
                nome,
                preco,
                duracao
            });

        }
    );

};

// Buscar serviço por ID
exports.buscarServico = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM servicos WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao buscar serviço"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Serviço não encontrado"
            });
        }

        res.json(resultado[0]);

    });

};

// Atualizar serviço
exports.atualizarServico = (req, res) => {

    const { id } = req.params;
    const { nome, preco, duracao } = req.body;

    if (!nome || preco == null || duracao == null) {
        return res.status(400).json({
            erro: "Nome, preço e duração são obrigatórios"
        });
    }

    if (preco <= 0) {
        return res.status(400).json({
            erro: "Preço inválido"
        });
    }

    if (duracao <= 0) {
        return res.status(400).json({
            erro: "Duração inválida"
        });
    }

    const sql = `
        UPDATE servicos
        SET nome = ?, preco = ?, duracao = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [nome, preco, duracao, id],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    erro: "Erro ao atualizar serviço"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Serviço não encontrado"
                });
            }

            res.json({
                mensagem: "Serviço atualizado com sucesso!"
            });

        }
    );

};

// Deletar serviço
exports.deletarServico = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM servicos WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);
            return res.status(500).json({
                erro: "Erro ao deletar serviço"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Serviço não encontrado"
            });
        }

        res.json({
            mensagem: "Serviço deletado com sucesso!"
        });

    });

};