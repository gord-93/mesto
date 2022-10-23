import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');
    const [secondLink, setSecondLink] = React.useState('');
    const [subtitle, setSubtitle] = React.useState('');
    const [text, setText] = React.useState('');
    const author = `${currentUser.name}`;
    const createdDate = new Date();
    const date = createdDate.toLocaleDateString();

    const  handleChangeName = (evt) => {
        setTitle(evt.target.value);
    }

    const handleChangeLink = (evt) => {
        setLink(evt.target.value);
    }

    const handleChangeSubtitle = (evt) => {
        setSubtitle(evt.target.value);
    }

    const handleChangeSecondLink = (evt) => {
        setSecondLink(evt.target.value);
    }

    const handleChangeText = (evt) => {
        setText(evt.target.value);
    }

    const handleAddPlaceSubmit = (evt) => {
        evt.preventDefault();

        props.onAddPlace({
            title,
            subtitle,
            author, 
            link,
            secondLink,
            text,
            date,
        })
    }
    React.useEffect(() => {
        if(!props.isLoading) {
            setTitle('');
            setSubtitle('');
            setLink('');
            setSecondLink('');
            setText('');
        }
    }, [props.isLoading]);

    return (
        <PopupWithForm name="card-form" title="Новое место" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit} isLoading={props.isLoading ? "Загрузка..." : "Создать"}>

            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="Название" name="popupTextNameCard" 
            required minLength="2" maxLength="30" id="input-name-card" value={title} onChange={handleChangeName}/>
            <span className="popup__input_error" id="input-name-card-error"/>

            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="Краткое описание" name="popupTextSubtitleCard" 
            required minLength="2" maxLength="30" id="input-subtitle-card" value={subtitle} onChange={handleChangeSubtitle}/>
            <span className="popup__input_error" id="input-subtitle-card-error"/>

            <input type="url" className="popup__input popup__link" placeholder="Ссылка на изображение обложки статьи" name="popupLink" 
            id="input-link" required value={link} onChange={handleChangeLink}/>
            <span className="popup__input_error" id="input-link-error"/>

            <input type="url" className="popup__input popup__link" placeholder="Ссылка на изображение шапки статьи" name="popupSecondLink" 
            id="input-secondLink" required value={secondLink} onChange={handleChangeSecondLink}/>
            <span className="popup__input_error" id="input-secondLink-error"/>
            
            <textarea rows="20" cols="10" className="popup__textarea" placeholder='Описание' onChange={handleChangeText} id="textarea-text" name='popupTextCard' value={text} minLength="10" maxLength="5000" required />
            <span className="popup__input_error" id="textarea-text-error"/>

        </PopupWithForm>
    )
}

export default AddPlacePopup;