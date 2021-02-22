import React from 'react';
import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';


function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Место Россия" className="logo logo_place_header"/>
            {
                props.loggedIn ? 
                    <div className="header__login-container">
                        <p className="header__login">{props.email}</p>
                        <NavLink className="header__link" to="/sign-in" onClick={props.handleLogout}>Выйти</NavLink>
                    </div> : 
                    <div className="header__login-container header__login-container_place_sign">
                        <NavLink className="header__link" to={`${props.registerOpen ? "/sign-in" : "/sign-up"}`} onClick={props.handleRegisterOpen}>
                            {props.registerOpen ? "Войти" : "Регистрация"}</NavLink>
                    </div>
            }
            {
                props.loggedIn && (props.burger ?
                    <button className="header__close-burger" type="button" onClick={props.burgerClick}></button> :
                    <button className="header__burger" type="button" onClick={props.burgerClick}></button>)
            }
        </header>
    );
}

export default Header;