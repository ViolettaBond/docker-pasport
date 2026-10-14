CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    mobile_phone VARCHAR(50) NOT NULL,
    home_phone VARCHAR(50) NOT NULL,
    other_contact VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);