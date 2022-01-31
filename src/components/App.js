import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardContext from '../contexts/CardContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'


function App() {  
  
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData)
      console.log(userData)
      setCards(cards) 
      console.log(cards)  
    })
    .catch(err => {console.log(err)})
  }, [])

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

  function handleUpdateUser(data) {    
    api.setProfileInfo(data)
    .then((data) => {
      setCurrentUser(data)
      console.log(data.name)
      console.log(data.about)
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
    .then((data) => {
      setCurrentUser(data)
      //console.log(data.avatar)
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
    }
  
  return (   
    <CurrentUserContext.Provider value = {currentUser}>
    <CardContext.Provider value = {cards}>
    <div className="page">
      <Header />   
      <Main 
        onEditProfile = {handleEditProfileClick} 
        onAddPlace = {handleAddPlaceClick} 
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        setCards={setCards}
      />      
      <Footer />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}/> 
      
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

      

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>      
    </CardContext.Provider>
  </CurrentUserContext.Provider>    
    )    
    }

export default App;


