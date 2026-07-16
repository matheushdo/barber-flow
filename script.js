const botao = document.querySelectorAll(".btn");


botao.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Obrigado pelo contato! Em breve entraremos em contato.");

    });

});