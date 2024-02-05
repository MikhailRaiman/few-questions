import { createContext, useState, useEffect } from "react";
import { collection, query } from 'firebase/firestore';
import { firestore, collectionData } from './firebase';

export const DataContext = createContext({
    quizes: [],
    questions: []
});

export default function DataContextProvider({children}) {
    const [quizes, setQuizes] = useState([]);
    const [questions, setQuestions] = useState([]);

    const ctxValue = {
        quizes: quizes,
        questions: questions
    }

    useEffect(() => {
        try {
            const quizRef = query(
                collection(firestore, 'quiz')
            );    
            collectionData(quizRef, { idField: 'id' }).subscribe(quizes => { 
                setQuizes(quizes);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <DataContext.Provider value={ctxValue}>
            {children}
        </DataContext.Provider>
    );
}