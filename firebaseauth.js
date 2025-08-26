//Importa as funções necessárias do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

//Configuração do Firebase
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCOlMX4IIGhOcJCoz65AbDrMZFh01NlRyg",
    authDomain: "openidconnect-73caa.firebaseapp.com",
    projectId: "openidconnect-73caa",
    storageBucket: "openidconnect-73caa.firebasestorage.app",
    messagingSenderId: "769869525202",
    appId: "1:769869525202:web:c71667568fe792af8afd0b"
  };

//Inicializa o firebase
const app = initializeApp(firebaseConfig);

//Função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000); //A mensagem desaparece depois de 5 segundos
}

//Lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault(); //Previne o comportamento padrão do botão

    //Adicionar os dados do formulário de cadastro
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth(); //Configura o serviço de autenticação
    const db = getFirestore(); //Conecta o Firestore

    //Cria uma conta com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; //Usuário autenticado
        const userData = { email, firstName, lastName }; //Dados do usuário para salvar

        showMessage('Conta criada com sucesso', 'signUpMessage'); //Exibe mesagem de sucesso

        //Salva os dados do usuário no firestore
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'index.html'; //Redireciona para a página de login após o cadastro 
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Endereço de email já existe', 'signUpMessage');
            } else {
                showMessage('Não é possível criar usuário', 'signUpMessage');
            }
        });
    })
});

//Lógica de login de usuários existentes
const  signIn = document.getElementById('sub,itSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault('rPassword').value;
    const auth = getAuth(); //Configura o serviço de autenticação

    //Realiza o login com e-mail e senha
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('usuário logado com sucesso', signInMessage); //Exibe mensagem de sucesso
        const user = userCredential.user;

        //Salva o ID do usuário no lcalStorage
        localStorage.setItem('loggedInUserId', user.uid);

        window.location.href = 'homepage.html'; //Redireciona para a página inicial
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/invalid-credential') {
            showMessage('Email ou Senha incorreta', 'signInMessage');
        }else{
            showMessage('Essa conta não existe', 'signMessage');
        }
    });
});
