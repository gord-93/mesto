import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(!email || !password) {
            return;
        }
        props.handleLogin(email, password);
    }

    return (
        <section className="authorization"> 
            <div className="authorization__container">
                <h2 className="authorization__title">Вход</h2>
                <form className="authorization__form" method="POST" onSubmit={handleSubmit}>
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
                    <button className="authorization__submit-button authorization__submit-button_place_login" type="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;