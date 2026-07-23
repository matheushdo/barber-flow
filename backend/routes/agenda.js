const express = require("express");
const router = express.Router();

const agendaController = require("../controllers/agendaController");

// Horários
router.get("/horarios", agendaController.listarHorarios);
router.put("/horarios/:id", agendaController.editarHorario);

// Bloqueios
router.get("/bloqueios", agendaController.listarBloqueios);
router.post("/bloqueios", agendaController.criarBloqueio);
router.put("/bloqueios/:id", agendaController.editarBloqueio);
router.delete("/bloqueios/:id", agendaController.excluirBloqueio);

// Disponibilidade
router.get("/disponiveis", agendaController.listarHorariosDisponiveis);

module.exports = router;