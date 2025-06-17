CREATE TABLE users (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE authors (
    author_id serial PRIMARY KEY,
    author_name VARCHAR(50) NOT NULL
);

CREATE TABLE series (
    series_id serial PRIMARY KEY,
    series_name VARCHAR(50) NOT NULL,
    total_books INTEGER NOT NULL
);

CREATE TABLE genres (
    genre_id serial PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE groups (
    group_id serial PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE books (
    book_id serial PRIMARY KEY,
    user_id INTEGER,

    book_title VARCHAR(50) NOT NULL,
    series_id INTEGER,
    series_part INTEGER NOT NULL,
    group_id INTEGER,

    book_language VARCHAR(50) NOT NULL,
    book_type VARCHAR(50) NOT NULL,
    release_date INTEGER NOT NULL,
    page_count INTEGER NOT NULL,

    book_condition VARCHAR(50) NOT NULL,
    book_cover_type VARCHAR(50) NOT NULL,
    book_edition INTEGER NOT NULL,
    is_perfect BOOLEAN NOT NULL,
    notes TEXT,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    FOREIGN KEY (series_id) REFERENCES series(series_id)
);


CREATE TABLE books_authors (
    book_id INTEGER REFERENCES books(book_id),
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE books_genres (
    book_id INTEGER REFERENCES books(book_id),
    genre_id INTEGER REFERENCES genres(genre_id),
    PRIMARY KEY (book_id, genre_id)
);

CREATE TABLE missing_books (
    mbook_id serial PRIMARY KEY,
    user_id INTEGER,
    mbook_title VARCHAR(150) NOT NULL,
    series_id INTEGER,
    series_part INTEGER NOT NULL,
    group_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (series_id) REFERENCES series(series_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE missing_books_authors (
    mbook_id INTEGER REFERENCES missing_books(mbook_id),
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (mbook_id, author_id)
);