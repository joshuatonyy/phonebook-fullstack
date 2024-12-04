package contact

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service
}

func NewHandler(s Service) *Handler {
	return &Handler{s}
}


func (h *Handler) CreateContact(c *gin.Context) {
	var req CreateContactReq
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	var userIDInt int64
	switch v := userID.(type) {
	case string:
		// Convert string to int64
		id, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID format"})
			return
		}
		userIDInt = id
	case float64:
		// Directly convert float64 to int64
		userIDInt = int64(v)
	default:
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unexpected user ID type"})
		return
	}

	// Parse the request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Associate the contact with the authenticated user
	// req.UserID = userID.(int64)
	req.UserID = userIDInt

	res, err := h.Service.CreateContact(c.Request.Context(), &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// c.SetCookie("jwt", , 3600, "/", "localhost", false, true)

	c.JSON(http.StatusOK, res)
}

func (h *Handler) GetContactsByUserID(c *gin.Context) {
	userID, err := strconv.ParseInt(c.Param("userID"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	contacts, err := h.Service.GetContactsByUserID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, contacts)
}

func (h *Handler) UpdateContact(c *gin.Context) {
	contactID, err := strconv.ParseInt(c.Param("contactID"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID"})
		return
	}

	var req UpdateContactReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.Service.UpdateContact(c.Request.Context(), contactID, &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contact updated successfully"})
}

func (h *Handler) DeleteContact(c *gin.Context) {
	contactID, err := strconv.ParseInt(c.Param("contactID"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID"})
		return
	}

	if err := h.Service.DeleteContact(c.Request.Context(), contactID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contact deleted successfully"})
}
