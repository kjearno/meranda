# meranda

**DEMO: [kjearno.github.io/meranda](https://kjearno.github.io/meranda)**

![](https://user-images.githubusercontent.com/39556179/120553807-62255000-c412-11eb-92ba-89241b02be0b.png)

## Getting Started

1. Clone the repo:

```sh
$ git clone https://github.com/kjearno/meranda.git
```

2. Go to the project folder:

```sh
$ cd meranda
```

## client

### Features

- React
- Redux

### Installation

1. Go to the client folder:

```sh
$ cd client
```

2. Install NPM packages:

```sh
$ npm install
```

### Usage

#### Development server:

```sh
$ npm start
```

#### Build:

```sh
$ npm run build
```

#### Deploy:

```sh
$ npm run deploy
```

### Routes

#### Home:

> [kjearno.github.io/meranda](https://kjearno.github.io/meranda)

#### Login:

> [kjearno.github.io/meranda/auth/login](https://kjearno.github.io/meranda/auth/login)

#### Register:

> [kjearno.github.io/meranda/auth/register](https://kjearno.github.io/meranda/auth/register)

#### Profile:

> [kjearno.github.io/meranda/profile](https://kjearno.github.io/meranda/profile)

#### Category:

> [kjearno.github.io/meranda/:category](https://kjearno.github.io/meranda/health)

#### Article:

> [kjearno.github.io/meranda/:category/:article](https://kjearno.github.io/meranda/business/lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-1)

#### 404:

> [kjearno.github.io/meranda/:does/:not/:match](https://kjearno.github.io/meranda/:does/:not/:match)

## server

### Features

- Node.js
- Express
- PostgreSQL

### Installation

1. Go to the server folder:

```sh
$ cd server
```

2. Install NPM packages:

```sh
$ npm install
```

### Usage

#### Development server:

```sh
$ npm run dev
```

#### Production server:

```sh
$ npm start
```

### API

#### Endpoints

##### auth

`POST /auth/register`<br>
`POST /auth/login`<br>
`GET /auth/logout`

##### categories

`GET /categories`<br>
`POST /categories`<br>
`DELETE /categories`<br>
`GET /categories/:id`<br>
`PATCH /categories/:id`<br>
`DELETE /categories/:id`

##### comments

`GET /comments`<br>
`POST /comments`<br>
`DELETE /comments`<br>
`GET /comments/:id`<br>
`PATCH /comments/:id`<br>
`DELETE /comments/:id`<br>
`POST /comments/me`

##### posts

`GET /posts`<br>
`POST /posts`<br>
`DELETE /posts`<br>
`GET /posts/:id`<br>
`PATCH /posts/:id`<br>
`DELETE /posts/:id`

##### roles

`GET /roles`<br>
`GET /roles/:id`

##### subscribers

`GET /subscribers`<br>
`POST /subscribers`<br>
`DELETE /subscribers`<br>
`GET /subscribers/:id`<br>
`PATCH /subscribers/:id`<br>
`DELETE /subscribers/:id`

##### users

`GET /users`<br>
`POST /users`<br>
`DELETE /users`<br>
`GET /users/:id`<br>
`PATCH /users/:id`<br>
`DELETE /users/:id`<br>
`PATCH /users/me/photo`<br>
`PATCH /users/me/password`

#### Query examples

##### Get all posts:

> [meranda-14351.herokuapp.com/api/posts](https://meranda-14351.herokuapp.com/api/posts)

##### Get post by id:

> [meranda-14351.herokuapp.com/api/posts/1](https://meranda-14351.herokuapp.com/api/posts/1)
