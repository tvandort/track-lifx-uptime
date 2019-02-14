// @ts-check
var knex = require("knex");

/** @type {function(knex, Promise): void} */
exports.up = async function(knex, Promise) {
  const supposedMaxIdLength = 12;
  const maxIpv4Length = 15;
  const maxPortLength = 5;

  await knex.schema.createTable("bulbs", bulbs => {
    bulbs
      .string("id", supposedMaxIdLength)
      .primary()
      .unique()
      .notNullable()
      .index();

    bulbs.string("ip_address", maxIpv4Length).notNullable();
    bulbs.string("port", maxPortLength).notNullable();
  });
};

/** @type {function(knex, Promise): void} */
exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("bulbs");
};
