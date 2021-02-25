import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [isOwn, setIsOwn] = React.useState(false);

    const isLiked = props.card.likes.some(owner => owner === currentUser._id);

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    React.useEffect(() => {
        if(Object.keys(currentUser).length) {
            setIsOwn(props.card.owner === currentUser._id)
        }
    }, [currentUser, props.card.owner])

    return (
        <div className="elements__element">
            <img src={props.card.link} alt={props.card.name} className="elements__image" onClick={handleCardClick}/>
            {isOwn && <button type="reset" className="elements__reset-button" onClick={handleDeleteClick}></button>}
            <div className="elements__about">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like-elements">
                    <button type="button" className={`elements__like-button ${isLiked && `elements__like-button_active`}`} onClick={handleLikeClick}></button>
                    <p className="elements__like-scorer">{props.card.likes.length}</p>
                </div>
            </div>
            </div>
    );
}

export default Card;