import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Product from "App/Models/Product";
import Customer from "App/Models/Costumer";
import Order from "App/Models/Order";
import OrderProduct from "App/Models/OrderProduct";

export default class OrdersController {
  public async index({ view }: HttpContextContract) {
    const orders = await Order.query().preload("customer");

    return view.render("order/index", {
      orders,
    });
  }

  public async create({ view }: HttpContextContract) {
    const customers = await Customer.all();
    const products = await Product.all();

    return view.render("order/create", {
      customers,
      products,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const {
        order: { customer: customerId, products },
      } = request.all();

      const order = new Order();

      const customer = await Customer.findOrFail(customerId);
      await order.related("customer").associate(customer);

      products.forEach(
        async ({ discount, product: productId, quantity, price, total }) => {
          const item = new OrderProduct();
          item.discount = discount ? parseFloat(discount) : 0;
          item.quantity = parseInt(quantity);
          item.price = parseFloat(price);
          item.total = parseFloat(total);
          item.productId = Number(productId);
          item.orderId = order.id;

          await order.related("items").save(item);
        }
      );

      return response.json({
        status: `success`,
        message: `created with success`,
      });
    } catch (err) {
      return response.status(err.status).json({
        status: `error`,
        message: err,
      });
    }
  }

  public async show({ params: { id }, view }: HttpContextContract) {
    const order = await Order.findOrFail(id);
    await order.preload("customer");
    await order.preload("items");

    return view.render("order/show", {
      order,
    });
  }

  public async edit({ params: { id }, view }: HttpContextContract) {
    const customers = await Customer.all();
    const products = await Product.all();

    const order = await Order.findOrFail(id);
    await order.preload("customer");
    await order.preload("items");

    return view.render("order/edit", {
      order,
      customers,
      products,
    });
  }

  public async update({
    request,
    response,
    params: { id },
  }: HttpContextContract) {
    try {
      const {
        order: { products },
      } = request.all();

      products.forEach(
        async ({ discount, product: productId, quantity, price, total }) => {
          const item = await OrderProduct.query()
            .where("order_id", id)
            .andWhere("product_id", productId)
            .first();

          item?.merge({
            discount: discount ? parseFloat(discount) : 0,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            total: parseFloat(total),
            productId: Number(productId),
          });

          await item?.save();
        }
      );

      return response.json({
        status: `success`,
        message: `updated with success`,
      });
    } catch (err) {
      return response.status(err.status).json({
        status: `error`,
        message: err,
      });
    }
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
