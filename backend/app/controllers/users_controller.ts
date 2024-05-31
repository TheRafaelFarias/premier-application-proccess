import User from '#models/user'
import { createUserValidator, loginUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginUserValidator)

    // Throw E_INVALID_CREDENTIALS
    // @see https://docs.adonisjs.com/guides/references/exceptions#e_invalid_credentials
    const user = await User.verifyCredentials(payload.email, payload.password)

    try {
      const token = await User.accessTokens.create(user)

      return {
        type: 'bearer',
        token: token.value!.release(),
      }
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    try {
      const user = await User.create({
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
      })

      const token = await User.accessTokens.create(user)

      return {
        type: 'bearer',
        token: token.value!.release(),
      }
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }

  async show({ auth, response }: HttpContext) {
    try {
      const user = await User.find(auth.user!.id)

      return user?.serialize({
        fields: {
          pick: ['fullName', 'id'],
        },
      })
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }
}
