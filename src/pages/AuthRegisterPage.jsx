import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../store/AuthContentProvider";

const FormB = styled.form`
  max-width: 40rem;
  margin: 5rem auto;
  padding: 2rem;
  background: linear-gradient(180deg, #280a48, #30008a);
  border-radius: 8px;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.5);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  width: 180px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  background-color: #0077cc;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: #005fa3;
  }
`;

export default function AuthRegisterPage() {
  const [newUser, setNewUser] = useState({userName: '', email: '', password: ''});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSetUser(identifier, value) {
    setNewUser((prevUser) => ({...prevUser, [identifier]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    register(newUser.email, newUser.password, newUser.userName);
  };

  const handleNavigateBack = () => {
    navigate('/');
  }

  return (
    <FormB onSubmit={handleSubmit}>
      <h2>Регистрация</h2>

      <div className="control-row">
        <div className="control">
            <label htmlFor="email">Ваше имя</label>
            <input onChange={(event) => handleSetUser('userName', event.target.value)} required id="userName" type="text" />
          </div>
      </div>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Емейл</label>
          <input onChange={(event) => handleSetUser('email', event.target.value)} required id="email" type="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Пароль</label>
          <input onChange={(event) => handleSetUser('password', event.target.value)} required id="password" type="password" />
        </div>
      </div>

      <p className="form-actions">
        <button type="button" onClick={handleNavigateBack} className="button button-flat">Вернуться</button>
        <button className="button" type="submit">Создать пользователя</button>
      </p>
    </FormB>

    // <LoginForm onSubmit={handleSubmit}>
    //     <InputField
    //         ref={nameInput}
    //         type="text"
    //         placeholder="User Name"
    //         required
    //     />
    //     <InputField
    //         ref={emailInput}
    //         type="email"
    //         placeholder="Email"
    //         required
    //     />
    //     <InputField
    //         ref={passwordInput}
    //         type="password"
    //         placeholder="Password"
    //         required
    //     />
    //     <button type="submit">Register</button>
    //     <button onClick={handleNavigateToRegister} type="button">Back to Login</button>
    // </LoginForm>
  );
}