function PopupWithForm(props) {
    return (
        <div className={`popup popup__${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save-button" value={props.submit}>{props.isLoading}</button>
                </form>
                {/* <button type="reset" className="popup__close-button" name="popup__close-button" onClick={props.onClose}></button> */}
            </div>
        </div>
    );
}

export default PopupWithForm;