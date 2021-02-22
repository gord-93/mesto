import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const  handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeLink = (evt) => {
        setLink(evt.target.value);
    }

    const handleAddPlaceSubmit = (evt) => {
        evt.preventDefault();

        props.onAddPlace({
            name,
            link
        })
    }
    React.useEffect(() => {
        if(!props.isLoading) {
            setName('');
            setLink('');
        }
    }, [props.isLoading]);

    return (
        <PopupWithForm name="card-form" title="Новое место" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit} isLoading={props.isLoading ? "Загрузка..." : "Создать"}>
            <input type="text" className="popup__input popup__text-name popup__text-name_card" placeholder="Название" name="popupTextNameCard" 
            required minLength="2" maxLength="30" id="input-name-card" value={name} onChange={handleChangeName}/>
            <span className="popup__input_error" id="input-name-card-error"></span>
            <input type="url" className="popup__input popup__link" placeholder="Ссылка на картинку" name="popupLink" 
            id="input-link" required value={link} onChange={handleChangeLink}/>
            <span className="popup__input_error" id="input-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;