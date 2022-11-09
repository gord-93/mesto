import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
    
        props.onUpdateUser({
            name,
            about: description
        });
    }

    React.useEffect(() => {
        if(Object.keys(currentUser).length) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);

    return (
        <PopupWithForm name="profile-edit" title="Редактировать профиль" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading ? "Загрузка..." : "Сохранить"}>
                <input type="text" className="popup__input popup__text-name" placeholder="Имя" name="popupTextName" required minLength="2" maxLength="40" id="input-name" 
                value={name} onChange={handleChangeName}/>
                <span className="popup__input_error" id="input-name-error"></span>
                <input type="text" className="popup__input popup__text-about" placeholder="О себе" name="popupTextAbout" required minLength="2" maxLength="100"
                id="input-about" value={description} onChange={handleChangeDescription}/>
                <span className="popup__input_error" id="input-about-error"></span>
            </PopupWithForm>
    );
}

export default EditProfilePopup;