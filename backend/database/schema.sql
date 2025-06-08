CREATE TABLE authors (
    author_id serial PRIMARY KEY,
    author_name VARCHAR(50) NOT NULL
);

CREATE TABLE series (
    series_id serial PRIMARY KEY,
    series_name VARCHAR(50) NOT NULL,
    total_books INTEGER NOT NULL
);

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE groups (
    group_id serial PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE books (
    book_id serial PRIMARY KEY,
    book_title VARCHAR(150) NOT NULL,
    book_genre VARCHAR(50) NOT NULL,
    series_part INTEGER DEFAULT 0,
    book_language VARCHAR(50) NOT NULL,
    release_date INTEGER NOT NULL,
    book_type VARCHAR(50) NOT NULL,
    series_id INTEGER,
    FOREIGN KEY (series_id) REFERENCES series(series_id)
);

CREATE TABLE books_authors (
    book_id INTEGER REFERENCES books(book_id),
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE users_books (
    book_id INTEGER REFERENCES books(book_id),
    user_id INTEGER REFERENCES users(user_id),
    book_condition VARCHAR(50) NOT NULL,
    book_cover_type VARCHAR(50) NOT NULL,
    book_edition INTEGER,
    is_perfect BOOLEAN NOT NULL,
    notes TEXT,
    group_id INTEGER,
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
);



CREATE TABLE missing_books (
    mbook_id serial PRIMARY KEY,
    mbook_title VARCHAR(150) NOT NULL,
    series_id INTEGER,
    FOREIGN KEY (series_id) REFERENCES series(series_id)
);

CREATE TABLE missing_books_authors (
    mbook_id INTEGER REFERENCES missing_books(mbook_id),
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (mbook_id, author_id)
);

CREATE TABLE users_missing_books (
    mbook_id INTEGER REFERENCES missing_books(mbook_id),
    user_id INTEGER REFERENCES users(user_id),
    group_id INTEGER,
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
    PRIMARY KEY (user_id, mbook_id)
);