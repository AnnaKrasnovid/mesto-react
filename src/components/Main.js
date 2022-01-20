import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  /*React.useEffect(() => {
    api.getProfileInfo()
    .then((data) => {
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
    })
    .catch(err => {console.log(err)})
    
    api.getInitialCards()
    .then((data) => {
      setCards(data)   
    })
    .catch(err => {console.log(err)})
  }, []);*/

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setUserName(userData.name)
      setUserDescription(userData.about)
      setUserAvatar(userData.avatar)
      setCards(cards)
    })
    .catch(err => {console.log(err)})
  }, [])

  
  return (
    <main className="content">
      <section className = "profile">
        <button className = "profile__avatar-button" type ="button" onClick = {props.onEditAvatar}  >
          <img  className = "profile__avatar" src={userAvatar} alt = "Фотография владельца профиля"  />
        </button>
        <div className = "profile__info">
          <div className = "profile__name-container">
            <h1 className = "profile__name">{userName}</h1>
            <button className = "profile__edit-button hover-button" type = "button" onClick = {props.onEditProfile}></button>
          </div>
            <p className = "profile__about">{userDescription} </p>
        </div>
          <button className = "profile__add-button hover-button" type = "button" onClick={props.onAddPlace}></button>
      </section><section aria-label = "Публикация">
        <ul className = "elements">
          {cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick} />)}            
        </ul>
      </section>
    </main>
  )    
}

export default Main;

