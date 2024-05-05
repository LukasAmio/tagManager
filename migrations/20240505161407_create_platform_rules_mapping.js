exports.up = function(knex) {
    return knex.schema.createTable('rulesPlatformsMap', function(table) {
      table.increments();
      table.integer('rule_id').notNullable().references('id').inTable('rules').onDelete('NO ACTION')
      table.integer('platform_id').notNullable().references('id').inTable('platforms').onDelete('NO ACTION')
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('rulesPlatformsMap');
  };
  