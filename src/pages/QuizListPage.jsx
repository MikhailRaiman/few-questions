import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddQuiz from '../components/AddQuiz.jsx';
import { useSelector } from 'react-redux';
import { deleteQuiz } from "../store/fireFunctions.js";
import { useDispatch } from 'react-redux';
import { dataActions } from '../store/data-slice.js'

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
    const quizes = useSelector(state => state.data.quizes);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function setSelectionAndNavigate(quiz) {
        dispatch(dataActions.setSelectedQuiz(quiz.id));
        navigate(`/quiz/${quiz.id}/edit`);
    }

    function handleDeleteQuiz(quizId) {
        deleteQuiz(quizId, userId);
    } 

    return (
        <>
            <AddQuiz></AddQuiz>
            <Ul>
                {quizes && quizes.length > 0 && quizes.map(qItem => (
                    <Li key={qItem.id}>
                        <Link to={`/quiz/${qItem.id}/run`}>{qItem.name}</Link>
                        <span>
                            <Button onClick={() => setSelectionAndNavigate(qItem)}>Редактировать</Button>
                            <Button onClick={() => handleDeleteQuiz(qItem.id)}>X</Button>
                        </span>
                    </Li>
                ))}
            </Ul>
        </>

    );
}