import styled from "styled-components";
import MenuButton from "./MenuButton";
import { useState, useContext } from 'react';
import { AuthContext } from "../store/AuthContentProvider";
import { useNavigate } from "react-router-dom";


const Nav = styled.nav`
    background: radial-gradient(#280a48, #20043d);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Menu = styled.menu`
    margin: 0.8rem 0 0.3rem 0;
    padding: 0;
    display: flex;
    gap: 0.5rem;
    list-style: none;
`;

export default function NavContainer() {
    const [mode, setMode] = useState('my');
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSetMode(mode) {
        setMode(mode);
        navigate('/quizes');
    }

    return (
        <Nav>
            <Menu>
                <MenuButton onClick={() => handleSetMode('my')} isSelected={mode === 'my'}>Мои опросы</MenuButton>
                <MenuButton onClick={() => handleSetMode('all')} isSelected={mode === 'all'}>Все опросы</MenuButton>
            </Menu>
            <MenuButton onClick={logOut}>Выход</MenuButton>
        </Nav>
    );
}