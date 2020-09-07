import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class OrdersProducts extends BaseSchema {
  protected tableName = "order_products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("order_id")
        .references("id")
        .inTable("orders")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.integer("quantity").notNullable();
      table.decimal("price").notNullable();
      table.decimal("discount").defaultTo(0);
      table.decimal("total").notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
