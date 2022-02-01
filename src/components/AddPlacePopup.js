import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState();
  const [link, setLink] = React.useState();

  function handleChangeTitle(e) {
    setTitle(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={'Создать'}
      onSubmit={handleSubmit} >
      <input
        id="title-input"
        className="popup__input popup__input_info_title"
        type="text"
        name="title"
        placeholder="Название"
        required minLength="3"
        maxLength="30"
        value={title || ''}
        onChange={handleChangeTitle} />
      <span id="title-input-error" className="popup__error"></span>

      <input
        id="link-input"
        className="popup__input popup__input_info_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleChangeLink} />
      <span id="link-input-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
