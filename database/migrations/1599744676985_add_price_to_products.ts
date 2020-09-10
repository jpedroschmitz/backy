import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Products extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.decimal("price").notNullable().defaultTo(0);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn("price");
    });
  }
}
