const express = require("express");

require("./database/conexao");

const app = express();

const PORT = 3000;

app.use(express.json());

const clientesRoutes = require("./routes/clientes");
const agendamentosRoutes = require("./routes/agendamentos");
const servicosRoutes = require("./routes/servicos");

app.use("/clientes", clientesRoutes);
app.use("/agendamentos", agendamentosRoutes);
app.use("/servicos", servicosRoutes);

app.get("/", (req, res) => {
    res.send("API da Barber Flow funcionando!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});