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

                    <p className='authorization__race-text'>Выберите фракцию :</p>
                    <div className='authorization__select'>
                        <img className='authorization__option' src="https://bbts1.azureedge.net/images/p/full/2022/06/37387928-7bf7-4ae6-ad46-9ae45285b6a3.jpg" alt="Ork" />
                        <img className='authorization__option' src="https://i.pinimg.com/originals/b0/df/7f/b0df7f8bdb4a7df0c3df9bab4a07a755.jpg" alt="Human" />
                        <img className='authorization__option' src="https://i.pinimg.com/originals/29/ff/c4/29ffc4218d4298b02bd793181dd5f1da.jpg" alt="Elf" />
                        <img className='authorization__option' src="https://www.belloflostsouls.net/wp-content/uploads/2014/10/2000x2757_4041_Dwarf_slayer_for_warhammer_online_2d_fantasy_dwarf_warrior_picture_image_digital_art-e1503528072772.jpg" alt="Dwarf" />
                    </div>

                    {/* <select className='authorization__select'>
                        <option disabled>Выберите фракцию</option>
                        <option className='authorization__option'>Люди</option>
                        <option className='authorization__option'>Орки</option>
                        <option className='authorization__option'>Эльфы</option>
                        <option className='authorization__option'>Дворфы</option>
                    </select> */}

                    <button className="authorization__submit-button" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
                </form>
                <NavLink className="authorization__enter" to="/sign-in">Уже зарегистрированы? <span className='authorization__enter authorization__enter_colored'>Войти</span></NavLink>
            </div>
        </section>
    )
}

export default Register;