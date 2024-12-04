import React, { useEffect, useState } from "react";
import "./ContactForm.css";
import AppleTextfield from "../../../components/AppleTextfield/AppleTextfield";

export const ContactForm = ({ isNew, onClose, onSubmit, selectedContact }) => {
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   setNameValue(selectedContact.contact_name || "");
  //   setPhoneValue(selectedContact.contact_phone_number || "");
  // }, [selectedContact]);

  const handleSubmit = () => {
    try {
      if (!nameValue.trim() || !phoneValue.trim()) {
        setErrorMessage("Both fields are required.");
        return;
      }
      if (!/^\d{10,12}$/.test(phoneValue)) {
        setErrorMessage("Phone number must be number only 10 - 12 digits.");
        return;
      }

      onSubmit(
        { contact_name: nameValue, contact_phone_number: phoneValue },
      );

      setNameValue("");
      setPhoneValue("");
      setErrorMessage("");

      onClose();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Error creating contact");
    }
  };

  return (
    <div className="contactform__overlay">
      <div className="contactform__container">
        <div className="contactform__header">
          <p className="contactform__header-title">Contact Form</p>
          <button
            className="contactform__header-close-button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="contactform__entries">
          {/* Error Message */}
          {errorMessage && <p className="contactform__error">{errorMessage}</p>}

          {/* NAME */}
          <AppleTextfield
            id="contact-name"
            label="Name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            // initialValue={selectedContact.name}
            required
          />
          {/* PHONE NUMBER */}
          <AppleTextfield
            id="contact-phone-number"
            label="Phone Number"
            type="tel"
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            // initialValue={selectedContact.phone_number}
            required
          />
        </div>

        <div className="contactform__submit-container">
          <div className="contactform__submit-button" onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
