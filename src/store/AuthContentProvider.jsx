import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authState } from 'rxfire/auth';
import { doc, setDoc, addDoc, getFirestore, collection, getDoc } from "firebase/firestore";
import { app } from './firebase';

export const AuthContext = createContext({
    userName: '',
    userId: '',
    setAuthData: () => { },
    authenticate: () => { },
    register: () => { },
    getAuthState: () => { },
    logOut: () => { }
});

export default function AuthContextProvider({children}) {
    const auth = getAuth();
    const db = getFirestore(app);
    const [authData, setAuthData] = useState({userName: '', userId: ''});

    const ctxValue = {
        userName: authData.userName,
        userId: authData.userId,
        setAuthData: setAuthData,
        authenticate: handleAuthenticate,
        register: handleRegister,
        getAuthState: handleGetAuthState,
        logOut: handleLogout
    }

    async function handleGetAuthState() {
        authState(auth).subscribe((user) => {
            if (user) {
                getDoc(doc(db, "users", user.uid)).then(res => {
                    const userObj = res.data();
                    setAuthData({userName: userObj.name, userId: user.uid});
                });
            }
        })
    }

    function handleLogout() {
        signOut(auth).then(() => {
            console.log('signed out')
            setAuthData({userName: '', userId: ''});
          });
    }

    function handleAuthenticate(email, password) {
        signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
            const user = docSnap.data();
            console.log(user);
            setAuthData({userName: user.name, userId: userCredential.user.uid});
        });
    }
    
    function handleRegister(email, password, name) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setDoc(doc(db, "users", user.uid), {
                    name: name
                  }).then(res => {
                    setAuthData({userName: name, userId: user.uid});
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    );
}