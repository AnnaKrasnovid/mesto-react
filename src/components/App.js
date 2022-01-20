import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {  
  
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }  
  
  return (    
    <>
    <div className="page">
      <Header />   
      <Main 
        onEditProfile = {handleEditProfileClick} 
        onAddPlace = {handleAddPlaceClick} 
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />      
      <Footer />
      <PopupWithForm 
        name='edit' 
        title='Редактировать профиль' 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={'Сохранить'}>        
        <input
          id="name-input"
          className="popup__input popup__input_info_name"
          type="text"
          name="name"
          placeholder="Имя пользователя"
          required
          minLength="3"
          maxLength="40" />
        <span id="name-input-error" className="popup__error"></span>

        <input
          id="about-input"
          className="popup__input popup__input_info_about"
          type="text"
          name="about"
          placeholder="О себе"
          required
          minLength="3"
          maxLength="200" />
        <span id="about-input-error" className="popup__error"></span>        
      </PopupWithForm>
      
      <PopupWithForm 
        name='add' 
        title='Новое место' 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
        buttonText={'Создать'}>        
          <input
            id="title-input"
            className="popup__input popup__input_info_title"
            type="text"
            name="title"
            placeholder="Название"
            required minLength="3"
            maxLength="30" />
          <span id="title-input-error" className="popup__error"></span>

          <input
            id="link-input"
            className="popup__input popup__input_info_link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required />
          <span id="link-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm 
        name='profile-update' 
        title='Обновить аватар' 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={'Сохранить'}>
          <input
            id="avatar-input"
            className="popup__input popup__input_info_avatar"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required />
          <span id="avatar-input-error" className="popup__error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>      
  </>      
    )}

export default App;


