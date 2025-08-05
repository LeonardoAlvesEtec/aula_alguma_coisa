//Obtém os elementos do botão e formulários de login/cadastro
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUpForm');

//Quando botão de cadastro é clicado, esconde o formulário de login e mostra e de cadastro
signUpButton.addEventListener('click', function () {
    signInForm.style.display = "none"
    signUpForm.style.display = "block"
});

//Quando o botão de login é clicado, esconde o formulário de cadastro e mostra o de login.
signInButton.addEventListener('click', function () {
    signInForm.style.display = "block"
    signUpForm.style.display = "none"
});