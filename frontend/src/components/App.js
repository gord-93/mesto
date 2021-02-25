import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup';
import * as auth from '../utils/auth';
import Register from '../components/Register';
import InfoTooltip from '../components/InfoTooltip';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import BurgerTool from './BurgerTool.js';


function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({});
    const [cardToDelete, setCardToDelete] = React.useState({});
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);
    const [registerValid, setRegisterValid] = React.useState(false);
    const [enterEmail, setEnterEmail] = React.useState('');
    const [infoPopupOpen, setInfoPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [burger, setBurger] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('jwt');
            if (token) {
                api.getUserAttribute()
                    .then((user) => {
                        setIsLoggedIn(true);
                        setCurrentUser(user.user);
                        setEnterEmail(user.email);
                        history.push('/');
                    })
                    .catch((err) => console.log(err))
            }
    }, [history])

    React.useEffect(() => {
        if (isLoggedIn) {
        api.getInitialCards()
        .then((cards) => setCards(cards.reverse()))
        .catch((err) => console.log(err));
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        const handleOverlayClose = (evt) => {
            if (evt.target.classList.contains('popup')) {
                closeAllPopups();
            }
        }
        document.addEventListener('click', handleOverlayClose);
        return () => {
            document.removeEventListener('click', handleOverlayClose);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRegister = (email, password) => {
        auth.register(email, password)
            .then((res) => {
                if (res) {
                    setInfoPopupOpen(true);
                    setRegisterValid(true);
                    setRegisterOpen(false);
                    history.push('/sign-in');
                } else {
                    setInfoPopupOpen(true);
                    setRegisterValid(false);
                }
            })
            .catch((err) => {
                setInfoPopupOpen(true);
                setRegisterValid(false);
                console.log(err);
            });
    }

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((res) => {
                if(res.token) {
                    localStorage.getItem('jwt', res.token);
                }
                setIsLoggedIn(true);
                setEnterEmail(email);
                history.push('/');
            })
            .catch((err) => console.log(err));
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRegisterOpen(false);
        setBurger(false);
        localStorage.removeItem('jwt');
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    const handleDeleteCardClick = (card) => {
        setDeleteCardPopupOpen(true);
        setCardToDelete(card);
        document.addEventListener('keydown', handleEscClose);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        document.addEventListener('keydown', handleEscClose);
    }

    const handleRegisterOpen = () => {
        setRegisterOpen(!registerOpen);
    }

    const handleBurgerOpen = () => {
        setBurger(!burger);
    }

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
        setDeleteCardPopupOpen(false);
        setInfoPopupOpen(false)
        document.removeEventListener('keydown', handleEscClose);
    }

    const handleUpdateUser = (user) => {
        setIsLoading(true);
        api.setUserAttribute(user)
        .then((newUser) => {
            setCurrentUser(newUser);
            closeAllPopups();
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((userId) => userId._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard);
            setCards(newCards);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleCardDelete = (card) => {
        setIsLoading(true);
        api.removeCard(card._id)
        .then(() => {
            const newCards = cards.filter((currentCard) => currentCard._id !== card._id);
            setCards(newCards);
            setIsLoading(false);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsLoading(true);
        api.changeAvatar(avatar) 
        .then((newUserAvatar) => {
            setCurrentUser(newUserAvatar);
            setIsLoading(false);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
            closeAllPopups();
        });
    }

    const handleAddPlace = (card) => {
        setIsLoading(true);
        api.addCard(card)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            setIsLoading(false);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
            closeAllPopups();
        });
    }

    const handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            closeAllPopups();
            }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page" >
            {burger && <BurgerTool email={enterEmail} handleLogout={handleLogout} />}
            <Header burgerClick={handleBurgerOpen} burger={burger} 
            registerOpen={registerOpen} handleRegisterOpen={handleRegisterOpen} handleLogout={handleLogout} 
            loggedIn={isLoggedIn} email={enterEmail} />
            <Switch>
                <Route exact path="/sign-up">
                    <Register handleRegisterOpen={handleRegisterOpen} handleRegister={handleRegister} />
                </Route>
                <Route exact path="/sign-in">
                    <Login handleLogin={handleLogin} />
                </Route>
                <ProtectedRoute path="/" component={Main} 
                loggedIn={isLoggedIn} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                cards = {cards} />
            </Switch>
            <Footer />
            <InfoTooltip isOpen={infoPopupOpen} isValid={registerValid} onClose={closeAllPopups} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} isLoading={isLoading}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} 
            card={cardToDelete} isLoading={isLoading}/>
    </div>
    </CurrentUserContext.Provider>
    );
}

export default App;