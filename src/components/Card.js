function Card (props) {
    function handleClick (){
        props.onCardClick(props.card.link);
    }

    return (
    <div className="cards__place" >
    <button type="button" className="cards__delete-button"></button>
    <img src={props.card.link} alt={props.card.name} className="cards__place-img" onClick={handleClick}/>
    <div className="cards__name-container">
        <h2 className="cards__name">
            {props.card.name}
        </h2>
        <div className="cards__like-container">
            <button type="button" className="cards__like-button"/>
            <div className="cards__like-numbers">{props.card.likes.length}</div>
        </div>
    </div>
</div>
)
     
}

export default Card;