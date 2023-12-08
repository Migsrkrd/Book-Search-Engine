# Book-Search-Engine

This project is a MERN (MongoDB, Express.js, React, Node.js) stack application that utilizes GraphQL for handling user authentication and book management functionalities.

## Table of Contents

- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [GraphQL API](#graphql-api)
- [Front-End Usage](#front-end-usage)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)

![Alt text](<client/public/Screenshot 2023-12-07 193855.png>)

## Key Features

- **User Authentication:** Sign up and sign in functionalities.
- **Book Search:** Users can search for books using the Google Books API.
- **Save and Remove Books:** Authenticated users can save books to their profile and remove them.

## Project Structure

- `client`: Contains the React front-end application.
- `server`: Contains all server-side functionality.
- `models`: Defines the Mongoose schema for the User model.
- `schemas`: Contains GraphQL typedefs and resolvers.
- `utils`: Includes utility functions, such as authentication middleware and token signing.

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install Dependencies:**

    ```bash
    npm run install
    ```

3. **Set up MongoDB:**
   
    Ensure that MongoDB is installed and running. Update the connection string in `server/config/connection.js` if needed.

5. **Start the Development Server:**

    ```bash
    npm run develop
    ```

## GraphQL API

- **GraphQL Playground:**
    Visit `http://localhost:3001/graphql` to explore and interact with the GraphQL API.

### Available Queries

- `me`: Retrieve the authenticated user's information.(Be sure to include proper headers)


### Available Mutations

- `addUser`: Sign up a new user.
- `login`: Sign in an existing user.
- `saveBook`: Save a book to the user's profile.
- `removeBook`: Remove a book from the user's saved books.

## Front-End Usage

- `SearchBooks.jsx`: Component for searching and displaying books.
- `SavedBooks.jsx`: Component for displaying and removing saved books.
- `SignUpForm.jsx`: Component for user registration.
- `LoginForm.jsx`: Component for user login.

## Technologies Used

- **Front-End:** React, Apollo Client
- **Back-End:** Node.js, Express.js, Apollo Server, GraphQL
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)

## Contributors

- [Michael-Reickerd](https://github.com/Migsrkrd)
