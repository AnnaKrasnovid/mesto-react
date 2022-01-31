import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {   
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault(); 

        props.onUpdateAvatar({
          avatar : avatarRef.current.value
        });
    } 

      return (
        <PopupWithForm 
        name='profile-update' 
        title='Обновить аватар' 
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}>
          <input
            id="avatar-input"
            className="popup__input popup__input_info_avatar"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required 
            ref={avatarRef}
            /*onChange={handleChangeAvatar}*/  />
          <span id="avatar-input-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
