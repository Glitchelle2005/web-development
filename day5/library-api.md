# Library Books API

Base path: `/books`

## Endpoints

- **List books**
  - Method: `GET`
  - Path: `/books`
  - Description: Returns all books in the library.
  - Success status: `200 OK`

- **Get one book**
  - Method: `GET`
  - Path: `/books/{bookId}`
  - Description: Returns the book with the specified ID.
  - Success status: `200 OK`

- **Create a book**
  - Method: `POST`
  - Path: `/books`
  - Description: Adds a new book to the library.
  - Example request body:
    ```json
    {
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "publishedYear": 1937
    }
    ```
  - Success status: `201 Created`

- **Update a book**
  - Method: `PUT`
  - Path: `/books/{bookId}`
  - Description: Replaces the details of the book with the specified ID.
  - Example request body:
    ```json
    {
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "publishedYear": 1937
    }
    ```
  - Success status: `200 OK`

- **Delete a book**
  - Method: `DELETE`
  - Path: `/books/{bookId}`
  - Description: Removes the book with the specified ID.
  - Success status: `204 No Content`

- **List books by author**
  - Method: `GET`
  - Path: `/books?author={authorName}`
  - Description: Returns books whose author matches the `author` query parameter.
  - Example request: `GET /books?author=J.R.R.%20Tolkien`
  - Success status: `200 OK`

## Error responses

- `400 Bad Request`: The request body is missing a required field, such as the book title when creating a book.
- `404 Not Found`: The requested book ID does not exist, such as when requesting `GET /books/999`.
