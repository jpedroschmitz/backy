import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Costumers extends BaseSchema {
  protected tableName = "costumers";

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.decimal("base_discount").defaultTo(0);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn("base_discount");
    });
  }
}
