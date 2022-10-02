import React from "react";

function FullCard(props) {

  return (
    <div className="full-card">
      <div className="full-card__container">
        <img className="full-card__image" src={props.selectedCard.secondLink} alt={props.selectedCard.name} />
        <h2 className="full-card__title">{props.selectedCard.name}</h2>
        <p className="full-card__subtitle">{props.selectedCard.subtitle}</p>
        <p className="full-card__created-time">Дата публикации: {props.selectedCard.createdAt}</p>
        <p className="full-card__owner">{props.selectedCard.author}</p>
        <p className="full-card__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <br></br>
        Labore voluptas odio laboriosam veniam quo accusantium, omnis ea praesentium quam assumenda voluptatum id, 
        nostrum repellat! Consectetur consequuntur nemo nulla placeat numquam.</p>
      </div>
    </div>
  )
}

export default FullCard;