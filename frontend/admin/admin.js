const API = "http://localhost:3000";



// ===============================
// LISTAR CLIENTES
// ===============================

fetch(`${API}/clientes`)

.then(resposta => resposta.json())

.then(clientes => {


    const lista = document.getElementById("listaClientes");


    if(!lista) return;



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


    console.log(
        "Erro ao buscar clientes:",
        erro
    );


});







// ===============================
// CADASTRAR CLIENTE
// ===============================


const formulario = document.getElementById("formCliente");


if(formulario){


formulario.addEventListener("submit", function(event){


    event.preventDefault();



    const cliente = {


        nome:
        document.getElementById("nome").value,


        telefone:
        document.getElementById("telefone").value


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


        alert(
            "Cliente cadastrado com sucesso!"
        );


        location.reload();


    });



});


}






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


            nome:novoNome,


            telefone:novoTelefone


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


    console.log(
        "Erro ao buscar serviços:",
        erro
    );


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
// TOTAL DE CLIENTES
// ===============================


fetch(`${API}/clientes`)

.then(resposta => resposta.json())

.then(clientes => {



    const totalClientes =
    document.getElementById("totalClientes");



    if(totalClientes){


        totalClientes.innerHTML =
        clientes.length;


    }



});









// ===============================
// TOTAL SERVIÇOS
// ===============================


fetch(`${API}/servicos`)

.then(resposta => resposta.json())

.then(servicos => {



    const totalServicos =
    document.getElementById("totalServicos");



    if(totalServicos){


        totalServicos.innerHTML =
        servicos.length;


    }



});









// ===============================
// FATURAMENTO
// (temporário)
// ===============================


const faturamento =
document.getElementById("faturamento");



if(faturamento){


    faturamento.innerHTML =
    "R$ 0,00";


}









// ===============================
// GRÁFICO SERVIÇOS MAIS REALIZADOS
// ===============================


fetch(`${API}/dashboard/servicos-populares`)


.then(resposta => resposta.json())


.then(dados => {



    const canvas =
    document.getElementById("graficoServicos");



    if(!canvas) return;




    const nomes =
    dados.map(item => item.nome);




    const quantidades =
    dados.map(item => item.quantidade);





    new Chart(
        canvas.getContext("2d"),
        {


        type:"pie",



        data:{


            labels:nomes,



            datasets:[{


                data:quantidades



            }]


        },




        options:{


            responsive:true,



            maintainAspectRatio:false,



            plugins:{


                legend:{


                    position:"bottom"


                }


            }



        }



    });



});

// ===============================
// PRÓXIMOS ATENDIMENTOS
// ===============================


fetch(`${API}/dashboard/proximos-atendimentos`)


.then(resposta => resposta.json())


.then(atendimentos => {



    const lista =
    document.getElementById("proximosAtendimentos");



    if(!lista) return;





    lista.innerHTML = "";





    if(atendimentos.length === 0){



        lista.innerHTML = `

            <p>
                Nenhum atendimento próximo
            </p>

        `;


        return;


    }






    atendimentos.forEach(atendimento => {



        const data = new Date(atendimento.data);



        const dataFormatada =
        data.toLocaleDateString("pt-BR");





        lista.innerHTML += `


            <div class="atendimento-card">



                <h3>
                    ${atendimento.cliente}
                </h3>



                <p>
                    ${atendimento.servico}
                </p>




                <p>
                    📅 ${dataFormatada}
                </p>




                <span>
                    🕒 ${atendimento.horario}
                </span>



            </div>


        `;



    });




})


.catch(erro => {


    console.log(
        "Erro ao buscar próximos atendimentos:",
        erro
    );


});

// ===============================
// PRÓXIMOS ATENDIMENTOS
// ===============================


fetch(`${API}/dashboard/proximos-atendimentos`)

.then(resposta => resposta.json())

.then(atendimentos => {


    const lista = document.getElementById("proximosAtendimentos");


    lista.innerHTML = "";



    if(atendimentos.length === 0){


        lista.innerHTML = "Nenhum atendimento encontrado";


        return;

    }



    atendimentos.forEach(atendimento => {


        lista.innerHTML += `


            <div class="atendimento-card">


                <h3>
                    ${atendimento.cliente}
                </h3>


                <p>
                    ✂ ${atendimento.servico}
                </p>


                <p>
                    📅 ${new Date(atendimento.data).toLocaleDateString("pt-BR")}
                </p>


                <p>
                    ⏰ ${atendimento.horario}
                </p>


            </div>


        `;


    });


})

.catch(erro => {

    console.log(
        "Erro ao buscar atendimentos:",
        erro
    );

});

// ===============================
// PRÓXIMOS ATENDIMENTOS
// ===============================


fetch(`${API}/dashboard/proximos-atendimentos`)

.then(resposta => resposta.json())

.then(atendimentos => {


    const lista = document.getElementById("listaAtendimentos");


    lista.innerHTML = "";



    atendimentos.forEach(atendimento => {


        lista.innerHTML += `


        <div class="atendimento-card">


            <h3>
                ${atendimento.cliente}
            </h3>


            <p>
                Serviço: ${atendimento.servico}
            </p>


            <p>
                Data: ${new Date(atendimento.data).toLocaleDateString()}
            </p>


            <p>
                Horário: ${atendimento.horario}
            </p>



        </div>


        `;


    });



})

.catch(erro => {

    console.log(
        "Erro ao buscar próximos atendimentos:",
        erro
    );

});

document.addEventListener("mousemove", (e)=>{


    document.body.style.setProperty(
        "--x",
        e.clientX + "px"
    );


    document.body.style.setProperty(
        "--y",
        e.clientY + "px"
    );


});

document.addEventListener("mousemove",(e)=>{

    document.body.style.setProperty(
        "--mouse-x",
        e.clientX + "px"
    );


    document.body.style.setProperty(
        "--mouse-y",
        e.clientY + "px"
    );

});

document.addEventListener("mousemove",(e)=>{


    document.documentElement.style.setProperty(

        "--mouse-x",

        e.clientX + "px"

    );


    document.documentElement.style.setProperty(

        "--mouse-y",

        e.clientY + "px"

    );


});