/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .table('books', table => {
      table.index('user_id');
      table.index('series_id');
      table.index('group_id');
      table.index('book_title');
    })

    .table('authors', table => {
        table.index('normalized_author');
    })

    .table('groups', table => {
        table.index('group_name');
    })

    .table('series', table => {
        table.index('series_name');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .table('books', table => {
      table.index('user_id');
      table.index('series_id');
      table.index('group_id');
      table.index('book_title');
    })

    .table('authors', table => {
        table.index('normalized_author');
    })

    .table('groups', table => {
        table.index('group_name');
    })

    .table('series', table => {
        table.index('series_name');
    });
};
