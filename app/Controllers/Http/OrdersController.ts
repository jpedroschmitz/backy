import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";

// import Product from "App/Models/Product";
// import Costumer from "App/Models/Costumer";
import Order from "App/Models/Order";

export default class OrdersController {
  public async index({ view }: HttpContextContract) {
    const orders = await Order.all();

    return view.render("order/index", {
      orders,
    });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("order/create");
  }

  public async store({ request, session, response }: HttpContextContract) {
    const orderSchema = schema.create({
      product: schema.string(),
      costumer: schema.string(),
      quantity: schema.number(),
      price: schema.number(),
      discount: schema.number(),
      total: schema.number(),
    });

    const data = await request.validate({
      schema: orderSchema,
      messages: {
        "product.required": "Please enter the product",
        "costumer.required": "Please enter the costumer",
        "quantity.required": "Please enter the quantity",
        "price.required": "Please enter the price",
      },
      cacheKey: request.url(),
    });

    await Order.create(data);

    session.flash("success", "Order created successfully");
    response.redirect("back");
  }

  public async show({ params: { id }, view }: HttpContextContract) {
    const order = await Order.findOrFail(id);

    return view.render("order/show", {
      order,
    });
  }

  public async edit({ params: { id }, view }: HttpContextContract) {
    const order = await Order.findOrFail(id);

    return view.render("order/edit", {
      order,
    });
  }

  public async update({
    request,
    session,
    response,
    params: { id },
  }: HttpContextContract) {
    const orderSchema = schema.create({
      product: schema.string(),
      costumer: schema.string(),
      quantity: schema.number(),
      price: schema.number(),
      discount: schema.number(),
      total: schema.number(),
    });

    const data = await request.validate({
      schema: orderSchema,
      messages: {
        "product.required": "Please enter the product",
        "costumer.required": "Please enter the costumer",
        "quantity.required": "Please enter the quantity",
        "price.required": "Please enter the price",
      },
      cacheKey: request.url(),
    });

    const order = await Order.findOrFail(id);

    order.merge(data);

    await order.save();

    await session.flash("success", "Order updated successfully");
    response.redirect("back");
  }

  public async destroy({
    params: { id },
    session,
    response,
  }: HttpContextContract) {
    const order = await Order.findOrFail(id);

    await order.delete();

    await session.flash("success", "Order deleted successfully");
    response.redirect("back");
  }
}
