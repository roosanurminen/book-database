INSERT INTO users (user_name, email, password) VALUES
('Elli Epeli', 'elli@gmail.com', 'password'),
('Kalle Kamu', 'kalle@gmail.com', 'password'),
('Sulo Sulonen', 'sulo@gmail.com', 'password');

INSERT INTO authors (author_name) VALUES
('J.R.R. Tolkien'),
('Douglas Adams'),
('Donna Tartt'),
('Stieg Larsson'),
('James Herriot'),
('George R.R. Martin');

INSERT INTO series (series_name, total_books) VALUES
('Taru sormusten herrasta', 3),
('Linnunrata', 5),
('Millenium-trilogia', 3),
('Herriot', 10),
('Tulen ja jään laulu', 5);

INSERT INTO genres (genre_name) VALUES
('Fantasia'),
('Scifi'),
('dekkari'),
('romantiikka'),
('Huumori'),
('Jännitys'),
('Nuoret'),
('Lapset'),
('Sota'),
('omaelämä'),
('tietokirjallisuus'),
('psykologinen'),
('trilleri');

INSERT INTO groups (group_name) VALUES
('Keski-Maa'),
('Suosikit');

INSERT INTO books (user_id, book_title, series_id, series_part, book_language, book_type, release_date, page_count, book_condition, book_cover_type, book_edition, is_perfect, notes, group_id) VALUES
(1, 'Sormuksen ritarit', 1, 1, 'Suomi', 'romaani', 1954, 400, 'Hyvä', 'Kovakantinen', 1, true, null, 1),
(1, 'Kaksi tornia', 1, 2, 'Suomi', 'romaani', 1955, 400, 'Hyvä', 'Kovakantinen', 1, true, null, 1),
(1, 'Kuninkaan paluu', 1, 3, 'Suomi', 'romaani', 1956, 400, 'Hyvä', 'Kovakantinen', 1, true, null, 1),
(1, 'Linnunradan käsikirja liftareille', 2, 1, 'Suomi', 'romaani', 1956, 200, 'Kohtalainen', 'Pehmeäkantinen', 1, true, null, null),
(1, 'Jumalat juhlivat öisin', null, 0, 'Suomi', 'romaani', 1954, 400, 'Hyvä', 'Kovakantinen', 1, true, null, null),

(2, 'Sormuksen ritarit', 1, 1, 'Suomi', 'romaani', 1954, 400, 'Hyvä', 'Kovakantinen', 3, false, 'Paperit puuttuu', null),
(2, 'Kaksi tornia', 1, 2, 'Suomi', 'romaani', 1955, 400, 'Hyvä', 'Kovakantinen', 1, true, null, null),
(2, 'Linnunradan käsikirja liftareille', 2, 1, 'Suomi', 'romaani', 1956, 200, 'Kohtalainen', 'Pehmeäkantinen', 1, true, null, 2),
(2, 'Maailmanlopun ravintola', 2, 2, 'Suomi', 'romaani', 1956, 200, 'Hyvä', 'Pehmeäkantinen', 1, true, null, 2),
(2, 'Elämä, maailmankaikkeus – ja kaikki', 2, 3, 'Suomi', 'romaani', 1956, 200, 'Erinomainen', 'Pehmeäkantinen', 1, true, null, 2),
(2, 'Terve, ja kiitos kaloista', 2, 4, 'Suomi', 'romaani', 1956, 200, 'Hyvä', 'Pehmeäkantinen', 1, true, null, 2),
(2, 'Enimmäkseen harmiton', 2, 5, 'Suomi', 'romaani', 1956, 200, 'Hyvä', 'Pehmeäkantinen', 1, true, null, 2),
(2, 'Miehet jotka vihaavat naisia', 3, 1, 'Suomi', 'romaani', 2000, 200, 'Hyvä', 'Kovakantinen', 1, true, null, null),

(3, 'Sormuksen ritarit', 1, 1, 'Suomi', 'romaani', 1954, 400, 'Hyvä', 'Kovakantinen', 1, true, null, 1),
(3, 'Kaksi tornia', 1, 2, 'Suomi', 'romaani', 1955, 400, 'Hyvä', 'Kovakantinen', 1, true, null, 1),
(3, 'Kaikenkarvaiset ystäväni ', 4, 1, 'Suomi', 'romaani', 1955, 400, 'Hyvä', 'Kovakantinen', 1, true, null, null),
(3, 'Luojanluomat ystäväni', 4, 2, 'Suomi', 'romaani', 1955, 400, 'Hyvä', 'Kovakantinen', 1, true, null, null),
(3, 'Valtaistuinpeli', 5, 1, 'Suomi', 'romaani', 1990, 400, 'Hyvä', 'Pehmäkantinen', 1, true, null, 2),
(3, 'Kuninkaiden koitos', 5, 2, 'Suomi', 'romaani', 1990, 400, 'Hyvä', 'Pehmäkantinen', 1, true, null, 2),
(3, 'Miekkamyrsky', 5, 3, 'Suomi', 'romaani', 1990, 400, 'Hyvä', 'Pehmäkantinen', 1, true, null, 2),
(3, 'Korppien kestit', 5, 4, 'Suomi', 'romaani', 1990, 400, 'Hyvä', 'Pehmäkantinen', 1, true, null, 2),
(3, 'Lohikäärmetanssi', 5, 5, 'Suomi', 'romaani', 1990, 400, 'Hyvä', 'Pehmäkantinen', 1, true, null, 2),
(3, 'Jäälohikäärme', 5, 5, 'Suomi', 'romaani', 1995, 100, 'Hyvä', 'Kovakantinen', 1, true, null, null);



INSERT INTO books_authors (book_id, author_id) VALUES
(1, 1), 
(2, 1), 
(3, 1),        
(4, 1),                        
(5, 3),

(6, 1), 
(7, 1), 
(8, 2),        
(9, 2),                        
(10, 2),
(11, 2), 
(12, 2), 
(13, 4),        

(14, 1), 
(15, 1), 
(16, 5),        
(17, 5),                        
(18, 6),
(19, 6),
(20, 6),
(21, 6),
(22, 6),
(23, 6);


INSERT INTO books_genres (book_id, genre_id) VALUES
(1, 1), 
(2, 1), 
(3, 1),        
(4, 2), 
(5, 12),                       
(5, 13),

(6, 1), 
(7, 1), 
(8, 2),        
(9, 2),                        
(10, 2),
(11, 2), 
(12, 2), 
(13, 3),        

(14, 1), 
(15, 10), 
(15, 5),
(16, 10), 
(16, 5),       
(17, 1),                        
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(23, 8);


INSERT INTO missing_books (user_id, mbook_title, series_id, series_part, group_id) VALUES
(1, 'Maailmanlopun ravintola', 2, 2, null),
(1, 'Elämä, maailmankaikkeus – ja kaikki', 2, 3, null),
(1, 'Terve, ja kiitos kaloista', 2, 4, null),
(1, 'Enimmäkseen harmiton', 2, 5, null),

(2, 'Kuninkaan paluu', 1, 3, null),
(2, 'Tyttö joka leikki tulella', 3, 2, 2),

(3, 'Jumalat juhlivat öisin', null, 0, null);

INSERT INTO missing_books_authors (mbook_id, author_id) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),

(5, 1),
(6, 4),

(7, 3);