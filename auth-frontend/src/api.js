import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});




// GET Contact
export const getContactsByUserID = async (userID) => {
  try {
    const response = await apiClient.get(`/contacts/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Get contacts error:", error.response?.data || error.message);
    throw error;
  }
};
// POST New Contact
export const createContact = async (contactData) => {
  try {
    const response = await apiClient.post("/contacts/", contactData);
    return response.data;
  } catch (error) {
    console.error("Create contact error:", error.response?.data || error.message);
    throw error;
  }
};
// PATCH Contact
export const updateContact = async (contactID, contactData) => {
  try {
    const response = await apiClient.patch(`/contacts/${contactID}`, contactData);
    return response.data;
  } catch (error) {
    console.error("Update contact error:", error.response?.data || error.message);
    throw error;
  }
};
// DELETE Contact
export const deleteContact = async (contactID) => {
  try {
    const response = await apiClient.delete(`/contacts/${contactID}`);
    return response.data;
  } catch (error) {
    console.error("Delete contact error:", error.response?.data || error.message);
    throw error;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });

    const { id, name } = response.data;

    localStorage.setItem('userID', id);
    localStorage.setItem("userName", name);
    
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await apiClient.get("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};
