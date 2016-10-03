exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
  table.increments();
  table.string('user_name');
  table.string('password');
  // table.string('first_name');
  // table.string('last_name');
  table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
