import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Costumer from "App/Models/Costumer";
import Product from "App/Models/Product";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;

  @hasOne(() => Costumer)
  public costumer: HasOne<typeof Costumer>;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column()
  public discount: number;

  @column()
  public total: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
