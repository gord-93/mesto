import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const inputRef = React.createRef(); 
    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }
    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} 
        onSubmit={handleSubmit} isLoading={props.isLoading ? "Сохранение..." : "Сохранить"}>
            
            <p className='popup__input-name'>Ссылка на фотографию:</p>
            <input type="url" className="popup__input popup__link popup__avatar-link" placeholder="" name="popupAvatarLink" 
            id="input-avatar" required ref={inputRef} />
            <span className="popup__input_error" id="input-link-error"></span>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;