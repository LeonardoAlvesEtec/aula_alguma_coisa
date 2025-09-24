import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCOlMX4IIGhOcJCoz65AbDrMZFh01NlRyg",
    authDomain: "openidconnect-73caa.firebaseapp.com",
    projectId: "openidconnect-73caa",
    storageBucket: "openidconnect-73caa.firebasestorage.app",
    messagingSenderId: "769869525202",
    appId: "1:769869525202:web:c71667568fe792af8afd0b"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Monitora o estado de autenticação do usuário
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Tenta obter dados do Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Se o documento existir no Firestore, usa esses dados
            const userData = docSnap.data();
            document.getElementById('loggedUserFName').innerText = userData.firstName;
            document.getElementById('loggedUserLName').innerText = userData.lastName;
            document.getElementById('loggedUserEmail').innerText = userData.email;
        } else {
            // Se o documento não existir, usa os dados do Google Auth
            const fullName = user.displayName;
            const firstName = fullName ? fullName.split(' ')[0] : '';
            const lastName = fullName ? fullName.split(' ').slice(1).join(' ') : '';
            
            document.getElementById('loggedUserFName').innerText = firstName;
            document.getElementById('loggedUserLName').innerText = lastName;
            document.getElementById('loggedUserEmail').innerText = user.email;
            console.log("Usuário logado com o Google. Usando dados do Google Auth.");
        }
    } else {
        // Usuário não logado, redireciona para a página de login
        window.location.href = 'index.html';
    }
});

// Lógica de logout
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erro ao fazer logout:', error);
        });
    });
}