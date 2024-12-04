package contact

import (
	"context"
	"strconv"
	"time"
)

type service struct {
	Repository
	timeout time.Duration
}

func NewService(repository Repository) Service {
	return &service{
		repository,
		2 * time.Second,
	}
}

func (s *service) CreateContact(ctx context.Context, req *CreateContactReq) (*ContactRes, error) {
	c := &Contact{
		UserID: req.UserID,
		ContactName: req.ContactName,
		ContactPhoneNumber: req.ContactPhoneNumber,
	}

	createdContact, err := s.Repository.CreateContact(ctx, c)
	if err != nil {
		return nil, err
	}

	return &ContactRes{
		ID: strconv.Itoa(int(createdContact.ID)),
		UserID: strconv.Itoa(int(createdContact.UserID)),
		ContactName: createdContact.ContactName,
		ContactPhoneNumber: createdContact.ContactPhoneNumber,
	}, nil
}

func (s *service) GetContactsByUserID(ctx context.Context, userID int64) ([]ContactRes, error) {
	contacts, err := s.Repository.GetContactsByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	var res []ContactRes
	for _, c := range contacts {
		res = append(res, ContactRes{
			ID: strconv.Itoa(int(c.ID)),
			UserID: strconv.Itoa(int(c.UserID)),
			ContactName: c.ContactName,
			ContactPhoneNumber: c.ContactPhoneNumber,
		})
	}
	return res, nil
}

func (s *service) UpdateContact(ctx context.Context, contactID int64, req *UpdateContactReq) error {
	return s.Repository.UpdateContact(ctx, contactID, req)
}

func (s *service) DeleteContact(ctx context.Context, contactID int64) error {
	return s.Repository.DeleteContact(ctx, contactID)
}
