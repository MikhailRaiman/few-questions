import { Outlet } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from "../store/AuthContentProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import NavContainer from "../components/NavContainer";

export default function Root() {
    const { userName, getAuthState, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthState();
        if (userName) {
            navigate('/quizes');
        } else {
            navigate('/');
        }
        console.log(userName);
    }, [userName])

    return (
        <>
            {!userName && <Header></Header>}
            {userName && <NavContainer></NavContainer>}

            {/* <nav>
                <ul>
                    <li><Link to="/quizes">My Quizes</Link></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Контакты</a></li>
                </ul>
            </nav>
            <button onClick={logOut}>Logout</button> */}
            <Outlet></Outlet>
        </>
    );
}