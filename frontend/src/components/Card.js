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

    function handleClickRead() {
        props.onCardRead(props.card);
    }

    React.useEffect(() => {
        if(Object.keys(currentUser).length) {
            setIsOwn(props.card.owner === currentUser._id)
        }
    }, [currentUser, props.card.owner])

    return (
        <div className="card">
        <img className="card__image" src={props.card.link} alt={props.card.title} onClick={handleCardClick} />
        <div className="card__container">
            <div className="card__top">
            <div className="card__like">
                <p className="card__like-score">{props.card.likes.length}</p>
            </div>
            <h2 className="card__title">{props.card.title}</h2>
            </div>
            <div className="card__bottom">
                <div className="card__texts">
                <div className="card__buttons">
                    <button className="card__read-button" onClick={handleClickRead} />
                    <button className={`card__like-button ${isLiked && 'card__like-button_active'}`} type='button' onClick={handleLikeClick}/>
                </div>
                <p className="card__subtitle">{props.card.subtitle}</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Card;