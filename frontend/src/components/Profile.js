import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext); 

  return (
    <section className="profile">

      <div className='profile__container'>
        <div className='profile__top'>
          <div className="profile__avatar-elements">
            <img src={currentUser.avatar} className="profile__avatar" alt="Аватар"/>
            <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}></button>
          </div>
        </div>

        <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>редактировать профиль</button>
        </div>

        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </div>

      <div className="profile__menu">
        <button type="button" className='profile__menu-button' onClick={props.handleClickAllButton}>All</button>
        <button type="button" className='profile__menu-button' onClick={props.handleClickMyButton}>My</button>
      </div>

    </section> 
  )
}

export default Profile;