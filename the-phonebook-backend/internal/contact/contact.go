package contact

import "context"

type Contact struct {
	ID               int64  `json:"id" db:"id"`
	UserID           int64  `json:"user_id" db:"user_id"`
	ContactName      string `json:"contact_name" db:"contact_name"`
	ContactPhoneNumber string `json:"contact_phone_number" db:"contact_phone_number"`
}

type CreateContactReq struct {
	UserID           int64  `json:"user_id"`
	ContactName      string `json:"contact_name"`
	ContactPhoneNumber string `json:"contact_phone_number"`
}

type UpdateContactReq struct {
	ContactName      *string `json:"contact_name,omitempty"`
	ContactPhoneNumber *string `json:"contact_phone_number,omitempty"`
}

type ContactRes struct {
	ID               string `json:"id"`
	UserID           string `json:"user_id"`
	ContactName      string `json:"contact_name"`
	ContactPhoneNumber string `json:"contact_phone_number"`
}

type Repository interface {
	CreateContact(ctx context.Context, contact *Contact) (*Contact, error)
	GetContactsByUserID(ctx context.Context, userID int64) ([]Contact, error)
	UpdateContact(ctx context.Context, contactID int64, updates *UpdateContactReq) error
	DeleteContact(ctx context.Context, contactID int64) error
}

type Service interface {
	CreateContact(ctx context.Context, req *CreateContactReq) (*ContactRes, error)
	GetContactsByUserID(ctx context.Context, userID int64) ([]ContactRes, error)
	UpdateContact(ctx context.Context, contactID int64, req *UpdateContactReq) error
	DeleteContact(ctx context.Context, contactID int64) error
}
