const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Facababaca@01",
    database: "barber_flow"
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar no banco:", erro);
        return;
    }

    console.log("MySQL conectado com sucesso!");
});

module.exports = conexao;