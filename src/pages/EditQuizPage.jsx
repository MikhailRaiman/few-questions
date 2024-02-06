import { useContext, useState } from 'react';
import { DataContext } from '../store/DataContextProvider';
import styled from "styled-components";

const FormB = styled.form`
  max-width: 40rem;
  margin: 5rem auto;
  padding: 2rem;
  background: linear-gradient(180deg, #280a48, #30008a);
  border-radius: 8px;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.5);
`;

export default function EditQuizPage() {
    const { selectedQuiz, setSelectedQuiz } = useContext(DataContext);
    const [ newQuestion, setNewQuestion ] = useState({text: '', correctAnswers: 1, answers: []}); 
    const [ newVariants, setNewVariants ] = useState([]); 

    function handleSave(event) {
      event.preventDefault();
      const fb = new FormData(event.target);
      const data = Object.fromEntries(fb.entries());
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

    return (

    <FormB onSubmit={handleSave}>
      <h3>Редактор опроса</h3>

      <div className="control">
        <label htmlFor="name">Имя опроса</label>
        <input onChange={(event) => handleNameChange('name', event.target.value)} id="name" type="text" name="name" value={selectedQuiz.name} style={{width: "90%"}} />
      </div>

      <div className="control-row full-width">
        <div className="control" style={{width: "200px"}}>
          <label htmlFor="type">Тип опроса</label>
          <select id="type" name="type" defaultValue={"quiz"}>
            <option value="quiz">Квиз</option>
            <option value="questionnaire">Анкета</option>
          </select>
        </div>

        <div className="control" style={{width: "200px"}}>
          <label htmlFor="visibility">Видимость</label>
          <select id="visibility" name="visibility" defaultValue={"private"}>
            <option value="private">Только я</option>
            <option value="limited">Список пользователей</option>
            <option value="public">Публичный</option>
          </select>
        </div>

        <div className="control" style={{width: "200px"}}>
          <label htmlFor="state">Состояние</label>
          <select id="state" name="state" defaultValue={"quiz"}>
            <option value="draft">Черновик</option>
            <option value="published">Опубликован</option>
          </select>
        </div>
      </div>

      <div className="control">
        <label htmlFor="question">Вопрос</label>
        <input onChange={(event) => handleQuestionTextChange(event.target.value)} id="question" type="text" name="question" value={newQuestion.text} style={{width: "90%"}} />
      </div>
      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Save
        </button>
      </p>
    </FormB>
  );


        // <div>
        //   <h2>Edit Quiz: {selectedQuiz.name}</h2>
        //   <label>
        //     New Question:
        //     <input
        //       type="text"
        //       value={newQuestion}
        //       onChange={(e) => setNewQuestion(e.target.value)}
        //     />
        //   </label>
        //   <br />
        //   <label>
        //     New Variants:
        //     {newVariants.map((variant, index) => (
        //       <div key={index}>
        //         <input
        //           type="text"
        //           value={variant}
        //           onChange={(e) => {
        //             const updatedVariants = [...newVariants];
        //             updatedVariants[index] = e.target.value;
        //             setNewVariants(updatedVariants);
        //           }}
        //         />
        //         <input
        //           type="radio"
        //           checked={correctAnswerIndex === index}
        //           onChange={() => setCorrectAnswerIndex(index)}
        //         />
        //       </div>
        //     ))}
        //   </label>
        //   <br />
        //   <button onClick={handleSave}>Save Question</button>
        // </div>

}