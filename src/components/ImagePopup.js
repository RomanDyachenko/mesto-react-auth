function ImagePopup(props){
    return(
    <div className={`popup popup_type_full-size ${props.card && 'popup_opened'}`} id="popup-full-size">
        <div className="popup__container popup__container_full-size">
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            <img src={props.card} alt="" className="popup__image"/>
            <p className="popup__place-name"></p>
        </div>
        <p className="popup__place-name"></p>
    </div> 
    )
};

export default ImagePopup;