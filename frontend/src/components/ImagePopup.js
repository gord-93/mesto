function ImagePopup(props) {
    return (
        <div className={`popup popup__fullscreen ${Object.keys(props.card).length!==0 && `popup_opened`}`}>
                <div className="popup__card-container">
                <img src={props.card.link} alt={`${props.card.name}`} className="popup__image"/>
                <p className="popup__image-title">{props.card.name}</p>
                <button type="reset" className="popup__close-button popup__close-button_fullscreen" onClick={props.onClose}></button>
                </div>
            </div>
    );
}

export default ImagePopup;