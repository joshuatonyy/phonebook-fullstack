postgresinit:
	docker run --name postgres15 -p 5433:543 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=admin -d postgres:15-alpine

postgres:
	docker exec -it postgres15 psql

createdb:
	docker exec -it postgres15 createdb --username=root --owner=root the-phonebook

dropdb:
	docker exec -it postgres15 dropdb the-phonebook

migrateup:
	migrate -path db/migrations -database 'postgresql://root:password@localhost:5433/the-phonebook?sslmode=disable' --verbose up

migratedown:
	migrate -path db/migrations -database 'postgresql://root:password@localhost:5433/the-phonebook?sslmode=disable' --verbose down

.PHONY: postgresinit postgres createdb dropdb migrateup migratedown