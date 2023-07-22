[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

### [ссылка на репозиторий](https://github.com/Art-Frich/express-mesto-gha)
## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm run dev_i` — запускает сервер с hot-reload и в режиме inspect

## О проекте

Служит для отработки навыков работы с Express & Node.js & MongoDB & Postman

# API Documentation

### Get All Users

- **Method:** GET
- **Endpoint:** /users
- **Description:** Get all users from the database.
- **Response:**
  - Success (200 OK): Array of user objects.
  - Error (500 Internal Server Error): Default error message.

### Create User

- **Method:** POST
- **Endpoint:** /users
- **Description:** Create a new user with provided data (name, about, avatar) in the request body.
- **Request Body:** JSON object with name, about, and avatar properties.
- **Response:**
  - Success (200 OK): Created user object.
  - Error (400 Bad Request): Invalid data provided.
  - Error (500 Internal Server Error): Default error message.

### Get User by ID

- **Method:** GET
- **Endpoint:** /users/:userId
- **Description:** Get a user by their ID (_id).
- **Response:**
  - Success (200 OK): User object.
  - Error (404 Not Found): User with the specified ID not found.
  - Error (500 Internal Server Error): Default error message.

### Update User Profile

- **Method:** PATCH
- **Endpoint:** /users/me
- **Description:** Update user profile information.
- **Request Body:** JSON object with name and about properties.
- **Response:**
  - Success (200 OK): Updated user object.
  - Error (400 Bad Request): Invalid data provided.
  - Error (404 Not Found): User with the specified ID not found.
  - Error (500 Internal Server Error): Default error message.

### Update User Avatar

- **Method:** PATCH
- **Endpoint:** /users/me/avatar
- **Description:** Update user avatar.
- **Request Body:** JSON object with link property.
- **Response:**
  - Success (200 OK): Updated user object.
  - Error (400 Bad Request): Invalid data provided.
  - Error (404 Not Found): User with the specified ID not found.
  - Error (500 Internal Server Error): Default error message.

## Cards

### Get All Cards

- **Method:** GET
- **Endpoint:** /cards
- **Description:** Get all cards from the database.
- **Response:**
  - Success (200 OK): Array of card objects.
  - Error (500 Internal Server Error): Default error message.

### Create Card

- **Method:** POST
- **Endpoint:** /cards
- **Description:** Create a new card with provided data (name, link, owner) in the request body.
- **Request Body:** JSON object with name, link, and owner properties.
- **Response:**
  - Success (200 OK): Created card object.
  - Error (400 Bad Request): Invalid data provided.
  - Error (500 Internal Server Error): Default error message.

### Delete Card

- **Method:** DELETE
- **Endpoint:** /cards/:cardId
- **Description:** Delete a card by its ID (_id).
- **Response:**
  - Success (200 OK): Deleted card object.
  - Error (404 Not Found): Card with the specified ID not found.

### Add Like to Card

- **Method:** PUT
- **Endpoint:** /cards/:cardId/likes
- **Description:** Add a like to a card by its ID (_id).
- **Response:**
  - Success (200 OK): Updated card object with added like.
  - Error (400 Bad Request): Invalid data provided for adding like.
  - Error (404 Not Found): Card with the specified ID not found.
  - Error (500 Internal Server Error): Default error message.

### Remove Like from Card

- **Method:** DELETE
- **Endpoint:** /cards/:cardId/likes
- **Description:** Remove a like from a card by its ID (_id).
- **Response:**
  - Success (200 OK): Updated card object with removed like.
  - Error (400 Bad Request): Invalid data provided for removing like.
  - Error (404 Not Found): Card with the specified ID not found.
  - Error (500 Internal Server Error): Default error message.

