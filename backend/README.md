# Premier Studios Application Backend Documentation

Used AdonisJS due to its easy and fast way of developing API's. Taking advantage of the estabilished patterns like: controllers, validators, models.

## Available routes:

### Register

URL: `/register`

Method: `POST`

Body:

```JSON
{
    "email": "userEmail@email.com",
    "fullName": "User Full Name",
    "password": "123456"
}
```

Success example:

```JSON
{
    "type": "success",
    "token": "oat_MTgw.LUNmeWpLaGpwY25ydFdSQ1psc19SUUNVS2ZjOVN4dE9KaTJqTjJmQTM2NTY4ODI3MDQ"
}
```

### Login

URL: `/login`

Method: `POST`

Body:

```JSON
{
    "email": "userEmail@email.com",
    "password": "123456"
}
```

Success example:

```JSON
{
    "type": "bearer",
    "token": "oat_MTgw.LUNmeWpLaGpwY25ydFdSQ1psc19SUUNVS2ZjOVN4dE9KaTJqTjJmQTM2NTY4ODI3MDQ"
}
```

### User information

URL: `/me`

Method: `POST`

Note: `Need to be authenticated`

Body:

```JSON
{
    "email": "userEmail@email.com",
    "password": "123456"
}
```

Success example:

```JSON
{
	"id": 203,
	"fullName": "Rafael Farias"
}
```

### Post CRUD

<details>
<summary>Get all posts</summary>

URL: `/posts`

Method: `GET`

Note: `Need to be authenticated`

Query:

`mode: oldest-first` - Optional, if pass any other value display recent to oldest

`onlyMe: true` - Optional, if pass any other value display all posts from all authors

Body: `NONE`

Success example:

```JSON
[
    {
        "id": 125,
        "title": "Rafael's post title",
        "content": "wgwjiobeghonipeipjohwiopetipoweiohphiowet",
        "authorId": 204,
        "createdAt": "2024-05-31T18:31:01.104+00:00",
        "updatedAt": "2024-05-31T18:31:01.104+00:00",
        "author": {
            "fullName": "Rafael"
        }
    },
    {
        "id": 125,
        "title": "Rafael's post title",
        "content": "wgwjiobeghonipeipjohwiopetipoweiohphiowet",
        "authorId": 204,
        "createdAt": "2024-05-31T18:31:01.104+00:00",
        "updatedAt": "2024-05-31T18:31:01.104+00:00",
        "author": {
            "fullName": "Rafael"
        }
    }
]
```

</details>

<details>
<summary>Get post</summary>

URL: `/posts/:postId`

Method: `GET`

Note: `Need to be authenticated`

Body: `NONE`

Success example:

```JSON
{
	"id": 125,
	"title": "Rafael's post title",
	"content": "wgwjiobeghonipeipjohwiopetipoweiohphiowet",
	"authorId": 204,
	"createdAt": "2024-05-31T18:31:01.104+00:00",
	"updatedAt": "2024-05-31T18:31:01.104+00:00",
	"author": {
		"fullName": "Rafael"
	}
}
```

</details>

<details>
<summary>Create new post</summary>

URL: `/posts/`

Method: `POST`

Note: `Need to be authenticated`

Body:

```JSON
{
	"title": "Rafael's post title",
	"content": "wgwjiobeghonipeipjohwiopetipoweiohphiowet",
}
```

Success example:

```JSON
{
	"id": 125,
	"title": "Rafael's post title",
	"content": "wgwjiobeghonipeipjohwiopetipoweiohphiowet",
	"authorId": 204,
	"createdAt": "2024-05-31T18:31:01.104+00:00",
	"updatedAt": "2024-05-31T18:31:01.104+00:00",
	"author": {
		"fullName": "Rafael"
	}
}
```

</details>

<details>
<summary>Edit post</summary>

URL: `/posts/:postId`

Method: `PATCH`

Note: `Need to be authenticated and be owner of the post`

Body:

```JSON
{
	"title": "Rafael's post title",
	"content": "wgwjiobeghonipeipjohwiopetipoweiohphiowet",
}
```

Success: `Status 200`

</details>

<details>
<summary>Delete post</summary>

URL: `/posts/:postId`

Method: `DELETE`

Note: `Need to be authenticated and be owner of the post`

Body: `NONE`

Success: `Status 200`

</details>
