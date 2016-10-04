exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.integer('blog_post_id').references('blogid').inTable('blogposts').notNullable().onDelete('CASCADE');
    table.timestamps(true,true);
    table.string('subject').notNullable();
    table.text('comment').notNullable();
    table.integer('user_id');
    table.integer('likes');
    table.string('username');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
