function PopupWithForm (props) {
  //const popupClass = `popup popup_type_${props.name} ` + (props.isOpen ? "popup_opened" : "") ; 
  //`popup popup-photo ${props.card ? "popup_opened" : ""}`

  const popupClass = `popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`

  return (
    <div className={popupClass}>
      <div className="popup__content">
        <button className="popup__close hover-button" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`form-${props.name}`}>
          {props.children}
          <button className="popup__button" type="submit">{props.buttonText}</button>        
        </form>
      </div>
    </div> 
  )
}

export default PopupWithForm;