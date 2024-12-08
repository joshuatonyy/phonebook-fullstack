import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { AppleSearchBar } from "../../components/AppleSearchBar/AppleSearchBar";
import { ContactCard } from "../../components/ContactCard/ContactCard";
import ContactForm from "./ContactForm/ContactForm";
import { useNavigate } from "react-router-dom";
import {
  createContact,
  deleteContact,
  getContactsByUserID,
  logout,
  updateContact,
} from "../../api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const MainPage = () => {
  const userID = localStorage.getItem("userID");
  const name = localStorage.getItem("userName");

  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState({});
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContactsByUserID(userID);
      if (data != null) {
        setContacts(data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        await logout();
        navigate("/login");
      } else {
        console.error(
          "Error fetching contacts:",
          error.response?.data || error.message
        );
        setErrorMessage("Failed to load contacts. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts()
  }, [userID]);

  const handleLogout = async () => {
    try {
      setErrorMessage("");
      await logout();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Logout failed, please try again"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting contact:",
        error.response?.data || error.message
      );
      setErrorMessage("Failed to delete contact. Please try again.");
    }
  };

  const handleCreateContact = async (contactData) => {
    try {
      const newContact = await createContact({ ...contactData });
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setIsContactFormVisible(false);
    } catch (error) {
      console.error(
        "Error creating contact:",
        error.response?.data || error.message
      );
      setErrorMessage("Failed to create contact. Please try again.");
    }
  };

  const handleEditContact = async (contactData, contactID) => {
    try {
      console.log("masuk ke edit");
      const theContact = await updateContact(contactID, contactData);
      setIsContactFormVisible(false);
      await fetchContacts();
    } catch (error) {
      console.error(
        "Error editing contact:",
        error.response?.data || error.message
      );
      setErrorMessage("Failed to edit contact. Please try again.");
    }
  };

  const handleOpenPopup = (isNewVal) => {
    setIsContactFormVisible(true);
    setIsNew(isNewVal);
  };

  const handleClosePopup = () => {
    setIsContactFormVisible(false);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = contacts.filter((contact) =>
      contact.contact_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="mainpage__container">
      <div className="mainpage__header">
        <p className="mainpage__header-title">The Phonebook</p>
        <p className="mainpage__header-logout" onClick={handleLogout}>
          Logout
        </p>
      </div>

      <div className="mainpage__welcome">
        <p className="mainpage__welcome-title">
          {name ? `Welcome, ${name}` : "Welcome"}
        </p>
        <div
          className="mainpage__welcome-add-button"
          onClick={() => {
            setIsNew(true);
            // setSelectedContact(null);
            setIsContactFormVisible(true);
          }}
        >
          + Add Contact
        </div>
      </div>

      <div className="mainpage__searchbar">
        <AppleSearchBar onSearch={handleSearch} />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              name={contact.contact_name}
              phone={contact.contact_phone_number}
              verified={contact.contact_verified}
              onDelete={() => handleDelete(contact.id)}
              onClickCallback={() => {
                setSelectedContact(contact);
                setIsNew(false);
                setIsContactFormVisible(true);
              }}
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>

      {/* {isContactFormVisible && isNew && (
        <ContactForm
          isNew={true}
          onClose={handleClosePopup}
          onSubmit={handleCreateContact}
        />
      )} */}

      {isContactFormVisible && (
        <ContactForm
          isNew={isNew}
          onClose={handleClosePopup}
          onSubmit={isNew ? handleCreateContact : handleEditContact}
          selectedContact={!isNew ? selectedContact : null} // Only pass selectedContact if editing
        />
      )}

      {/* {isContactFormVisible && isNew===false && (
        <ContactForm
          isNew={false}
          onClose={handleClosePopup}
          onSubmit={handleEditContact}
        />
      )}

      {isContactFormVisible && isNew===true && (
        <ContactForm
          isNew={true}
          onClose={handleClosePopup}
          onSubmit={handleEditContact}
          selectedContact={selectedContact}
        />
      )} */}
    </div>
  );
};

export default MainPage;
