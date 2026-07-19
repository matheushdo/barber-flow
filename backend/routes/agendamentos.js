const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentosController");


router.post("/", agendamentoController.criarAgendamento);

router.get("/", agendamentoController.listarAgendamentos);

router.get("/:id", agendamentoController.buscarAgendamentoPorId);

router.put("/:id", agendamentoController.editarAgendamento);

router.delete("/:id", agendamentoController.excluirAgendamento);

router.get(
    "/horario/:data/:horario",
    agendamentoController.verificarHorario
);


module.exports = router;