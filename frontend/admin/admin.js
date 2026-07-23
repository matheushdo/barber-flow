const API = "http://localhost:3000";
let graficoServicos = null;


// ===============================
// CLIENTES
// ===============================


fetch(`${API}/clientes`)

.then(res => res.json())

.then(clientes => {


    const lista = document.getElementById("listaClientes");


    if(lista){


        clientes.forEach(cliente => {


            lista.innerHTML += `

            <div class="cliente-card">

                <h3>
                    ${cliente.nome}
                </h3>

                <p>
                    Telefone: ${cliente.telefone}
                </p>


                <button onclick="editarCliente(
                    ${cliente.id},
                    '${cliente.nome}',
                    '${cliente.telefone}'
                )">

                    Editar

                </button>


                <button onclick="excluirCliente(${cliente.id})">

                    Excluir

                </button>


            </div>

            `;


        });


    }


    const totalClientes =
    document.getElementById("totalClientes");


    if(totalClientes){

        totalClientes.innerHTML = clientes.length;

    }


})

.catch(err => console.log(err));





// ===============================
// CADASTRAR CLIENTE
// ===============================


const formulario =
document.getElementById("formCliente");


if(formulario){


formulario.addEventListener("submit", e => {


    e.preventDefault();



    const cliente = {


        nome:
        document.getElementById("nome").value,


        telefone:
        document.getElementById("telefone").value


    };



    fetch(`${API}/clientes`,{


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify(cliente)


    })


    .then(res => res.json())


    .then(()=>{


        alert("Cliente cadastrado!");


        location.reload();


    });


});


}






// ===============================
// EDITAR CLIENTE
// ===============================


function editarCliente(id,nome,telefone){


    const novoNome =
    prompt("Novo nome:",nome);



    if(novoNome === null)
    return;



    const novoTelefone =
    prompt("Novo telefone:",telefone);



    if(novoTelefone === null)
    return;



    fetch(`${API}/clientes/${id}`,{


        method:"PUT",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify({


            nome:novoNome,


            telefone:novoTelefone


        })


    })


    .then(res=>res.json())


    .then(()=>{


        location.reload();


    });



}





// ===============================
// EXCLUIR CLIENTE
// ===============================


function excluirCliente(id){


    fetch(`${API}/clientes/${id}`,{


        method:"DELETE"


    })


    .then(res=>res.json())


    .then(resultado=>{


        alert(resultado.mensagem);


        location.reload();


    });


}
// ===============================
// SERVIÇOS
// ===============================


fetch(`${API}/servicos`)

.then(res => res.json())

.then(servicos => {


    const lista =
    document.getElementById("listaServicos");



    if(lista){


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


    }




    const totalServicos =
    document.getElementById("totalServicos");


    if(totalServicos){


        totalServicos.innerHTML =
        servicos.length;


    }


})

.catch(err=>console.log(err));







// ===============================
// FATURAMENTO
// ===============================


const faturamento =
document.getElementById("faturamento");


if(faturamento){


    faturamento.innerHTML =
    "R$ 0,00";


}







// ===============================
// GRÁFICO SERVIÇOS POPULARES
// ===============================


// ===============================
// GRÁFICO SERVIÇOS POPULARES
// ===============================

function carregarGrafico(){


    fetch(`${API}/dashboard/servicos-populares`)


    .then(res=>res.json())


    .then(dados=>{


        const canvas =
        document.getElementById("graficoServicos");


        if(!canvas)
        return;



        const nomes =
        dados.map(item=>item.nome);



        const quantidades =
        dados.map(item=>item.quantidade);



        // apaga gráfico antigo
        if(graficoServicos){

            graficoServicos.destroy();

        }



        graficoServicos = new Chart(
            canvas.getContext("2d"),
            {


                type:"pie",


                data:{


                    labels:nomes,


                    datasets:[{


                        data:quantidades,


                        backgroundColor:[

                            "#00aaff",
                            "#22d3ee",
                            "#006eff",
                            "#00c853",
                            "#ff9800",
                            "#9c27b0"

                        ]


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


            }
        );


    })


    .catch(err=>console.log(err));


}


carregarGrafico();




// ===============================
// PRÓXIMOS ATENDIMENTOS
// ===============================


fetch(`${API}/dashboard/proximos-atendimentos`)


.then(res=>res.json())


.then(atendimentos=>{


    const lista =
    document.getElementById("listaAtendimentos");



    if(!lista)
    return;



    lista.innerHTML="";



    if(atendimentos.length === 0){


        lista.innerHTML = `

        <p>
            Nenhum atendimento próximo.
        </p>

        `;


        return;


    }





    atendimentos.forEach(atendimento=>{


        lista.innerHTML += `


        <div class="atendimento-card">


            <h3>
                ${atendimento.cliente}
            </h3>


            <p>
                ✂ ${atendimento.servico}
            </p>


            <p>
                📅 ${new Date(atendimento.data)
                .toLocaleDateString("pt-BR")}
            </p>


            <p>
                ⏰ ${atendimento.horario}
            </p>



           <button 
class="btn-realizado" 
data-id="${atendimento.id}">
    ✅ Realizado
</button>


        </div>


        `;


    });

    document.querySelectorAll(".btn-realizado").forEach(botao => {


    botao.addEventListener("click", ()=>{


        const id = botao.dataset.id;


        const card = botao.closest(".atendimento-card");


        marcarRealizado(id, card);


    });


});



})

.catch(err=>console.log(err));

// ===============================
// MARCAR COMO REALIZADO
// ===============================


function marcarRealizado(id, card){


    fetch(`${API}/agendamentos/${id}/realizado`, {

        method:"PUT"

    })


    .then(resposta => resposta.json())


   .then(resultado => {


    console.log(resultado.mensagem);


    card.remove();


    carregarGrafico();


})

    .catch(erro => {


        console.log(
            "Erro ao marcar realizado:",
            erro
        );


    });


}






// ===============================
// EFEITO LUZ DO MOUSE
// ===============================


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