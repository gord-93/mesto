import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [secondLink, setSecondLink] = React.useState('');
    const [subtitle, setSubtitle] = React.useState('');

    const  handleChangeName = (evt) => {
        setName(evt.target.value);
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

    const handleAddPlaceSubmit = (evt) => {
        evt.preventDefault();

        props.onAddPlace({
            name,
            subtitle,
            link,
            secondLink
        })
    }
    React.useEffect(() => {
        if(!props.isLoading) {
            setName('');
            setSubtitle('');
            setLink('');
        }
    }, [props.isLoading]);

    return (
        <PopupWithForm name="card-form" title="Новое место" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit} isLoading={props.isLoading ? "Загрузка..." : "Создать"}>

            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="Название" name="popupTextNameCard" 
            required minLength="2" maxLength="30" id="input-name-card" value={name} onChange={handleChangeName}/>
            <span className="popup__input_error" id="input-name-card-error"></span>

            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="Краткое описание" name="popupTextSubtitleCard" 
            required minLength="2" maxLength="30" id="input-subtitle-card" value={subtitle} onChange={handleChangeSubtitle}/>
            <span className="popup__input_error" id="input-subtitle-card-error"></span>

            <input type="url" className="popup__input popup__link" placeholder="Ссылка на изображение обложки статьи" name="popupLink" 
            id="input-link" required value={link} onChange={handleChangeLink}/>
            <span className="popup__input_error" id="input-link-error"></span>

            <input type="url" className="popup__input popup__link" placeholder="Ссылка на изображение шапки статьи" name="popupSecondLink" 
            id="input-secondLink" required value={secondLink} onChange={handleChangeSecondLink}/>
            <span className="popup__input_error" id="input-secondLink-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;