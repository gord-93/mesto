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
        <div className="card">
        <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
        <div className="card__container">
            <div className="card__top">
            <div className="card__like">
                <p className="card__like-score">{props.card.likes.length}</p>
            </div>
            <p className="card__title">{props.card.name}</p>
            </div>
            <div className="card__bottom">
                <div className="card__texts">
                <div className="card__buttons">
                    <button className="card__read-button" />
                    <button className={`card__like-button ${isLiked && 'card__like-button_active'}`} type='button' onClick={handleLikeClick}/>
                </div>
                <p className="card__subtitle">Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore 
                cupiditate ex dolorum hic iste amet, assumenda perspiciatis temporibus repudiandae, 
                libero vero quia voluptates aliquam sed ratione debitis totam maxime.</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Card;