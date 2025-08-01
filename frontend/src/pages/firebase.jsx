
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyBUA3GGY-uGTJfBtqwSMaMh42HrvwNOc6w",
    authDomain: "tour-app-823cf.firebaseapp.com",
    projectId: "tour-app-823cf",
    storageBucket: "tour-app-823cf.firebasestorage.app",
    messagingSenderId: "199504762798",
    appId: "1:199504762798:web:68465fc3ccf8a19fb35a3f"
  
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
