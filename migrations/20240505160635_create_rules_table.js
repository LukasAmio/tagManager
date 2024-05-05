exports.up = function(knex) {
    return knex.schema.createTable('rules', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('value').notNullable();
      table.string('level').notNullable();
      table.string('created_by').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at')
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('rules');
  };
  