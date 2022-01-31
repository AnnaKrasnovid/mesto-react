import PopupWithForm from './PopupWithForm'
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();       
        props.onUpdateUser({
            name: name,
            about: description,            
        });
        //console.log(description);
        //console.log(name);
    }

    function handleChangeName(e){
        setName(e.target.value)
        //console.log(name);
    }

    function handleChangeDescription(e){
        setDescription(e.target.value)
        //console.log(description);
    }

    return (<PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}>
        <input
            id="name-input"
            className="popup__input popup__input_info_name"
            type="text"
            name="name"
            placeholder="Имя пользователя"
            required
            minLength="3"
            maxLength="40"
            value={name || ''}
            onChange={handleChangeName} />
        <span id="name-input-error" className="popup__error"></span>

        <input
            id="about-input"
            className="popup__input popup__input_info_about"
            type="text"
            name="about"
            placeholder="О себе"
            required
            minLength="3"
            maxLength="200"
            value={description || ''}
            onChange={handleChangeDescription} />
        <span id="about-input-error" className="popup__error"></span>
    </PopupWithForm>)
}

export default EditProfilePopup;