exports.up = function(knex) {
  return knex.schema.createTable('accounts', function(table) {
    table.increments();
    table.string('name');
    table.string('code').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at')
    table.string('settings')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('accounts');
};
