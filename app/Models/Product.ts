import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public orderId: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public maker: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
