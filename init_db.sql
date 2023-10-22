-- User Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Book Table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Borrowing Table
CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    borrowed_date DATE DEFAULT CURRENT_DATE,
    returned_date DATE,
    score INTEGER,
    user_id INTEGER,
    book_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

