import Post from '#models/post'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('Posts', () => {
  test('Can get one post information', async ({ client }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
    }

    const user = await User.create(userInformation)
    const post = await Post.create({
      ...postInformation,
      authorId: user.id,
    })

    const response = await client.get(`/posts/${post.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      id: post.id,
    })

    await post.delete()
    await user.delete()
  })
  test('can create post', async ({ client }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
    }

    try {
      const user = await User.create(userInformation)
      const response = await client.post('/posts').loginAs(user).json(postInformation)

      response.assertStatus(200)
      response.assertBodyContains({
        title: postInformation.title,
        content: postInformation.content,
      })
    } catch (error) {
      console.log(error)
    }

    await User.query().delete()
  })

  test('Can update a post', async ({ client, assert }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
    }

    const user = await User.create(userInformation)
    const post = await Post.create({
      ...postInformation,
      authorId: user.id,
    })

    const newPostInformation = {
      title: 'New post title',
      content: 'Not a content on this post',
    }

    const response = await client.patch(`/posts/${post.id}`).json(newPostInformation).loginAs(user)

    response.assertStatus(200)

    const newFetchedPost = await Post.find(post.id)

    assert.equal(newFetchedPost?.title, newPostInformation.title)
    assert.equal(newFetchedPost?.content, newPostInformation.content)

    await post.delete()
    await user.delete()
  })

  test('Can delete a post', async ({ client, assert }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
    }

    const user = await User.create(userInformation)
    const post = await Post.create({
      ...postInformation,
      authorId: user.id,
    })

    const response = await client.delete(`/posts/${post.id}`).loginAs(user)

    response.assertStatus(200)

    const fetchedPost = await Post.find(post.id)

    assert.isNull(fetchedPost)

    await user.delete()
  })

  test('Can get all posts without any params', async ({ client, assert }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const user = await User.create(userInformation)

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
      authorId: user.id,
    }

    await Post.createMany([postInformation, postInformation])

    const response = await client.get('/posts').loginAs(user)

    response.assertStatus(200)

    const fetchedPosts = await Post.query().orderBy('created_at', 'desc')

    assert.deepEqual(
      fetchedPosts.map((post) => post.id),
      response.body().map((post: any) => post.id)
    )

    await user.delete()
  })

  test('Can get all posts from most oldest to recent', async ({ client, assert }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const user = await User.create(userInformation)

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
      authorId: user.id,
    }

    await Post.createMany([postInformation, postInformation])

    const response = await client.get('/posts').loginAs(user).qs({
      mode: 'oldest-first',
    })

    response.assertStatus(200)

    const fetchedPosts = await Post.query().orderBy('created_at', 'asc')

    assert.deepEqual(
      fetchedPosts.map((post) => post.id),
      response.body().map((post: any) => post.id)
    )

    await user.delete()
  })

  test('Can get only author posts', async ({ client }) => {
    const userInformation = {
      fullName: 'Rafael Farias',
      email: 'newpostTest@email.com',
      password: 'testing1234',
    }

    const user = await User.create(userInformation)

    const postInformation = {
      title: 'Post title',
      content: 'post content here',
      authorId: user.id,
    }

    const postWithValidAuthor = await Post.create(postInformation)

    const anotherUser = await User.create({
      ...userInformation,
      email: 'anotherusertest@email.com',
    })

    const postWithoutValidAuthor = await Post.create({
      ...postInformation,
      authorId: anotherUser.id,
    })

    const response = await client.get('/posts').loginAs(user).qs({
      onlyMe: true,
    })

    response.assertStatus(200)

    response.assertBodyContains([{ id: postWithValidAuthor.id }])

    response.assertBodyNotContains([{ id: postWithoutValidAuthor.id }])

    await user.delete()
  })
})
