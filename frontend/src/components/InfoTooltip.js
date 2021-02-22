import successfullyImage from '../images/successfully.svg';
import notSuccessfulImage from '../images/not-successful.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_place_tooltip">
                <img className="popup__status-icon" src={props.isValid ? successfullyImage : notSuccessfulImage} alt="Иконка статуса"></img>
                <p className="popup__title popup__title_place_tooltip">{props.isValid ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! \n Попробуйте еще раз."}</p>
                <button type="reset" className="popup__close-button popup__close-button_place_tooltip" name="popup__close-button" onClick={props.onClose} />
            </div>
        </div>
    );
}

export default InfoTooltip;