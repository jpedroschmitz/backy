import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Product from 'App/Models/Product'

export default class ProductsController {
  public async index ({ view }: HttpContextContract) {
    const products = await Product.all()

    return view.render('product/index', {
      products,
    })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('product/create')
  }

  public async store ({ request, session, response }: HttpContextContract) {
    const productSchema = schema.create({
      name: schema.string(),
      description: schema.string(),
      maker: schema.string(),
    })

    const data = await request.validate({
      schema: productSchema,
      messages: {
        'name.required': 'Please enter the product name',
        'description.required': 'Please enter the product description',
        'maker.required': 'Please enter the product maker',
      },
      cacheKey: request.url(),
    })

    await Product.create(data)

    session.flash('success', 'Product created successfully')
    response.redirect('back')
  }

  public async show ({ params: { id }, view }: HttpContextContract) {
    const product = await Product.findOrFail(id)

    return view.render('product/show', {
      product,
    })
  }

  public async edit ({ params: { id }, view }: HttpContextContract) {
    const product = await Product.findOrFail(id)

    return view.render('product/edit', {
      product,
    })
  }

  public async update ({
    request,
    session,
    response,
    params: { id },
  }: HttpContextContract) {
    const productSchema = schema.create({
      name: schema.string(),
      description: schema.string(),
      maker: schema.string(),
    })

    const data = await request.validate({
      schema: productSchema,
      messages: {
        'name.required': 'Please enter the product name',
        'description.required': 'Please enter the product description',
        'maker.required': 'Please enter the product maker',
      },
      cacheKey: request.url(),
    })

    const product = await Product.findOrFail(id)

    product.merge(data)

    await product.save()

    await session.flash('success', 'Product updated successfully')
    response.redirect('back')
  }

  public async destroy ({
    params: { id },
    session,
    response,
  }: HttpContextContract) {
    const product = await Product.findOrFail(id)

    await product.delete()

    await session.flash('success', 'Product deleted successfully')
    response.redirect('back')
  }
}
