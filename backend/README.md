# Web Blog Backend
This backend application is built using Express.js and provides endpoints for managing posts in a music blog. It includes authentication using JSON Web Tokens (JWT) and supports CRUD operations for posts.

## Setup
1. **Clone the repository**
2. **Install dependencies by running:**<br>
  `npm install`<br>
  `npm install express`<br>
  `npm install pg`<br>
  `npm install jsonwebtoken`<br>
  `npm install cors`<br>
  `npm install express-validator`<br>

3. **Create your own vercel Project** <br>
<a href='https://www.youtube.com/watch?v=LZQ5n4PK1jM'>This tutorial</a> was used to deploy
a node js api into vercel (web service) with a postgresql database

3.1. **Vercel Implementation**<br>
The vercel.json file created during the tutorial is already in the repository, as well as the spceial pool implementation for pg.
This project uses the port 5000 and the postgres url link provided by vercel both inside a .env file that's not in this repository. However, if you want to make it yourself it gas the following parameters:<br>
- `PORT="5000"` <br>
- `POSTGRES_URL="************"`<br>

3.2. **Postgresql schema**<br>
in this respository an unused file called schema.sql contains all the necessary queries for the construction of a database that's compatible with this project.

3.3. **Recomendations if you want to run it**<br>
Don't forget to set the POSTGRES_URL link as an enviroment variable inside of vercel, also dont forget to link the database storage and the project
in vercel or else it won't work. Finally, dont be scared to create redeployments if something doesn't work at first.

## Endpoints
- GET /posts: Retrieve all posts.<br>
- POST /login: Authenticate a user. Requires username and password in the request body and returns token.<br>
- POST /create: Create a new post. Requires authentication and the following fields in the request body: name, album, artist, music, cover_art, content, rank, album_date.<br>
- POST /update: Update an existing post. Requires authentication and the following fields in the request body: id, name, album, artist, music, cover_art, content, rank, album_date.<br>
- DELETE /delete/:postId: Delete a post by ID. Requires authentication.<br>
### Authentication: 
Authentication is implemented using JWT:
The /login endpoint authenticates a user and returns an access token.<br>
The access token should be included in the Authorization header for authenticated endpoints.
### Validation
Request body validation is implemented using Express Validator middleware.
Fields are validated for presence and format as specified in the endpoint descriptions.
### CORS
CORS is enabled for all endpoints to allow cross-origin requests from any origin.
Allowed methods: GET, POST, DELETE.
Allowed headers: Content-Type, Authorization.
### Error Handling
Errors are handled and appropriate status codes and error messages are returned for different scenarios.
Internal server errors return a status code of 500 and an error message.
## Dependencies
Express.js: Web framework for Node.js.<br>
CORS: Middleware for enabling CORS in Express.<br>
Express Validator: Middleware for validating request data.<br>
JSON Web Token (JWT): Library for generating and verifying JWT tokens.<br>
## API
As it as mentioned before, the current project runs on an already deployed vercel api.
The necesary link for the http requests is the following:<br>
`https://web-blog-inky.vercel.app/`
