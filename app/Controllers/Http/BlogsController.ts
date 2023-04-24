import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';
import UpdatePostValidator from 'App/Validators/UpdatePostValidator';


export default class BlogsController {

    async index({ view }: HttpContextContract) {
        const posts = await Post.all()
        return view.render("blogs/index", { posts });
    }

    async create({ view }: HttpContextContract) {
        const post = new Post()
        return view.render("blogs/create", { post });
    }

    async store({ params, request, response, session }: HttpContextContract) {
        await this.handleRequest(params, request)
        session.flash("success", "Post created successfully")
        return response.redirect().toRoute("home")
    }

    async show({ view, params }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return view.render("blogs/show", { post });
    }

    async update({ request, response, params, session }: HttpContextContract) {
        await this.handleRequest(params, request)
        session.flash("success", "Post updated successfully")
        return response.redirect().toRoute("home")
    }

    private async handleRequest(params: HttpContextContract['params'], request: HttpContextContract['request']) {
        const post = params.id ? await Post.findOrFail(params.id) : new Post()
        const data = await request.validate(UpdatePostValidator)
        post
            .merge({ ...data, online: data.online || false })
            .save()
    }

    async destroy({ response, params, session }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        await post.delete()
        session.flash("success", "Post deleted successfully")
        return response.redirect().toRoute("home")
    }
}
