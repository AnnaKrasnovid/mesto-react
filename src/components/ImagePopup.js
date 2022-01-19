function ImagePopup(props) {

  const imagePopupClass = `popup popup-photo ` + ( props.card ? "popup_opened" : "");  
  
  return (
    <div className={imagePopupClass}>
      <div className="popup-photo__container">
        <button className="popup__close popup-photo__close hover-button" type="button" onClick={props.onClose}></button>
        <figure className="popup-photo__figure">
          <img className="popup-photo__img" alt={props.card.name} src={props.card.link }/>
          <figcaption className="popup-photo__figcaption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;