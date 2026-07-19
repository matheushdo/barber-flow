const express = require("express");

const router = express.Router();

const agendamentosController = require("../controllers/agendamentosController");


// listar
router.get("/", agendamentosController.listarAgendamentos);


// criar agendamento
router.post("/", agendamentosController.criarAgendamento);


// buscar por id
router.get("/:id", agendamentosController.buscarAgendamentoPorId);


// editar
router.put("/:id", agendamentosController.editarAgendamento);


// excluir
router.delete("/:id", agendamentosController.excluirAgendamento);


// verificar horário
router.get(
    "/horario/:data/:horario",
    agendamentosController.verificarHorario
);


module.exports = router;