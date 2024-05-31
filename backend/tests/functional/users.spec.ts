import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('Users', () => {
  test('Able to log-in user', async ({ client }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'logintest@email.com',
      password: 'testing1234',
    }

    await User.create(userInformation)

    const response = await client.post('/login').json({
      email: userInformation.email,
      password: userInformation.password,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      type: 'bearer',
    })

    await db.from('users').delete()
  })
  test('create user and log-in', async ({ client }) => {
    const response = await client.post('/register').json({
      fullName: 'Rafael Farias',
      email: 'registertest@email.com',
      password: 'testing123',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      type: 'bearer',
    })

    await db.from('users').delete()
  })
})
