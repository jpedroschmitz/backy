import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Orders extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("product").notNullable();
      table.integer("costumer").notNullable();
      table.integer("quantity").notNullable();
      table.decimal("price").notNullable();
      table.decimal("discount");
      table.decimal("total").notNullable();

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
