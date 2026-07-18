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