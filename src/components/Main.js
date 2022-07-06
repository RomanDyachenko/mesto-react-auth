import kusto from '../images/kusto.jpg';
import newApi from '../utils/Api.js';
import Card from './Card';
import React, {useState, useEffect} from 'react';

function Main (props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        newApi.getUserInfo('users/me')
        .then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        })
        
    }, []);

    React.useEffect(() => {
        newApi.getCardsInfo('cards')
        .then((res) => {
            setCards(res);
        })
    }, []);

    
    return (
    <main>
        <section className="profile">
            <div className="profile__info">
                <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}>
                    <div className="profile__avatar-container">
                        <img src={`${userAvatar}`} alt={userName} className="profile__avatar"/>
                    </div>
                </button>
                <div className="profile__info-container"> 
                    <h1 id="profileName" className="profile__name">{userName}</h1>
                    <p id="profileEmployment" className="profile__employment">{userDescription}</p>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div> 
            </div>
            <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>
        <section className="cards">
            {cards.map((item) => {
               return <Card card={item} onCardClick={props.onCardClick} key={item._id}/>
            })}
        </section>
    </main>
    )
};


export default Main;