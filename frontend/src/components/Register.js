import React from 'react';
import { NavLink } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleRegister(email, password)
    }

    return(
        <section className="authorization">
            <div className="authorization__container">
                <h2 className="authorization__title">Регистрация</h2>
                <form className="authorization__form" noValidate>
                    <input className="authorization__input" 
                    id="authorization-email" 
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Email" 
                    required 
                    minLength="2" 
                    maxLength="30" 
                    pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
                    <input className="authorization__input" 
                    id="authorization-password" 
                    type="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    placeholder="Пароль" 
                    required 
                    minLength="2" 
                    maxLength="30" />
                    <button className="authorization__submit-button" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
                </form>
                <NavLink className="authorization__enter" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
            </div>
        </section>
    )
}

export default Register;