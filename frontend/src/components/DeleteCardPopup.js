import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
    
    const handleCardDelete = (evt) => {
        evt.preventDefault();
        props.onCardDelete(props.card);
    }

    return(
        <PopupWithForm name="delete-card" title="Вы уверены?" button="Да" isLoading={props.isLoading ? "Удаление..." : "Да"} 
        isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleCardDelete} onCLick={props.onClick}></PopupWithForm>
    );
}

export default DeleteCardPopup;