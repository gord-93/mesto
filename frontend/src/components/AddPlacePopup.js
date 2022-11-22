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

    const handleClosePopup = () => {
        setTitle('');
        setSubtitle('');
        setLink('');
        setSecondLink('');
        setText('');
        props.onClose();
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
        <PopupWithForm name="card-form" title="Новое место" button="Создать" isOpen={props.isOpen} onClose={handleClosePopup} onSubmit={handleAddPlaceSubmit} isLoading={props.isLoading ? "Загрузка..." : "Создать"}>

            <p className='popup__input-name'>Название:</p>
            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="" name="popupTextNameCard" 
            required minLength="2" maxLength="30" id="input-name-card" value={title} onChange={handleChangeName}/>
            <span className="popup__input_error" id="input-name-card-error"/>

            <p className='popup__input-name'>Краткое описание:</p>
            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="" name="popupTextSubtitleCard" 
            required minLength="2" maxLength="30" id="input-subtitle-card" value={subtitle} onChange={handleChangeSubtitle}/>
            <span className="popup__input_error" id="input-subtitle-card-error"/>

            <p className='popup__input-name'>Ссылка на изображение обложки статьи:</p>
            <input type="url" className="popup__input popup__link" placeholder="" name="popupLink" 
            id="input-link" required value={link} onChange={handleChangeLink}/>
            <span className="popup__input_error" id="input-link-error"/>

            <p className='popup__input-name'>Ссылка на изображение шапки статьи:</p>
            <input type="url" className="popup__input popup__link" placeholder="" name="popupSecondLink" 
            id="input-secondLink" required value={secondLink} onChange={handleChangeSecondLink}/>
            <span className="popup__input_error" id="input-secondLink-error"/>
            
            <p className='popup__input-name'>Описание:</p>
            <textarea rows="20" cols="10" className="popup__textarea" placeholder='' onChange={handleChangeText} id="textarea-text" name='popupTextCard' value={text} minLength="10" maxLength="5000" required />
            <span className="popup__input_error" id="textarea-text-error"/>

        </PopupWithForm>
    )
}

export default AddPlacePopup;