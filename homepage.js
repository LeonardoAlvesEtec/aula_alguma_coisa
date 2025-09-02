import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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

//Incializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); //COnfigura o firebase authentication
const db = getFirestore(); //Configura o Firestore

//Monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //Busca ID do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    //Se o ID estiver no localStorage, tenta obter dados do Firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); //Referência ao documento do usuário no Firestore

        getDoc(docRef) //Busca o documento
        .then((docSnap) => {
            //se o documento existir, exibe os dados na interface
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
            } else {
                console.log("ID não encontrado no Documento");
            }
        })
        .catch((error) => {
            console.log("Documento não econtrado");
        });
    } else {
        console.log("ID de usuário não encontrado no localStorage");
    }
});

//Lógica de logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //Remove o ID do localStorage
    signOut(auth) //Realiza logout
    .then(() => {
        window.location.href = 'index.html'; //Redireciona para a página de login
    })
    .catch((error) => {
        console.error('Error Signing out:', error);
    });
});