import { app } from '../store/firebase'; 
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { useContext } from 'react';
import styled from 'styled-components'
import { DataContext } from '../store/DataContextProvider.jsx';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Ul = styled.ul`
    list-style: none;
    background-color: lightgrey;
    max-width: 500px;
`;    

const Li = styled.li`
    padding: 0.5rem;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
`;

const Button = styled.button`
    background-image: linear-gradient(#0dccea, #0d70ea);
    border: 0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .3) 0 5px 15px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: Montserrat,sans-serif;
    font-size: .9em;
    margin: 5px;
    padding: 5px 10px;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
        background-image: linear-gradient(orange, red);
    }
`;

export default function QuizListPage() {
    const { quizes, setSelectedQuiz } = useContext(DataContext);
    const navigate = useNavigate();

    function setSelectionAndNavigate(id, name) {
        setSelectedQuiz({name: name, id: id});
        navigate(`/quiz/${id}/edit`);
    }

    return (
        <Ul>
            {quizes && quizes.length > 0 && quizes.map(qItem => (
                <Li key={qItem.id}>
                    <Link to={`/quiz/${qItem.id}/run`}>{qItem.name}</Link>
                    <span>
                        <Button onClick={() => setSelectionAndNavigate(qItem.id, qItem.name)}>Редактировать</Button>
                        <Button onClick={() => handleDeleteQuiz(qItem.id)}>X</Button>
                    </span>
                </Li>
            ))}
        </Ul>
    );
}