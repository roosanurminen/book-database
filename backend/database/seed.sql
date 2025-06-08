INSERT INTO authors (author_name) VALUES 
('J.R.R. Tolkien'),
('Douglas Adams'),
('Stieg Larsson');

INSERT INTO series (series_name, total_books) VALUES
('The Lord of the Rings', 3),
('The Hitchhiker''s Guide to the Galaxy', 5),
('Millennium', 3);

INSERT INTO users (user_name, email, password) VALUES
('Alice', 'alice@example.com', 'hashed_password1'),
('Bob', 'bob@example.com', 'hashed_password2'),
('John', 'john@example.com', 'hashed_password3');

INSERT INTO groups (group_name) VALUES
('Middle-earth'),
('Sci-fi Collection'),
('Swedish Crime');

INSERT INTO books (book_title, book_genre, series_part, book_language, release_date, book_type, series_id) VALUES
('The Fellowship of the Ring', 'Fantasy', 1, 'English', 1954, 'Novel', 1),
('The Two Towers', 'Fantasy', 2, 'English', 1945, 'Novel', 1),
('The Return of the King', 'Fantasy', 3, 'English', 1955, 'Novel', 1),
('The Hitchhiker''s Guide to the Galaxy', 'Sci-Fi', 1, 'English', 1979, 'Novel', 2),
('The Girl with the Dragon Tattoo', 'Crime', 1, 'English', NULL, 'Novel', 3);

INSERT INTO books_authors (book_id, author_id) VALUES
(1, 1), 
(2, 1), 
(3, 1),        
(4, 2),                        
(5, 3);                     

INSERT INTO users_books (book_id, user_id, book_condition, book_cover_type, book_edition, is_perfect, notes, group_id) VALUES
(1, 1, 'Excellent', 'Hardcover', 1, true, NULL, 1),
(2, 1, 'Good', 'Hardcover', 1, true, NULL, 1),      
(4, 1, 'Good', 'Paperback', 10, false, 'Cover bent', 2), 
(5, 1, 'Fair', 'Paperback', 6, false, 'Some pages folded', 3),
(3, 1, 'Fair', 'Paperback', 6, false, 'Some pages folded', 1),

(1, 2, 'Good', 'Hardcover', 1, true, NULL, NULL),         
(3, 2, 'Excellent', 'Hardcover', 1, true, NULL, 1),    
(5, 2, 'Excellent', 'Paperback', NULL, true, NULL, NULL);

-- user_id 1 : 3 lotr, 1 hitch, 1 mill ()
-- user_id 2 : 2 lotr, 1 mill