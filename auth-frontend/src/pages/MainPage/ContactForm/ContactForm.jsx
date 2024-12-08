import React, { useEffect, useState } from "react";
import "./ContactForm.css";
import AppleTextfield from "../../../components/AppleTextfield/AppleTextfield";

export const ContactForm = ({ isNew, onClose, onSubmit, selectedContact }) => {
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [verifiedValue, setVerifiedValue] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [idValue, setIdValue] = useState(-1);

  // useEffect(() => {
  //   if (selectedContact !== null) {
  //     setNameValue(selectedContact.contact_name || "Error kah");
  //     setPhoneValue(selectedContact.contact_phone_number || "666");
  //     setIdValue(selectedContact.contact_id || -1);
  //   }
  // }, [selectedContact]);

  useEffect(() => {
    if (selectedContact && !isNew) {
      console.log(selectedContact);
      setNameValue(selectedContact.contact_name || "");
      setPhoneValue(selectedContact.contact_phone_number || "");
      setVerifiedValue(selectedContact.contact_verified || false);
      setIdValue(selectedContact.id || -1);
      console.log("masuk sini");
    } else {
      // Clear the form for creating new contacts
      setNameValue("");
      setPhoneValue("");
      setVerifiedValue(false);
      setIdValue(-1);
    }
  }, [selectedContact, isNew]);

  console.log("Contact ID: ", idValue)

  const handleVerifiedChange = (verified) => {
    setVerifiedValue(verified);
  };

  const handleSubmit = () => {
    if (!nameValue.trim() || !phoneValue.trim()) {
      setErrorMessage("Both fields are required.");
      return;
    }
  
    if (!/^\d{10,12}$/.test(phoneValue)) {
      setErrorMessage("Phone number must be 10 - 12 digits.");
      return;
    }
  
    const contactData = {
      contact_name: nameValue,
      contact_phone_number: phoneValue,
      contact_verified: verifiedValue,
    };
  
    if (isNew) {
      onSubmit(contactData);
    } else {
      onSubmit(contactData, idValue); // Include ID for editing
    }
  
    // Clear form and close popup
    setNameValue("");
    setPhoneValue("");
    setVerifiedValue(false);
    setErrorMessage("");
    onClose();
  };
  

  // const handleSubmit = () => {
  //   try {
  //     if (!nameValue.trim() || !phoneValue.trim()) {
  //       setErrorMessage("Both fields are required.");
  //       return;
  //     }
  //     if (!/^\d{10,12}$/.test(phoneValue)) {
  //       setErrorMessage("Phone number must be number only 10 - 12 digits.");
  //       return;
  //     }

  //     // onSubmit({ contact_name: nameValue, contact_phone_number: phoneValue, contact_verified: verifiedValue });

  //     if (selectedContact.contact_id !== null) {
  //       onSubmit(
  //         {
  //           contact_name: nameValue,
  //           contact_phone_number: phoneValue,
  //           contact_verified: verifiedValue,
  //         },
  //         idValue
  //       );
  //     } else {
  //       onSubmit({
  //         contact_name: nameValue,
  //         contact_phone_number: phoneValue,
  //         contact_verified: verifiedValue,
  //       });
  //     }

  //     setNameValue("");
  //     setPhoneValue("");
  //     setVerifiedValue(false);
  //     setErrorMessage("");
  //     setIdValue(-1);

  //     onClose();
  //   } catch (err) {
  //     setErrorMessage(err.response?.data?.error || "Error creating contact");
  //   }
  // };

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
            initialValue={nameValue}
            required
          />
          {/* PHONE NUMBER */}
          <AppleTextfield
            id="contact-phone-number"
            label="Phone Number"
            type="tel"
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            initialValue={phoneValue}
            required
          />

          <div className="contactform__verified">
            <p>Verified</p>
            <input
              type="radio"
              id="verified-no"
              value={false}
              checked={verifiedValue === false}
              onChange={() => handleVerifiedChange(false)}
            />
            <label htmlFor="verified-no">No</label>
            <input
              type="radio"
              id="verified-yes"
              value={false}
              checked={verifiedValue === true}
              onChange={() => handleVerifiedChange(true)}
            />
            <label htmlFor="verified-yes">Yes</label>
          </div>
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
