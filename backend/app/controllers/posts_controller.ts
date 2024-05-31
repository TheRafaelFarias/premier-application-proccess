import Post from '#models/post'
import { createPostValidator, updatePostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ response, params }: HttpContext) {
    const postId = params.id
    let post: Post

    try {
      post = await Post.findOrFail(postId)
    } catch (error) {
      return response.notFound({
        message: 'Post with specified ID not found',
      })
    }

    try {
      await post.load('author')

      const serializedPost = post!.serialize({
        relations: {
          author: {
            fields: ['fullName'],
          },
        },
      })

      return serializedPost
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    try {
      const post = await Post.create({
        title: payload.title,
        content: payload.content,
        authorId: auth.user!.id,
      })

      await post.load('author')

      return post.serialize({
        relations: {
          author: {
            fields: ['fullName'],
          },
        },
      })
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }

  async update({ params, auth, response, request }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)

    const postId = params.id
    let post: Post

    try {
      post = await Post.findOrFail(postId)
    } catch (error) {
      return response.notFound({
        message: 'Post with specified ID not found',
      })
    }

    if (post.authorId !== auth.user!.id) {
      return response.unauthorized({
        message: "You're not the owner of this post",
      })
    }

    const newPostDetails = {
      title: post.title,
      content: post.content,
      ...(payload as Partial<typeof payload>),
    }

    try {
      post.merge(newPostDetails)
      await post.save()

      return response.ok(undefined)
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }

  async show({ auth, response, request }: HttpContext) {
    try {
      const posts = await Post.query()
        .preload('author')
        .if(request.qs().mode === 'oldest-first', (query) => {
          query.orderBy('created_at', 'asc')
        })
        .if(request.qs().mode !== 'oldest-first', (query) => {
          query.orderBy('created_at', 'desc')
        })
        .if(request.qs().onlyMe === 'true', (query) => {
          query.where('author_id', auth.user!.id)
        })

      const serializedPosts = posts.map((post) =>
        post.serialize({
          relations: {
            author: {
              fields: ['fullName'],
            },
          },
        })
      )

      return serializedPosts
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }

  async delete({ auth, params, response }: HttpContext) {
    const postId = params.id
    let post: Post

    try {
      post = await Post.findOrFail(postId)
    } catch (error) {
      return response.notFound({
        message: 'Post with specified ID not found',
      })
    }

    if (post.authorId !== auth.user!.id) {
      return response.unauthorized({
        message: "You're not the owner of this post",
      })
    }

    try {
      await post.delete()

      return response.ok(undefined)
    } catch (error) {
      console.log(error)

      return response.internalServerError({
        error,
      })
    }
  }
}
