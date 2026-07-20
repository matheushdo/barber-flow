const API = "http://localhost:3000";


const botao = document.querySelectorAll(".btn");


botao.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Obrigado pelo contato! Em breve entraremos em contato.");

    });

});


// Buscar serviços

fetch(`${API}/servicos`)
.then(resposta => resposta.json())
.then(servicos => {


    console.log("Serviços:", servicos);


    const select = document.getElementById("servicoAgendamento");


    if(select){


        servicos.forEach(servico => {


            select.innerHTML += `

                <option value="${servico.id}">
                    ${servico.nome} - R$ ${servico.preco}
                </option>

            `;


        });


    }


})
.catch(erro => {

    console.log("Erro ao buscar serviços:", erro);

});



// Formulário de agendamento

const formularioAgendamento =
document.getElementById("formAgendamento");


if(formularioAgendamento){


    formularioAgendamento.addEventListener("submit", function(event){


        event.preventDefault();



        const agendamento = {


            nome:
            document.getElementById("nomeAgendamento").value,


            telefone:
            document.getElementById("telefoneAgendamento").value,


            servico_id:
            document.getElementById("servicoAgendamento").value,


            data:
            document.getElementById("dataAgendamento").value,


            horario:
            document.getElementById("horarioAgendamento").value


        };



        fetch(`${API}/agendamentos/publico`, {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body: JSON.stringify(agendamento)


        })


        .then(resposta => resposta.json())


        .then(resultado => {


            alert(resultado.mensagem);


            console.log(resultado);


        })


        .catch(erro => {


            console.log(
                "Erro ao realizar agendamento:",
                erro
            );


        });


    });


}

// Verificar usuário logado no menu

const usuario = JSON.parse(localStorage.getItem("usuario"));


const loginLink = document.getElementById("loginLink");


if(loginLink && usuario){


    loginLink.innerHTML = `
        Olá, ${usuario.nome} 👋
    `;


    loginLink.href = "#";


}