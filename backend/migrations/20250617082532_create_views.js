/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .raw(`CREATE VIEW user_books_detail AS
              SELECT b.user_id,
                b.book_id, 
                b.book_title,  
                STRING_AGG(DISTINCT a.author_name, ', ') AS author_names,
                STRING_AGG(DISTINCT a.normalized_author, ', ') AS norm_authors,
                s.series_id,
                s.series_name,
                s.total_books,
                b.series_part,
                g.group_id,
                g.group_name,
                STRING_AGG(DISTINCT ge.genre_name, ', ') AS genre_names,
                b.book_language,
                b.book_type,
                b.release_date,
                b.book_condition,
                b.book_cover_type,
                b.is_perfect,
                b.notes,
                b.book_edition,
                b.page_count
              FROM books AS b
              LEFT JOIN series AS s ON b.series_id = s.series_id
              LEFT JOIN groups AS g ON b.group_id = g.group_id
              JOIN books_authors AS ba ON b.book_id = ba.book_id
              JOIN authors AS a ON ba.author_id = a.author_id
              LEFT JOIN books_genres AS bg ON b.book_id = bg.book_id
              LEFT JOIN genres AS ge ON bg.genre_id = ge.genre_id
              GROUP BY 
                b.user_id, b.book_id, b.book_title, s.series_id, s.series_name, s.total_books, b.series_part, 
                g.group_id, g.group_name, b.book_language, b.book_type, b.release_date, 
                b.book_condition, b.book_cover_type, b.is_perfect, b.notes, b.book_edition, b.page_count;
            `)
        .raw(`CREATE VIEW series_full AS
              SELECT 
                b.user_id, 
                s.series_id, 
                s.series_name, 
                s.total_books,
                STRING_AGG(DISTINCT a.author_name, ', ') AS author_names,
                g.group_name,
                COUNT(DISTINCT b.book_id) AS owned_parts,
              CASE WHEN COUNT(DISTINCT b.book_id) = s.total_books 
                THEN true
              ELSE
                false
              END AS is_full
              FROM books AS b
              JOIN series AS s ON b.series_id = s.series_id
              JOIN books_authors AS ba ON b.book_id = ba.book_id
              JOIN authors AS a ON ba.author_id = a.author_id
              LEFT JOIN groups AS g ON b.group_id = g.group_id
              GROUP BY b.user_id, s.series_id, s.series_name, s.total_books, g.group_name;
            `)
        .raw(`CREATE VIEW user_missing_books AS
              SELECT 
                mb.user_id,
                mb.book_id, 
                mb.book_title,  
                STRING_AGG(DISTINCT a.author_name, ', ') AS author_names,
                s.series_id,
                s.series_name,
                s.total_books,
                mb.series_part,
                g.group_id,
                g.group_name
              FROM missing_books AS mb
              LEFT JOIN series AS s ON mb.series_id = s.series_id
              LEFT JOIN groups AS g ON mb.group_id = g.group_id
              JOIN missing_books_authors AS mba ON mb.book_id = mba.book_id
              JOIN authors AS a ON mba.author_id = a.author_id
              GROUP BY 
                mb.user_id, mb.book_id, mb.book_title, s.series_id, s.series_name, s.total_books, mb.series_part, 
                g.group_id, g.group_name;
            `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .raw(`DROP VIEW IF EXISTS series_full`)
        .raw(`DROP VIEW IF EXISTS user_books_detail`);
};