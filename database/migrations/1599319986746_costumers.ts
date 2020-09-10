import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Costumers extends BaseSchema {
  protected tableName = "costumers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("cpf").notNullable();
      table.string("street").notNullable();
      table.integer("number").notNullable();
      table.string("district").notNullable();
      table.string("city").notNullable();
      table.string("zip").notNullable();
      table.string("state").notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
