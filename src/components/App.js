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
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);

  const [cardDelete, setCardDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]); 
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData)
        console.log(userData)
        setCards(cards)
        console.log(cards)
      })
      .catch(err => { console.log(err) })
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

  function handleDeleteCardClick(card) {
    setCardDelete(card)
    setDeleteCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(data) {
    setIsLoading(true)//
    api.setProfileInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch(err => { console.log(err) })
      .finally(()=> {
        setIsLoading(false)//
      })     
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
      .finally(()=> {
        setIsLoading(false)//
      })
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api.removeCard(cardDelete)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id))
        closeAllPopups()
      })
  }

  function handleCardLike(card) {    
    const isLiked = card.likes.some(item => item._id === currentUser._id);
   
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true)
    api.setNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
      .finally(()=> {
        setIsLoading(false)//
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>

        <div className="page">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardDelete={handleDeleteCardClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards} />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} 
            isLoadingData= {isLoading}/>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} 
            isLoadingData= {isLoading} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} 
            isLoadingData= {isLoading}/>

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App;
