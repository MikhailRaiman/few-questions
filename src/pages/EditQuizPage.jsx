import { useContext, useState, useRef } from 'react';
import { AuthContext, DataContext } from '../store/DataContextProvider';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, addVariant, setCorrectAnswerVariant } from "../store/fireFunctions";

const FormB = styled.form`
  max-width: 40rem;
  margin: 5rem auto;
  padding: 2rem;
  background: linear-gradient(180deg, #280a48, #30008a);
  border-radius: 8px;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.5);
`;

export default function EditQuizPage() {
  const selectedQuiz = useSelector(state => state.data.selectedQuiz);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  const variantInput = useRef();
  // const { selectedQuiz, selectedQuestions, setSelectedQuiz, addQuestion } = useContext(DataContext);
  // const { userId } = useContext(AuthContext);
  const [questions, setQuestions] = useState();
  const [newQuestion, setNewQuestion] = useState({ text: '', answers: [] });
  const [newVariant, setNewVariant] = useState('');

  function handleSave(event) {
    event.preventDefault();
    const fb = new FormData(event.target);
    const data = Object.fromEntries(fb.entries());
    data.owner = userId;
    console.log(userId);
    console.log(data);

  }

  function handleNameChange(identifier, value) {
    setSelectedQuiz((prevQuiz) => ({
      ...prevQuiz,
      [identifier]: value
    }))
  }

  function handleQuestionTextChange(value) {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: [...prevQuestion.answers],
      text: value
    }))
  }

  function handleAddVariant(questionId) {
    dispatch(addVariant({ text: newVariant, correct: false }, questionId, selectedQuiz, userId));
    setNewVariant('');
  }

  function handleSetCorrectVariant(variant, questionId) {
    const newVariant = {correct: !variant.correct, text: variant.text};
    console.log(newVariant);
    dispatch(setCorrectAnswerVariant(newVariant, variant.id, questionId, selectedQuiz.id, userId));
  }

  function setCorrectAnswer(answer) {
    const isAnswerCorrect = answer.correct ? false : true;
    setNewQuestion((prevQuestion) => {
      const answers = [...prevQuestion.answers];
      const ans = answers.find(a => a.id === answer.id);
      ans.correct = isAnswerCorrect;
      const newQuestion = {
        ...prevQuestion,
        answers: answers
      }
      return newQuestion;
    })
  }

  function handleAddQuestion() {
    addQuestion(newQuestion, selectedQuiz.id, userId);
  }

  return (

    <FormB onSubmit={handleSave}>
      <h3>Редактор опроса</h3>

      <div className="control">
        <label htmlFor="name">Имя опроса</label>
        <input onChange={(event) => handleNameChange('name', event.target.value)} id="name" type="text" name="name" value={selectedQuiz.name} style={{ width: "90%" }} />
      </div>

      <div className="control-row full-width">
        <div className="control" style={{ width: "200px" }}>
          <label htmlFor="type">Тип опроса</label>
          <select id="type" name="type" defaultValue={"quiz"}>
            <option value="quiz">Квиз</option>
            <option value="questionnaire">Анкета</option>
          </select>
        </div>

        <div className="control" style={{ width: "200px" }}>
          <label htmlFor="visibility">Видимость</label>
          <select id="visibility" name="visibility" defaultValue={"private"}>
            <option value="private">Только я</option>
            <option value="limited">Список пользователей</option>
            <option value="public">Публичный</option>
          </select>
        </div>

        <div className="control" style={{ width: "200px" }}>
          <label htmlFor="state">Состояние</label>
          <select id="state" name="state" defaultValue={"draft"}>
            <option value="draft">Черновик</option>
            <option value="published">Опубликован</option>
          </select>
        </div>
      </div>

      <hr />
      <div className="control-row full-width">
        <div className="control" style={{ width: "100%" }}>
          <label htmlFor="question">Вопрос</label>
          <textarea rows="4" onChange={(event) => handleQuestionTextChange(event.target.value)} id="question" type="text" value={newQuestion.text} style={{ width: "100%" }} />
        </div>

      </div>

      <div className="control-row full-width">
        <div className="control" style={{ width: "100%" }}>
          <label htmlFor="variant">Вариант ответа</label>
          <input value={newVariant} onChange={(event) => setNewVariant(event.target.value)} type="text" id="variant" style={{ width: "100%" }} />
        </div>
      </div>

      {/* <div className="control-row">
        <div className="control">
          <label htmlFor="variant">Вариант</label>
          <input ref={variantInput} type="text" id="variant" />
        </div>

        <div className="control">
          <button onClick={handleAddVariant} type="button" className="button">Добавить вариант</button>
        </div>
      </div> */}

      {/* <fieldset style={{display: newQuestion.answers.length > 0 ? 'block' : 'none'}}>
        <legend>Выберите правильные варианты ответа</legend>

        {newQuestion.answers.map((answer, index) => (
          <div key={answer.id} className="control">
            <input
              type="checkbox"
              name="answer"
              checked={answer.correct}
              value={answer.correct}
              onChange={() => setCorrectAnswer(answer)}
            />
            <label htmlFor="answer">{answer.text}</label>
          </div>
        ))}
      </fieldset> */}

      <hr />

      {/* <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div> */}

      <div className="form-actions">
        <div className="control">
          <button className="button" onClick={handleAddQuestion}>Добавить вопрос</button>
        </div>
        <div className="control">
          <button type="submit" className="button">Save</button>
        </div>

      </div>

      <hr />

      {selectedQuiz.questions && selectedQuiz.questions.length > 0 && selectedQuiz.questions.map(question => (
        <div className='variant' key={question.id}>
          <div className='row-between' >
            <div>{question.text}</div>
            <div className="control">
              <button onClick={() => handleAddVariant(question.id)} type="button" className="button">Добавить вариант</button>
            </div>
          </div>
          {question.variants && question.variants.map((variant) => (
            <div key={variant.id} className="control">
              <input
                type="checkbox"
                name="variant"
                checked={variant.correct}
                onChange={() => handleSetCorrectVariant(variant, question.id)}
              />
              <label htmlFor="variant">{variant.text}</label>
            </div>
          ))}
        </div>
      ))}
    </FormB>

  );
}