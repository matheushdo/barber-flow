const API = "http://localhost:3000";


// ===============================
// LISTAR CLIENTES
// ===============================

fetch(`${API}/clientes`)
    .then(resposta => resposta.json())
    .then(clientes => {

        const lista = document.getElementById("listaClientes");


        clientes.forEach(cliente => {


            lista.innerHTML += `

                <div class="cliente-card">


                    <h3>
                        ${cliente.nome}
                    </h3>


                    <p>
                        Telefone: ${cliente.telefone}
                    </p>


                    <button onclick="excluirCliente(${cliente.id})">
                        Excluir
                    </button>


                    <button onclick="editarCliente(${cliente.id}, '${cliente.nome}', '${cliente.telefone}')">
                        Editar
                    </button>


                </div>

            `;


        });


    })

    .catch(erro => {

        console.log("Erro ao conectar com API:", erro);

    });





// ===============================
// CADASTRAR CLIENTE
// ===============================


const formulario = document.getElementById("formCliente");


formulario.addEventListener("submit", function(event){


    event.preventDefault();



    const cliente = {


        nome: document.getElementById("nome").value,


        telefone: document.getElementById("telefone").value


    };



    fetch(`${API}/clientes`, {


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify(cliente)


    })


    .then(resposta => resposta.json())


    .then(resultado => {


        alert("Cliente cadastrado com sucesso!");


        location.reload();


    });


});





// ===============================
// EXCLUIR CLIENTE
// ===============================


function excluirCliente(id){


    fetch(`${API}/clientes/${id}`, {


        method:"DELETE"


    })


    .then(resposta => resposta.json())


    .then(resultado => {


        alert(resultado.mensagem);


        location.reload();


    });


}






// ===============================
// EDITAR CLIENTE
// ===============================


function editarCliente(id, nomeAtual, telefoneAtual){


    const novoNome = prompt(
        "Novo nome:",
        nomeAtual
    );


    if(novoNome === null) return;



    const novoTelefone = prompt(
        "Novo telefone:",
        telefoneAtual
    );


    if(novoTelefone === null) return;




    fetch(`${API}/clientes/${id}`, {


        method:"PUT",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify({


            nome: novoNome,


            telefone: novoTelefone


        })


    })


    .then(resposta => resposta.json())


    .then(resultado => {


        alert(resultado.mensagem);


        location.reload();


    });


}






// ===============================
// LISTAR SERVIÇOS
// ===============================


fetch(`${API}/servicos`)
    .then(resposta => resposta.json())
    .then(servicos => {


        const lista = document.getElementById("listaServicos");


        if(!lista) return;



        servicos.forEach(servico => {



            lista.innerHTML += `


                <div class="cliente-card">


                    <h3>
                        ${servico.nome}
                    </h3>



                    <p>
                        💰 R$ ${servico.preco}
                    </p>



                    <p>
                        ⏱ ${servico.duracao} minutos
                    </p>



                </div>


            `;


        });


    })


    .catch(erro => {


        console.log("Erro ao buscar serviços:", erro);


    });






// ===============================
// EFEITO LUZ DO CURSOR
// ===============================


document.addEventListener("mousemove", (event) => {


    document.documentElement.style.setProperty(
        "--mouse-x",
        event.clientX + "px"
    );



    document.documentElement.style.setProperty(
        "--mouse-y",
        event.clientY + "px"
    );


});

// ===============================
// DASHBOARD
// ===============================


// Total clientes

fetch(`${API}/clientes`)
.then(resposta => resposta.json())
.then(clientes => {


    document.getElementById("totalClientes").innerHTML =
        clientes.length;


});




// Total serviços

fetch(`${API}/servicos`)
.then(resposta => resposta.json())
.then(servicos => {


    document.getElementById("totalServicos").innerHTML =
        servicos.length;



    let total = 0;


    servicos.forEach(servico => {


        total += Number(servico.preco);


    });



    document.getElementById("faturamento").innerHTML =

        "R$ " + total.toFixed(2);



});

// ===============================
// GRÁFICO SERVIÇOS MAIS REALIZADOS
// ===============================


fetch(`${API}/dashboard/servicos-populares`)

.then(resposta => resposta.json())

.then(dados => {


    const nomes = dados.map(item => item.nome);


    const quantidades = dados.map(item => item.quantidade);



    const grafico = document
        .getElementById("graficoServicos")
        .getContext("2d");



    new Chart(grafico, {


        type:"pie",



        data:{


            labels: nomes,


            datasets:[{


                data: quantidades


            }]


        },



        options:{


            responsive:true,


            plugins:{


                legend:{


                    position:"bottom"


                }


            }


        }



    });



});