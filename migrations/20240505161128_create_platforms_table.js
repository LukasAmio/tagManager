exports.up = function(knex) {
    return knex.schema.createTable('platforms', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('code').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('platforms');
  };
  