import * as knex from "knex";

exports.up = async function(knex: knex) {
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

exports.down = async function(knex: knex) {
  await knex.schema.dropTable("bulbs");
};
