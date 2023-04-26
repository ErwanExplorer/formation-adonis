import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecurityController {

    async login({ view }: HttpContextContract) {
        return view.render("auth/login")
    }



    async doLogin({ request, auth, response, session }: HttpContextContract) {
        const email = request.input("email")
        const password = request.input("password")

        try {
            await auth.use('web').attempt(email, password)
            return response.redirect().toRoute("home")
        } catch (error) {
            session.flash("error", "Identifiants incorrects")
            response.redirect().toRoute("login")
        }
    }

}