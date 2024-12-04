CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_phone_number VARCHAR(15) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);