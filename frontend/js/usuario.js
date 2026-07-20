const API = "http://localhost:3000";


// Cadastro

const cadastro =
document.getElementById("formCadastro");


if(cadastro){


cadastro.addEventListener("submit", e => {


e.preventDefault();



const usuario = {


nome:
document.getElementById("nome").value,


email:
document.getElementById("email").value,


telefone:
document.getElementById("telefone").value,


senha:
document.getElementById("senha").value


};



fetch(`${API}/usuarios`,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(usuario)


})


.then(res => res.json())


.then(resultado=>{


alert(resultado.mensagem);


window.location.href="login.html";


});


});

}



// Login


const login =
document.getElementById("formLogin");


if(login){


login.addEventListener("submit", e=>{


e.preventDefault();



const dados = {


email:
document.getElementById("emailLogin").value,


senha:
document.getElementById("senhaLogin").value


};



fetch(`${API}/usuarios/login`,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(dados)


})


.then(res=>res.json())


.then(resultado=>{


alert(resultado.mensagem);


localStorage.setItem(
"usuario",
JSON.stringify(resultado.usuario)
);



window.location.href="index.html";


});


});


}