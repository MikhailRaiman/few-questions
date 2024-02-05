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

export default function AuthLoginPage() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const { authenticate } = useContext(AuthContext);
    const navigate = useNavigate();

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
        <LoginForm onSubmit={handleSubmit}>
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
        </LoginForm>
    );
}