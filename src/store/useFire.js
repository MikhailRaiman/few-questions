import { app, firestore, collectionData } from './firebase';
import { getFirestore, collection, where, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';

export function useFire() {
    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        const quizRef = query(
            collection(firestore, 'quiz')
        );
    
        collectionData(quizRef, { idField: 'id' }).pipe(
            //tap(quizes => console.log('This is just an observable!'))
        ).subscribe(quizes => { 
            setQuizes(quizes);
        });
    }, []);
    return quizes;
}