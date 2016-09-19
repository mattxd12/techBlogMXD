exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogposts', function(table){
    table.increments('blogid').primary();
    table.string('name');
    table.timestamps(true,true);
    table.string('title');
    table.text('content');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('blogposts');
};
