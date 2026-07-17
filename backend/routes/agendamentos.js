const express = require("express");
const router = express.Router();

const agendamentosController = require("../controllers/agendamentosController");


router.get("/", agendamentosController.listarAgendamentos);

router.get("/verificar/:data/:horario", agendamentosController.verificarHorario);

router.get("/:id", agendamentosController.buscarAgendamentoPorId);

router.post("/", agendamentosController.criarAgendamento);

router.put("/:id", agendamentosController.editarAgendamento);

router.delete("/:id", agendamentosController.excluirAgendamento);


module.exports = router;