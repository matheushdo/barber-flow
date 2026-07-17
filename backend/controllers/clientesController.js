let clientes = [
    {
        id: 1,
        nome: "João",
        telefone: "47999999999"
    },
    {
        id: 2,
        nome: "Carlos",
        telefone: "47888888888"
    }
];


exports.listarClientes = (req, res) => {
    res.json(clientes);
};


exports.criarCliente = (req, res) => {

    const novoCliente = {
        id: clientes.length + 1,
        nome: req.body.nome,
        telefone: req.body.telefone
    };

    clientes.push(novoCliente);

    res.json(novoCliente);
};