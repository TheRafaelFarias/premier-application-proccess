/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const PostsController = () => import('#controllers/posts_controller')

router.post('/register', [UsersController, 'store'])
router.post('/login', [UsersController, 'login'])
router.get('/me', [UsersController, 'show']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router
  .group(() => {
    router.get('/', [PostsController, 'show']).use(
      middleware.auth({
        guards: ['api'],
      })
    )

    router.get('/:id', [PostsController, 'index']).use(
      middleware.auth({
        guards: ['api'],
      })
    )

    router.post('/', [PostsController, 'store']).use(
      middleware.auth({
        guards: ['api'],
      })
    )

    router.patch('/:id', [PostsController, 'update']).use(
      middleware.auth({
        guards: ['api'],
      })
    )

    router.delete('/:id', [PostsController, 'delete']).use(
      middleware.auth({
        guards: ['api'],
      })
    )
  })
  .prefix('/posts')
