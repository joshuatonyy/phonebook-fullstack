package contact

import (
	"context"
	"database/sql"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db DBTX) Repository {
	return &repository{db: db}
}

func (r *repository) CreateContact(ctx context.Context, contact *Contact) (*Contact, error) {
	var lastInsertId int64
	query := "INSERT INTO contacts(user_id, contact_name, contact_phone_number) VALUES ($1, $2, $3) RETURNING id"
	err := r.db.QueryRowContext(ctx, query, contact.UserID, contact.ContactName, contact.ContactPhoneNumber).Scan(&lastInsertId)
	if err != nil {
		return nil, err
	}

	contact.ID = lastInsertId
	return contact, nil
}

func (r *repository) GetContactsByUserID(ctx context.Context, userID int64) ([]Contact, error) {
	query := "SELECT id, user_id, contact_name, contact_phone_number FROM contacts WHERE user_id = $1"
	rows, err := r.db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var contacts []Contact
	for rows.Next() {
		var c Contact
		if err := rows.Scan(&c.ID, &c.UserID, &c.ContactName, &c.ContactPhoneNumber); err != nil {
			return nil, err
		}
		contacts = append(contacts, c)
	}
	return contacts, nil
}

func (r *repository) UpdateContact(ctx context.Context, contactID int64, updates *UpdateContactReq) error {
	query := "UPDATE contacts SET contact_name = COALESCE($1, contact_name), contact_phone_number = COALESCE($2, contact_phone_number) WHERE id = $3"
	_, err := r.db.ExecContext(ctx, query, updates.ContactName, updates.ContactPhoneNumber, contactID)
	return err
}

func (r *repository) DeleteContact(ctx context.Context, contactID int64) error {
	query := "DELETE FROM contacts WHERE id = $1"
	_, err := r.db.ExecContext(ctx, query, contactID)
	return err
}
