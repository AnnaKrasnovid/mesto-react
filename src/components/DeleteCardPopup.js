import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
    <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText={'Да'}
         />
}

export default DeleteCardPopup;
