const conexao = require("../database/conexao");


// Criar usuário

exports.criarUsuario = (req, res) => {


    const {
        nome,
        email,
        senha,
        telefone
    } = req.body;



    if (!nome || !email || !senha) {

        return res.status(400).json({
            erro: "Nome, email e senha são obrigatórios"
        });

    }



    const sql = `

        INSERT INTO usuarios
        (nome, email, senha, telefone)

        VALUES (?, ?, ?, ?)

    `;



    conexao.query(
        sql,
        [nome, email, senha, telefone],
        (erro, resultado) => {


            if (erro) {

                console.log(erro);


                return res.status(500).json({
                    erro: "Erro ao criar usuário"
                });

            }



            res.json({

                mensagem:
                "Usuário criado com sucesso!",

                id:
                resultado.insertId

            });


        }
    );


};





// Login

exports.login = (req, res) => {


    const {
        email,
        senha
    } = req.body;



    if (!email || !senha) {

        return res.status(400).json({

            erro:
            "Email e senha são obrigatórios"

        });

    }



    const sql = `

        SELECT *
        FROM usuarios

        WHERE email = ?
        AND senha = ?

    `;



    conexao.query(
        sql,
        [email, senha],
        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                return res.status(500).json({

                    erro:
                    "Erro ao realizar login"

                });

            }



            if (resultado.length === 0) {

                return res.status(401).json({

                    erro:
                    "Email ou senha incorretos"

                });

            }



            const usuario = resultado[0];


            res.json({

                mensagem:
                "Login realizado com sucesso!",


                usuario: {

                    id: usuario.id,

                    nome: usuario.nome,

                    tipo: usuario.tipo

                }


            });


        }
    );


};