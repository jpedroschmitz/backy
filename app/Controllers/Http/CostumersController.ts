import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Costumer from "App/Models/Costumer";

export default class CostumersController {
  public async index({ view }: HttpContextContract) {
    const costumers = await Costumer.all();

    return view.render("costumer/index", {
      costumers,
    });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("costumer/create");
  }

  public async store({ request, session, response }: HttpContextContract) {
    const costumerSchema = schema.create({
      name: schema.string(),
      cpf: schema.string(),
      street: schema.string(),
      number: schema.number(),
      district: schema.string(),
      city: schema.string(),
      zip: schema.string(),
      state: schema.string(),
    });

    const data = await request.validate({
      schema: costumerSchema,
      messages: {
        "name.required": "Please enter the costumer name",
        "cpf.required": "Please enter the costumer CPF",
        "street.required": "Please enter the costumer street",
        "number.required": "Please enter the costumer number",
        "district.required": "Please enter the costumer district",
        "city.required": "Please enter the costumer city",
        "zip.required": "Please enter the costumer zip",
        "state.required": "Please enter the costumer state",
      },
      cacheKey: request.url(),
    });

    await Costumer.create(data);

    session.flash("success", "Costumer created successfully");
    response.redirect("back");
  }

  public async show({ params: { id }, view }: HttpContextContract) {
    const costumer = await Costumer.findOrFail(id);

    return view.render("costumer/show", {
      costumer,
    });
  }

  public async edit({ params: { id }, view }: HttpContextContract) {
    const costumer = await Costumer.findOrFail(id);

    return view.render("costumer/edit", {
      costumer,
    });
  }

  public async update({
    request,
    session,
    response,
    params: { id },
  }: HttpContextContract) {
    const costumerSchema = schema.create({
      name: schema.string(),
      cpf: schema.string(),
      street: schema.string(),
      number: schema.number(),
      district: schema.string(),
      city: schema.string(),
      zip: schema.string(),
      state: schema.string(),
    });

    const data = await request.validate({
      schema: costumerSchema,
      messages: {
        "name.required": "Please enter the costumer name",
        "cpf.required": "Please enter the costumer CPF",
        "street.required": "Please enter the costumer street",
        "number.required": "Please enter the costumer number",
        "district.required": "Please enter the costumer district",
        "city.required": "Please enter the costumer city",
        "zip.required": "Please enter the costumer zip",
        "state.required": "Please enter the costumer state",
      },
      cacheKey: request.url(),
    });

    const costumer = await Costumer.findOrFail(id);

    costumer.merge(data);

    await costumer.save();

    await session.flash("success", "Costumer updated successfully");
    response.redirect("back");
  }

  public async destroy({
    params: { id },
    session,
    response,
  }: HttpContextContract) {
    const costumer = await Costumer.findOrFail(id);

    await costumer.delete();

    await session.flash("success", "Costumer deleted successfully");
    response.redirect("back");
  }
}
