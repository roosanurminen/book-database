/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE genres RESTART IDENTITY CASCADE');

  await knex('genres').insert([
    { genre_name: 'Dekkari' },
    { genre_name: 'Dystopia' },
    { genre_name: 'Elämäkerta / Muistelmat' },
    { genre_name: 'Erotiikka' },
    { genre_name: 'Fantasia' },
    { genre_name: 'Historia' },
    { genre_name: 'Huumori' },
    { genre_name: 'Jännitys' },
    { genre_name: 'Kauhu' },
    { genre_name: 'Lapset' },
    { genre_name: 'Nuoret' },
    { genre_name: 'Psykologinen' },
    { genre_name: 'Romantiikka' },
    { genre_name: 'Scifi' },
    { genre_name: 'Sota' },
    { genre_name: 'Tietokirja' },
    { genre_name: 'Trilleri' },
  ]);
};