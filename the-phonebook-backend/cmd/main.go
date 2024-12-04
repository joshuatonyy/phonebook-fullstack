package main

import (
	"log"
	"server/cmd/router"
	"server/db"
	"server/internal/contact"
	"server/internal/user"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("Couldn't init database connection: %s", err)
	}

	userRep := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userRep)
	userHandler := user.NewHandler(userSvc)

	contactRep := contact.NewRepository(dbConn.GetDB())
	contactSvc := contact.NewService(contactRep)
	contactHandler := contact.NewHandler(contactSvc)

	router.InitRouter(userHandler, contactHandler)
	router.Start("0.0.0.0:8080")
}