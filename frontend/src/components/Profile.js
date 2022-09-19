import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext); 

  return (
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
  )
}

export default Profile;