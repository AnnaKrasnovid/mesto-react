import React from 'react';
import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardContext from '../contexts/CardContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const cards = React.useContext(CardContext)

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)    
    .then((newCard) => {
      props.setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  function handleCardDelete(card) {
    api.removeCard(card)
    .then((res) => {//???
      props.setCards((state) => state.filter((c)=> c._id !== card._id))
    })
  }
  
  return (
    <main className="content">
      <section className = "profile">
        <button className = "profile__avatar-button" type ="button" onClick = {props.onEditAvatar}  >
          <img  className = "profile__avatar" src= {currentUser.avatar} alt = "Фотография владельца профиля"  />
        </button>
        <div className = "profile__info">
          <div className = "profile__name-container">
            <h1 className = "profile__name">{currentUser.name}</h1>
            <button className = "profile__edit-button hover-button" type = "button" onClick = {props.onEditProfile}></button>
          </div>
            <p className = "profile__about">{currentUser.about} </p>
        </div>
          <button className = "profile__add-button hover-button" type = "button" onClick={props.onAddPlace}></button>
      </section><section aria-label = "Публикация">
        <ul className = "elements">                  
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick } onCardDelete={handleCardDelete} onCardLike={handleCardLike} />)}
        </ul>
      </section>
    </main>
  )    
}

export default Main;

