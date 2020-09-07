import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";

import Costumer from "App/Models/Costumer";
import OrderProduct from "App/Models/OrderProduct";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public costumerId: number;

  @belongsTo(() => Costumer)
  public customer: BelongsTo<typeof Costumer>;

  @hasMany(() => OrderProduct)
  public items: HasMany<typeof OrderProduct>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
