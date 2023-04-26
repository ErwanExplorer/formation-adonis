import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ContactService } from 'App/Services/ContactService'

export default class ContactController {

    async contact({ view }: HttpContextContract) {
        return view.render("contact")
    }

    async store({ request, session, response }: HttpContextContract) {
        ContactService.send(request.all() as any)
        session.flash("success", "Votre demande de contact a bien été envoyée")
        return response.redirect().back()
    }

}