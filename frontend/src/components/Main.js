import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext); 

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-elements">
                <img src={currentUser.avatar} className="profile__avatar" alt="Аватар"/>
                <div className="profile__edit-avatar">
                    <button type="button" className="profile__edit-icon" onClick={props.onEditAvatar}></button>
                </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section> 
            <section className="elements">
                {props.cards.map((card) => {
                    return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>);
                }).reverse()}
            </section>
        </main>
    );
}

export default Main;