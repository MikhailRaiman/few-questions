import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../store/AuthContentProvider";

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
    const emailInput = useRef();
    const nameInput = useRef();
    const passwordInput = useRef();
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        register(emailInput.current.value, passwordInput.current.value, nameInput.current.value);
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
        navigate('/');
    }

    return (
        <LoginForm onSubmit={handleSubmit}>
            <InputField
                ref={nameInput}
                type="text"
                placeholder="User Name"
                required
            />
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
            <button type="submit">Register</button>
            <button onClick={handleNavigateToRegister} type="button">Back to Login</button>
        </LoginForm>
    );
}