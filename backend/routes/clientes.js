const express = require("express");
const router = express.Router();

const clientesController = require("../controllers/clientesController");

router.get("/", clientesController.listarClientes);

router.post("/", clientesController.criarCliente);

module.exports = router;