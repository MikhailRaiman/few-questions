import { createContext, useState, useEffect, useContext } from "react";
import { app, firestore, collectionData } from './firebase';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authState } from 'rxfire/auth';
import { doc, setDoc, addDoc, query, where, getFirestore, collection, getDoc } from "firebase/firestore";

export const DataContext = createContext({
    quizes: [],
    questions: [],
    selectedQuiz: {name: '', id: ''},
    selectedQuestions: [],
    setSelectedQuiz: () => {},
    setSelectedQuestions: () => {},
    addQuestion: () => {}
});

export const AuthContext = createContext({
    userName: '',
    userId: '',
    setAuthData: () => { },
    authenticate: () => { },
    register: () => { },
    getAuthState: () => { },
    logOut: () => { }
});

export default function DataContextProvider({children}) {
    const auth = getAuth();
    const db = getFirestore(app);
    const [authData, setAuthData] = useState({userName: '', userId: ''});

    const { userId } = useContext(AuthContext);
    const [quizes, setQuizes] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({name: '', id: '', owner: userId});

    const authCtxValue = {
        userName: authData.userName,
        userId: authData.userId,
        setAuthData: setAuthData,
        authenticate: handleAuthenticate,
        register: handleRegister,
        getAuthState: handleGetAuthState,
        logOut: handleLogout
    }

    const ctxValue = {
        quizes: quizes,
        questions: questions,
        selectedQuiz: selectedQuiz,
        selectedQuestions: selectedQuestions,
        setSelectedQuiz: setSelectedQuiz,
        setSelectedQuestions: setSelectedQuestions,
        addQuestion: onAddQuestion
    }

    function onAddQuestion(question) {
        console.log('onAddQuestion: ' + selectedQuiz.id);
        console.log(question);
        try {
            return firestore.collection('questions').add({ ...question, quizId: selectedQuiz.id, owner: authData.userId });
        } catch (error) {
            console.error(error);
        }
    }

    async function handleGetAuthState() {
        authState(auth).subscribe((user) => {
            if (user) {
                getDoc(doc(db, "users", user.uid)).then(res => {
                    const userObj = res.data();
                    setAuthData({userName: userObj.name, userId: user.uid});
                    const quizRef = query(
                        collection(firestore, 'quiz'),where('owner','==',user.uid)
                    );    
                    collectionData(quizRef, { idField: 'id' }).subscribe(quizes => { 
                        setQuizes(quizes);
                    });
        
                    const questionsRef = query(
                        collection(firestore, 'questions'), where('owner','==',user.uid)
                    );   
                    collectionData(questionsRef, { idField: 'id' }).subscribe(questions => { 
                        setQuestions(questions);
                    });
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

    // useEffect(() => {
    //     handleGetAuthState();
    // }, []);

    return (
        <AuthContext.Provider value={authCtxValue}>
            <DataContext.Provider value={ctxValue}>
                {children}
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}