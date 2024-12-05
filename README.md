**Guide to Getting the Project:**

* Clone the-phonebook from github repo ([https://github.com/joshuatonyy/phonebook-fullstack](https://github.com/joshuatonyy/phonebook-fullstack))  
* Download from google drive ([https://drive.google.com/drive/folders/1VAO6uvgayOkakT5OZfkow41XU5AWWQFV?usp=sharing](https://drive.google.com/drive/folders/1VAO6uvgayOkakT5OZfkow41XU5AWWQFV?usp=sharing))

**Guide to Setting Up the Backend:**

1. Install the pre-requisites for the project:  
   * Golang ([https://go.dev/doc/install](https://go.dev/doc/install))  
   * Golang-Migrate ([https://github.com/golang-migrate/migrate](https://github.com/golang-migrate/migrate))  
   * Docker ([https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/))  
   * Make (Optional) ([https://leangaurav.medium.com/how-to-setup-install-gnu-make-on-windows-324480f1da69](https://leangaurav.medium.com/how-to-setup-install-gnu-make-on-windows-324480f1da69))  
2. Open terminal in the project root directory (the-phonebook-backend)  
3. Run either one of these command to install the dependencies:  
   * go mod download  
   * go mod tidy   
4. If you have Make installed you can run these command in the terminal:  
   * make postgresget  
   * make postgresinit  
   * make createdb  
   * make migrateup

   If you didn’t install Make, you can run these command in the terminal:

   * docker pull postgres:15-alpine  
   * docker run \--name postgres15 \-p 5433:543 \-e POSTGRES\_USER=root \-e POSTGRES\_PASSWORD=password \-d postgres:15-alpine  
   * docker exec \-it postgres15 psql  
   * docker exec \-it postgres15 createdb \--username=root \--owner=root the-phonebook  
   * migrate \-path db/migrations \-database 'postgresql://root:password@localhost:5433/the-phonebook?sslmode=disable' \--verbose up  
5. Run (go run cmd/main.go) to start the backend server.  
6. If set up properly, then the backend will start at localhost:8080.

**Guide to Setting Up the Frontend:**

1. Install the pre-requisites for the project:  
2. Open terminal in the project root directory (auth-frontend)  
3. Run (npm install) to install the project’s dependencies  
4. Run (npm start) to run the frontend  
5. If set up properly, then the backend will start at localhost:3000