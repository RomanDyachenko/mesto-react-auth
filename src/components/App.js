import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import bin from '../images/bin.png';
import close_icon from '../images/close-icon.png';
import newApi from '../utils/Api.js'
import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        newApi.changeLikeCardStatus(`cards/${card._id}/likes`, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
    }
    
    function handleCardDelete(card){

        newApi.deleteCard(`cards/${card._id}`)
        .then(() => {
            setCards((state) => state.map((c) => c._id === card._id ? state.splice(state.indexOf(c), 1) : c));
        }
        )


    }


    React.useEffect(() => {
        newApi.getCardsInfo('cards')
        .then((res) => {
            setCards(res);
        })
    }, []);

    React.useEffect(() => {
        newApi.getUserInfo('users/me')
            .then((res) => {
                setCurrentUser(res);
            })
    }, [])

    function handleEditProfileClick (){
        setEditProfilePopupOpen(true);
    }
    
    
    function handleEditAvatarClick (){
        setEditAvatarPopupOpen(true);
    }
    
    
    function handleAddPlaceClick(){
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(elem){
        setSelectedCard(elem);
    }

    function closeAllPopups(){
        setEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser (obj){
        newApi.patchNewInfo('users/me', obj)
        .then(
            (res) => {setCurrentUser(res);
                closeAllPopups();
            }
            
        )
    }

    function handleUpdateAvatar (obj){
        newApi.changeAvatar('users/me/avatar', obj)
        .then(
            (res) => {
                setCurrentUser(res);
                closeAllPopups();
            }
        )
    }

    function handleUpdateCards (obj){
        newApi.postNewCard('cards', obj)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
    }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <Header />
    <div className="page">
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
    </div>
    <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups}/>
    <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} />
    <AddPlacePopup onUpdateCards={handleUpdateCards} isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} />            
    <PopupWithForm name="confidence" title="Вы уверены?" btn_txt="Да" type="popup__form_confidence" container_type="popup__container_confidence"/>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>    
    </>
  );
}




export default App;
