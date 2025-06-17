/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE missing_books_authors, missing_books, books_genres, books_authors, books, groups, genres, series, authors, users RESTART IDENTITY CASCADE');

  await knex('users').insert([
    { user_name: 'Elli Epeli', email: 'elli@gmail.com', password: 'password' },
    { user_name: 'Kalle Kamu', email: 'kalle@gmail.com', password: 'password' },
    { user_name: 'Sulo Sulonen', email: 'sulo@gmail.com', password: 'password' },
  ]);

  await knex('authors').insert([
    { author_name: 'J.R.R. Tolkien' },
    { author_name: 'Douglas Adams' },
    { author_name: 'Donna Tartt' },
    { author_name: 'Stieg Larsson' },
    { author_name: 'James Herriot' },
    { author_name: 'George R.R. Martin' },
  ]);

  await knex('series').insert([
    { series_name: 'Taru sormusten herrasta', total_books: 3 },
    { series_name: 'Linnunrata', total_books: 5 },
    { series_name: 'Millenium-trilogia', total_books: 3 },
    { series_name: 'Herriot', total_books: 10 },
    { series_name: 'Tulen ja jään laulu', total_books: 5 },
  ]);

  await knex('genres').insert([
    { genre_name: 'Fantasia' },
    { genre_name: 'Scifi' },
    { genre_name: 'dekkari' },
    { genre_name: 'romantiikka' },
    { genre_name: 'Huumori' },
    { genre_name: 'Jännitys' },
    { genre_name: 'Nuoret' },
    { genre_name: 'Lapset' },
    { genre_name: 'Sota' },
    { genre_name: 'omaelämä' },
    { genre_name: 'tietokirjallisuus' },
    { genre_name: 'psykologinen' },
    { genre_name: 'trilleri' },
  ]);

  await knex('groups').insert([
    { group_name: 'Keski-Maa' },
    { group_name: 'Suosikit' },
  ]);

  await knex('books').insert([
    { user_id: 1, book_title: 'Sormuksen ritarit', series_id: 1, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1954, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 1 },
    { user_id: 1, book_title: 'Kaksi tornia', series_id: 1, series_part: 2, book_language: 'Suomi', book_type: 'romaani', release_date: 1955, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 1 },
    { user_id: 1, book_title: 'Kuninkaan paluu', series_id: 1, series_part: 3, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 1 },
    { user_id: 1, book_title: 'Linnunradan käsikirja liftareille', series_id: 2, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 200, book_condition: 'Kohtalainen', book_cover_type: 'Pehmeäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
    { user_id: 1, book_title: 'Jumalat juhlivat öisin', series_id: null, series_part: 0, book_language: 'Suomi', book_type: 'romaani', release_date: 1954, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
    { user_id: 2, book_title: 'Sormuksen ritarit', series_id: 1, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1954, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 3, is_perfect: false, notes: 'Paperit puuttuu', group_id: null },
    { user_id: 2, book_title: 'Kaksi tornia', series_id: 1, series_part: 2, book_language: 'Suomi', book_type: 'romaani', release_date: 1955, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
    { user_id: 2, book_title: 'Linnunradan käsikirja liftareille', series_id: 2, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 200, book_condition: 'Kohtalainen', book_cover_type: 'Pehmeäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 2, book_title: 'Maailmanlopun ravintola', series_id: 2, series_part: 2, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 200, book_condition: 'Hyvä', book_cover_type: 'Pehmeäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 2, book_title: 'Elämä, maailmankaikkeus – ja kaikki', series_id: 2, series_part: 3, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 200, book_condition: 'Erinomainen', book_cover_type: 'Pehmeäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 2, book_title: 'Terve, ja kiitos kaloista', series_id: 2, series_part: 4, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 200, book_condition: 'Hyvä', book_cover_type: 'Pehmeäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 2, book_title: 'Enimmäkseen harmiton', series_id: 2, series_part: 5, book_language: 'Suomi', book_type: 'romaani', release_date: 1956, page_count: 200, book_condition: 'Hyvä', book_cover_type: 'Pehmeäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 2, book_title: 'Miehet jotka vihaavat naisia', series_id: 3, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 2000, page_count: 200, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
    { user_id: 3, book_title: 'Sormuksen ritarit', series_id: 1, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1954, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 1 },
    { user_id: 3, book_title: 'Kaksi tornia', series_id: 1, series_part: 2, book_language: 'Suomi', book_type: 'romaani', release_date: 1955, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 1 },
    { user_id: 3, book_title: 'Kaikenkarvaiset ystäväni ', series_id: 4, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1955, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
    { user_id: 3, book_title: 'Luojanluomat ystäväni', series_id: 4, series_part: 2, book_language: 'Suomi', book_type: 'romaani', release_date: 1955, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
    { user_id: 3, book_title: 'Valtaistuinpeli', series_id: 5, series_part: 1, book_language: 'Suomi', book_type: 'romaani', release_date: 1990, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Pehmäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 3, book_title: 'Kuninkaiden koitos', series_id: 5, series_part: 2, book_language: 'Suomi', book_type: 'romaani', release_date: 1990, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Pehmäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 3, book_title: 'Miekkamyrsky', series_id: 5, series_part: 3, book_language: 'Suomi', book_type: 'romaani', release_date: 1990, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Pehmäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 3, book_title: 'Korppien kestit', series_id: 5, series_part: 4, book_language: 'Suomi', book_type: 'romaani', release_date: 1990, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Pehmäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 3, book_title: 'Lohikäärmetanssi', series_id: 5, series_part: 5, book_language: 'Suomi', book_type: 'romaani', release_date: 1990, page_count: 400, book_condition: 'Hyvä', book_cover_type: 'Pehmäkantinen', book_edition: 1, is_perfect: true, notes: null, group_id: 2 },
    { user_id: 3, book_title: 'Jäälohikäärme', series_id: null, series_part: 0, book_language: 'Suomi', book_type: 'romaani', release_date: 1995, page_count: 100, book_condition: 'Hyvä', book_cover_type: 'Kovakantinen', book_edition: 1, is_perfect: true, notes: null, group_id: null },
  ]);

  await knex('books_authors').insert([
    { book_id: 1, author_id: 1 },
    { book_id: 2, author_id: 1 },
    { book_id: 3, author_id: 1 },
    { book_id: 4, author_id: 1 },
    { book_id: 5, author_id: 3 },
    { book_id: 6, author_id: 1 },
    { book_id: 7, author_id: 1 },
    { book_id: 8, author_id: 2 },
    { book_id: 9, author_id: 2 },
    { book_id: 10, author_id: 2 },
    { book_id: 11, author_id: 2 },
    { book_id: 12, author_id: 2 },
    { book_id: 13, author_id: 4 },
    { book_id: 14, author_id: 1 },
    { book_id: 15, author_id: 1 },
    { book_id: 16, author_id: 5 },
    { book_id: 17, author_id: 5 },
    { book_id: 18, author_id: 6 },
    { book_id: 19, author_id: 6 },
    { book_id: 20, author_id: 6 },
    { book_id: 21, author_id: 6 },
    { book_id: 22, author_id: 6 },
    { book_id: 23, author_id: 6 },
  ]);

  await knex('books_genres').insert([
    { book_id: 1, genre_id: 1 },
    { book_id: 2, genre_id: 1 },
    { book_id: 3, genre_id: 1 },
    { book_id: 4, genre_id: 2 },
    { book_id: 5, genre_id: 12 },
    { book_id: 5, genre_id: 13 },
    { book_id: 6, genre_id: 1 },
    { book_id: 7, genre_id: 1 },
    { book_id: 8, genre_id: 2 },
    { book_id: 9, genre_id: 2 },
    { book_id: 10, genre_id: 2 },
    { book_id: 11, genre_id: 2 },
    { book_id: 12, genre_id: 2 },
    { book_id: 13, genre_id: 3 },
    { book_id: 14, genre_id: 1 },
    { book_id: 15, genre_id: 10 },
    { book_id: 15, genre_id: 5 },
    { book_id: 16, genre_id: 10 },
    { book_id: 16, genre_id: 5 },
    { book_id: 17, genre_id: 1 },
    { book_id: 18, genre_id: 1 },
    { book_id: 19, genre_id: 1 },
    { book_id: 20, genre_id: 1 },
    { book_id: 21, genre_id: 1 },
    { book_id: 22, genre_id: 1 },
    { book_id: 23, genre_id: 1 },
    { book_id: 23, genre_id: 8 },
  ]);

  await knex('missing_books').insert([
    { user_id: 1, mbook_title: 'Maailmanlopun ravintola', series_id: 2, series_part: 2, group_id: null },
    { user_id: 1, mbook_title: 'Elämä, maailmankaikkeus – ja kaikki', series_id: 2, series_part: 3, group_id: null },
    { user_id: 1, mbook_title: 'Terve, ja kiitos kaloista', series_id: 2, series_part: 4, group_id: null },
    { user_id: 1, mbook_title: 'Enimmäkseen harmiton', series_id: 2, series_part: 5, group_id: null },
    { user_id: 2, mbook_title: 'Kuninkaan paluu', series_id: 1, series_part: 3, group_id: null },
    { user_id: 2, mbook_title: 'Tyttö joka leikki tulella', series_id: 3, series_part: 2, group_id: 2 },
    { user_id: 3, mbook_title: 'Jumalat juhlivat öisin', series_id: null, series_part: 0, group_id: null },
  ]);

  await knex('missing_books_authors').insert([
    { mbook_id: 1, author_id: 2 },
    { mbook_id: 2, author_id: 2 },
    { mbook_id: 3, author_id: 2 },
    { mbook_id: 4, author_id: 2 },
    { mbook_id: 5, author_id: 1 },
    { mbook_id: 6, author_id: 4 },
    { mbook_id: 7, author_id: 3 },
  ]);
};