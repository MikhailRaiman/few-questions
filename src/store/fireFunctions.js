import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { database } from './firebase';
import { authState } from 'rxfire/auth';
import { authActions } from "./auth-slice";

const auth = getAuth();

export function register(userData) {
    return async (dispatch) => {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        await database.ref('users/' + userCredential.user.uid).set({ ...userData, id: userCredential.user.uid }).then(() => {
            dispatch(authActions.setAuth({userId: userCredential.user.uid, userName: userData.name}));
        });
    }
}

export function checkAuth() {
    return async (dispatch) => {
        authState(auth).subscribe((user) => {
            if (user) {
                const userRef = database.ref('users/' + user.uid);
                userRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    dispatch(authActions.setAuth({userId: data.id, userName: data.name}));
                });
            }
        })
    }
}

export function logout() {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(authActions.setAuth({userId: "", userName: ""}));
    }
}
