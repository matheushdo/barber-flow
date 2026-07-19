const express = require("express");
const router = express.Router();

const servicosController = require("../controllers/servicosController");

router.get("/", servicosController.listarServicos);

router.get("/:id", servicosController.buscarServico);

router.post("/", servicosController.criarServico);

router.put("/:id", servicosController.atualizarServico);

router.delete("/:id", servicosController.deletarServico);

module.exports = router;