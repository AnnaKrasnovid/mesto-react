import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardContext from '../contexts/CardContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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
   
    setSelectedCard({name: '', link: ''});
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }  

  function handleUpdateUser(data) {    
    api.setProfileInfo(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => {console.log(err)})
    }

    function handleCardDelete(card) {
      api.removeCard(card)
      .then((res) => {
        setCards((state) => state.filter((c)=>  c._id !== card._id))
      })
    }

    function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(item => item._id === currentUser._id);    
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)    
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } 

    function handleAddPlaceSubmit(newCard) {
      api.setNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])        
        closeAllPopups()
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
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}       
        cards={cards}/>
      <Footer />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}/>

      <AddPlacePopup
       isOpen={isAddPlacePopupOpen} 
       onClose={closeAllPopups}
       onAddPlace={handleAddPlaceSubmit}
      />

      

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>      
    </CardContext.Provider>
  </CurrentUserContext.Provider>    
    )    
    }

export default App;


