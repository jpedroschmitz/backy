import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";

import Product from "App/Models/Product";
import Order from "App/Models/Order";

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public orderId: number;

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>;

  @column()
  public productId: number;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

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
