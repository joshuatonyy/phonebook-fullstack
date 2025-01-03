import React from "react";
import './ContactCard.css'

export const ContactCard = ({ name, phone, verified=false, onClickCallback = ()=>{}, onDelete }) => {
  return (
    <div className="contact-card__container" onClick={onClickCallback}>
      <div className="contact-card__card-details">
        <p className="contact-card__full-name">{name}</p>
        <p className="contact-card__phone">{phone}{" "}{verified === false ? "Not Verified" : "Verified"}</p>
      </div>
      <button className="contact-card__delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default ContactCard;
