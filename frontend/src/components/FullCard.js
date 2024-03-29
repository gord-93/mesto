import React from "react";

function FullCard(props) {
  const [createdAt, setCreatedAt] = React.useState('');
  const createdDate = props.selectedCard.date;
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const dayMilliseconds = 24*60*60*1000;
  const yesterday = date.setTime(date.getTime() - dayMilliseconds);
  const yesterdayDate = date.toLocaleDateString();

  React.useEffect(() => {
    if (createdDate === currentDate) {
      setCreatedAt('Сегодня');
    } else if (createdDate === yesterdayDate) {
      setCreatedAt('Вчера');
    } else {
      setCreatedAt(createdDate);
    }
  }, [createdDate])
  
  return (
    <div className="full-card">
      <div className="full-card__container">
        <img className="full-card__image" src={props.selectedCard.secondLink} alt={props.selectedCard.name} />
        <h2 className="full-card__title">{props.selectedCard.title}</h2>
        <p className="full-card__subtitle">{props.selectedCard.subtitle}</p>
        <div className="full-card__author"><p className="full-card__author-name">{props.selectedCard.author}</p></div>
        <p className="full-card__created-time">{createdAt}</p>
        <p className="full-card__text">{props.selectedCard.text}</p>
      </div>
    </div>
  )
}

export default FullCard;