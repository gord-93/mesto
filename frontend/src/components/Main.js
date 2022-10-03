import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Card from './Card.js';
import FullCard from './FullCard.js';
import Profile from './Profile.js';

function Main(props) {

    return (
        <main className="main">
            <Profile onEditAvatar={props.onEditAvatar} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace}/>
            <Switch>
                <Route exact path="/">
                    <section className="elements">
                        {props.cards.map((card) => {
                        return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardRead={props.onCardRead}/>);
                        })}
                    </section>
                </Route>
                <Route path="/cards/:_id">
                    <FullCard selectedCard={props.selectedCardFull} />
                </Route>
            </Switch>
        </main>
    );
}

export default Main;