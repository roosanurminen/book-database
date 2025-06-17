CREATE VIEW user_books_detail AS
SELECT
    b.user_id,
    b.book_id, 
    book_title,  
    STRING_AGG(DISTINCT a.author_name, ',') AS author_names,
    s.series_id,
    s.series_name,
    b.series_part,
    g.group_id,
    g.group_name,
    STRING_AGG(DISTINCT ge.genre_name, ',') AS genre_names,
    b.book_language,
    b.book_type,
    b.release_date,
    b.book_condition,
    b.book_cover_type,
    b.is_perfect,
    b.notes,
    b.book_edition
FROM
    books AS b
LEFT JOIN series AS s ON b.series_id = s.series_id
LEFT JOIN groups AS g ON b.group_id = g.group_id
JOIN books_authors AS ba ON b.book_id = ba.book_id
JOIN authors AS a ON ba.author_id = a.author_id
LEFT JOIN books_genres AS bg ON b.book_id = bg.book_id
LEFT JOIN genres AS ge ON bg.genre_id = ge.genre_id
GROUP BY
    b.user_id, b.book_id,
    s.series_id, s.series_name, b.series_part,
    g.group_id, g.group_name,
    b.book_language, b.book_type, b.release_date,
    b.book_condition, b.book_cover_type,
    b.is_perfect, b.notes, b.book_edition;


SELECT * FROM user_books_detail WHERE user_id = 1;


CREATE VIEW series_full AS
SELECT b.user_id, s.series_id, s.series_name, s.total_books, COUNT(DISTINCT b.book_id) AS owned_parts,
    CASE 
        WHEN COUNT(DISTINCT b.book_id) = s.total_books THEN true
    ELSE
        false
    END AS is_full
FROM books AS b
JOIN series AS s ON b.series_id = s.series_id
GROUP BY b.user_id, s.series_id, s.series_name, s.total_books;

SELECT * FROM series_full WHERE user_id = 1 ORDER BY series_id;