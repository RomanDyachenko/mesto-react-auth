import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import bin from '../images/bin.png';
import close_icon from '../images/close-icon.png';
import React, {useState} from 'react';
 


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);

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
        setSelectedCard(false);
    }

  return (
<body className="root">
    <Header />
    <div className="page">
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
    </div>
    <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name="edit" title="Редактировать профиль" btn_txt="Сохранить" children={
            <>
                <input className="popup__input popup__input_type_name" placeholder="Имя" id="name" type="text" minlength="2" maxlength="40" required/>
                <span className="popup__span-error" id="error-name"></span>
                <input className="popup__input popup__input_type_employment" placeholder="Профессия" id="employment" type="text" minlength="2" maxlength="200" required/>
                <span className="popup__span-error" id="error-employment"></span>
            </>
        }
    />
    <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name="add" title="Новое место" btn_txt="Сохранить" children={
            <>
                <input className="popup__input popup__input_type_name" id="place" type="text" placeholder="Название" minlength="2" maxlength="30" required/>
                <span className="popup__span-error" id="error-place"></span>
                <input className="popup__input popup__input_type_employment" id="url" type="url" placeholder="Ссылка на картинку" required/>
                <span className="popup__span-error" id="error-url"></span>
            </>
        }
    />            
    <PopupWithForm name="confidence" title="Вы уверены?" btn_txt="Да" type="popup__form_confidence" container_type="popup__container_confidence"/>
    <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name="avatar" title="Обновить аватар" btn_txt="Сохранить" type="popup__form_avatar" btn_type="popup__submit_avatar" container_type="popup__container_avatar" children={
            <>
                <input className="popup__input popup__input_type_employment" id="link" type="url" placeholder="Ссылка на аватар" required/>
                <span className="popup__span-error" id="error-link"></span>
            </>
        }
    />
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />    
    
</body>
  );
}




export default App;
