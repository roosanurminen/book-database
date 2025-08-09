/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
        table.increments('user_id').primary();
        table.string('user_name', 200).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('password', 60).notNullable();
    })
    .createTable('authors', function (table) {
        table.increments('author_id').primary();
        table.integer('user_id').references('users.user_id');
        table.string('author_name', 200).notNullable();
        table.string('normalized_author', 200).notNullable();
    })
    .createTable('series', function(table) {
        table.increments('series_id').primary();
        table.integer('user_id').references('users.user_id');
        table.string('series_name', 200).notNullable();
        table.integer('total_books').notNullable();
        table.unique(['user_id', 'series_name']);
    })
    .createTable('genres', function(table) {
        table.increments('genre_id').primary();
        table.string('genre_name', 50).notNullable().unique();
    })
    .createTable('groups', function(table) {
        table.increments('group_id').primary();
        table.integer('user_id').references('users.user_id');
        table.string('group_name', 200).notNullable();
        table.unique(['user_id', 'group_name']);
    })
    .createTable('books', function(table) {
        table.increments('book_id').primary();
        table.integer('user_id').references('users.user_id');
        table.string('book_title', 200).notNullable();
        table.integer('series_id').references('series.series_id');
        table.integer('series_part');
        table.integer('group_id').references('groups.group_id');

        table.string('book_language', 50).notNullable();
        table.string('book_type', 50).notNullable();
        table.integer('release_date').notNullable();
        table.integer('page_count').notNullable();

        table.string('book_condition', 50).notNullable();
        table.string('book_cover_type', 50).notNullable();
        table.integer('book_edition').notNullable();
        table.boolean('is_perfect').notNullable();
        table.text('notes');
    })    
    .createTable('books_authors', function(table) {
        table.integer('book_id').notNullable().references('books.book_id').onDelete('CASCADE');
        table.integer('author_id').notNullable().references('authors.author_id');
        table.primary(['book_id', 'author_id']);
    })
    .createTable('books_genres', function(table) {
        table.integer('book_id').notNullable().references('books.book_id').onDelete('CASCADE');
        table.integer('genre_id').notNullable().references('genres.genre_id');
        table.primary(['book_id', 'genre_id']);
    })
    .createTable('missing_books', function(table) {
        table.increments('mbook_id').primary();
        table.integer('user_id').references('users.user_id');
        table.string('mbook_title', 200).notNullable();
        table.integer('series_id').references('series.series_id');
        table.integer('series_part').notNullable();
        table.integer('group_id').references('groups.group_id');
    })    
    .createTable('missing_books_authors', function(table) {
        table.integer('mbook_id').notNullable().references('missing_books.mbook_id');
        table.integer('author_id').notNullable().references('authors.author_id');
        table.primary(['mbook_id', 'author_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('missing_books_authors')
    .dropTableIfExists('missing_books')
    .dropTableIfExists('books_genres')
    .dropTableIfExists('books_authors')
    .dropTableIfExists('books')
    .dropTableIfExists('groups')
    .dropTableIfExists('genres')
    .dropTableIfExists('series')
    .dropTableIfExists('authors')
    .dropTableIfExists('users');
};
