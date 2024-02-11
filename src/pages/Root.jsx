import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import NavContainer from "../components/NavContainer";
import { useSelector } from "react-redux";

export default function Root() {
    const userId = useSelector(state => state.auth.userId);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            navigate('/quizes');
        } else {
            navigate('/');
        }
    }, [userId])

    return (
        <>
            {!userId && <Header></Header>}
            {userId && <NavContainer></NavContainer>}
            <Outlet></Outlet>
        </>
    );
}