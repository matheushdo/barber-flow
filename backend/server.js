const express = require("express");

require("./database/conexao");

const app = express();

const PORT = 3000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const clientesRoutes = require("./routes/clientes");
const agendamentosRoutes = require("./routes/agendamentos");
const servicosRoutes = require("./routes/servicos");
const usuariosRoutes = require("./routes/usuarios");
const dashboardRoutes = require("./routes/dashboards");
const agendaRoutes = require("./routes/agenda");

app.use("/agenda", agendaRoutes);


app.use("/dashboard", dashboardRoutes);

app.use("/clientes", clientesRoutes);
app.use("/agendamentos", agendamentosRoutes);
app.use("/servicos", servicosRoutes);
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.send("API da Barber Flow funcionando!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});