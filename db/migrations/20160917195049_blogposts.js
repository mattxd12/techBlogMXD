exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogposts', function(table){
    table.increments('blogid').primary();
    table.string('name');
    table.timestamps(true,true);
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.string('tags');
    table.integer('views');
    table.integer('comments');
    table.integer('user_id');
    table.integer('likes');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('blogposts');
};
