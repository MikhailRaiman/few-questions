import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../store/DataContextProvider";
import { useSelector } from 'react-redux';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormB = styled.form`
  max-width: 40rem;
  margin: 5rem auto;
  padding: 2rem;
  background: linear-gradient(180deg, #280a48, #30008a);
  border-radius: 8px;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.5);
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

export default function AuthLoginPage() {
  const userId = useSelector(state => state.auth.userId);
  const emailInput = useRef();
  const passwordInput = useRef();
  const { authenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userId) {
  //     navigate('/quizes');
  //   }
  // }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate(emailInput.current.value, passwordInput.current.value);
    // .then(res => {
    //     setAuthData({userName: res, appModule: selectedModule});
    //     localStorage.setItem('sequoia_module', selectedModule);
    //     navigate(`/${selectedModule}`);
    // })
    // .catch(err => {
    //     console.log(err);
    // })
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  }

  return (
    <>
      <FormB onSubmit={handleSubmit}>
        <h2>Вход</h2>

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Емейл</label>
            <input required ref={emailInput} id="email" type="email" name="email" />
          </div>

          <div className="control no-margin">
            <label htmlFor="password">Пароль</label>
            <input required ref={passwordInput} id="password" type="password" name="password" />
          </div>
        </div>

        <p className="form-actions">
          <button type="button" onClick={handleNavigateToRegister} className="button button-flat">Регистрация</button>
          <button className="button">Войти</button>
        </p>
      </FormB>

      {/* <LoginForm onSubmit={handleSubmit}>
        <InputField
          ref={emailInput}
          type="email"
          placeholder="Email"
          required
        />
        <InputField
          ref={passwordInput}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button onClick={handleNavigateToRegister} type="button">Register</button>
      </LoginForm> */}
    </>

  );
}