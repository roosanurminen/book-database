CREATE VIEW user_books_detail AS
SELECT
    u.user_id,
    b.book_id, 
    book_title, 
    a.author_id, 
    a.author_name,
    s.series_id,
    s.series_name,
    b.series_part,
    g.group_id,
    g.group_name,
    b.book_genre,
    b.book_language,
    b.book_type,
    b.release_date,
    ub.book_condition,
    ub.book_cover_type,
    ub.is_perfect,
    ub.notes,
    ub.book_edition
FROM
    books AS b
LEFT JOIN series AS s ON b.series_id = s.series_id
LEFT JOIN users_books AS ub ON b.book_id = ub.book_id
JOIN users AS u ON ub.user_id = u.user_id
LEFT JOIN groups AS g ON ub.group_id = g.group_id
JOIN books_authors ON b.book_id = books_authors.book_id
JOIN authors AS a ON books_authors.author_id = a.author_id
GROUP BY u.user_id, b.book_id, book_title, a.author_id, a.author_name,s.series_id,s.series_name,b.series_part,g.group_id,g.group_name,b.book_genre,b.book_language,b.book_type,b.release_date,ub.book_condition,ub.book_cover_type,ub.is_perfect,ub.notes,ub.book_edition;


SELECT * FROM user_books_detail WHERE user_id = 1 ORDER BY book_title;


CREATE VIEW series_full AS
SELECT ub.user_id, s.series_id, s.series_name, s.total_books, COUNT(DISTINCT b.book_id) AS owned_parts,
    CASE 
        WHEN COUNT(DISTINCT b.book_id) = s.total_books THEN true
    ELSE
        false
    END AS is_full
FROM users_books AS ub
JOIN books AS b ON ub.book_id = b.book_id
JOIN series AS s ON b.series_id = s.series_id
GROUP BY ub.user_id, s.series_id, s.series_name, s.total_books;

SELECT * FROM series_full WHERE user_id = 1 ORDER BY series_id;