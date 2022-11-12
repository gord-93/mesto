import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { WINDOW_WIDTH } from '../utils/constants.js';
import Card from './Card.js';
import FullCard from './FullCard.js';
import Profile from './Profile.js';

function Main(props) {
    const [sliceNum, setSliceNum] = React.useState(0);
    const [addCards, setAddCards] = React.useState(0);

    React.useEffect(() => {
        if (WINDOW_WIDTH.LARGE) {
            setSliceNum(12);
            setAddCards(3);
        } else
        if (WINDOW_WIDTH.MEDIUM) {
            setSliceNum(8);
            setAddCards(2)
        } else
        if (WINDOW_WIDTH.SMALL) {
            setSliceNum(5);
            setAddCards(2);
        }
    }, [])

    window.onresize = () => {
        if (WINDOW_WIDTH.LARGE) {
            setAddCards(3)
        } else {
            setAddCards(2);
        }
    }


    return (
        <main className="main">
            <Profile onEditAvatar={props.onEditAvatar} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace}/>
            <Switch>
                <Route exact path="/">
                    <section className="elements">
                        {props.cards.length === 0 ? 
                        <>
                            <h1 className='elements__error'>
                                <span className='elements__span'>Скоро</span>
                                <span className='elements__span'>тут</span>
                                <span className='elements__span'>будут</span>
                                <span className='elements__span'>статьи</span>
                                <span className='elements__span'>...</span>
                            </h1>
                        </>
                        :
                        <>
                        {props.cards.slice(0, sliceNum).map((card) => {
                        return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardRead={props.onCardRead}/>);
                        })}
                        <button className='elements__add-card-button' disabled={sliceNum >= props.cards.length} onClick={() => {
                            setSliceNum(sliceNum + addCards);
                        }} />
                        </>
                        }
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