## Description

This is a backend API service for a project management application inspired by Trello.

### Key Features

* Board management (creation, editing)

* List organization (creating, ordering, and customizing lists)

* Card handling (creation, updating, moving between lists)

* User authentication and authorization


## Instructions

### Authentication
1. Sign up a new user with the user.signup request
2. Login with user.login using email and password
3. Copy the accessToken from login response and replace $accessToken placeholder in requests

### User Endpoints
Sign up
```bash
curl -s http://localhost:3000/api/v1/trpc/user.signup \
-H 'Content-Type: application/json' \
-d '{"json": {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "yourpassword"}}' | jq
```

Login
```bash
curl -s http://localhost:3000/api/v1/trpc/user.login \
-H 'Content-Type: application/json' \
-d '{"json": {"email": "john.doe@example.com", "password": "yourpassword"}}' | jq
```

### Board Endpoints

Get all boards
```bash
curl -s http://localhost:3000/api/v1/trpc/board.findAll \
-H 'Content-Type: application/json' | jq
```

Create board
```bash
curl -s http://localhost:3000/api/v1/trpc/board.create \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"title": "New board"}}' | jq
```

Update board
```bash
curl -s http://localhost:3000/api/v1/trpc/board.update \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MTg0fSwiaWF0IjoxNzMwODg0OTg2LCJleHAiOjE3MzE0ODk3ODZ9.XW7Fbxe0oLa40pK_cDdejN6BKkyE7_vy5JFT4Q-VU0M' \
-d '{"json": {"title": "Updated board 1", "id": }}' | jq
```

Delete board
```bash
curl -s http://localhost:3000/api/v1/trpc/board.deleteById \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMjQ3fSwiaWF0IjoxNzMwODg1MDQyLCJleHAiOjE3MzE0ODk4NDJ9.kI-fY2wBzUwBpaJ2gpx76evdC7BDHItT1g4I0E7CC5U' \
-d '{"json": {"id": 9391}}' | jq
```

### List Endpoints

Get lists for a board
```bash
curl -s http://localhost:3000/api/v1/trpc/list.find \
-H 'Content-Type: application/json' \
-d '{"json": {"boardId": 1515}}' | jq
```

Create list:
```bash
curl -s http://localhost:3000/api/v1/trpc/list.create \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMjQ3fSwiaWF0IjoxNzMwODg1MDQyLCJleHAiOjE3MzE0ODk4NDJ9.kI-fY2wBzUwBpaJ2gpx76evdC7BDHItT1g4I0E7CC5U' \
-d '{"json": {"title": "Todo today", "boardId": 1515}}' | jq
```

Update list
```bash
curl -s http://localhost:3000/api/v1/trpc/list.update \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"title": "Updated list", "id": 1}}' | jq
```

Delete list
```bash
curl -s http://localhost:3000/api/v1/trpc/list.deleteById \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"id": 1}}' | jq
```

### Card Endpoints

Get cards for a list
```bash
curl -s http://localhost:3000/api/v1/trpc/card.find \
-H 'Content-Type: application/json' \
-d '{"json": {"listId": 1}}' | jq
```
Create card
```bash
curl -s http://localhost:3000/api/v1/trpc/card.create \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"title": "New card", "listId": 1}}' | jq
```

Update card title
```bash
curl -s http://localhost:3000/api/v1/trpc/card.update \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"id": 1, "title": "Updated card title"}}' | jq
```

Update card list
```bash
curl -s http://localhost:3000/api/v1/trpc/card.update \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"id": 1, "listId": 1}}' | jq
```

Delete card
```bash
curl -s http://localhost:3000/api/v1/trpc/card.deleteById \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $accessToken' \
-d '{"json": {"id": 1}}' | jq
```

## Setup

1. `npm install`
2. Create a PostgreSQL database (or use an existing one).
3. Setup `.env` file in `server` based on `.env.example` file.
4. Run migrations with `npm run migrate:latest`.

## Tests

```bash

# back end tests with an in-memory database
npm test -w server
```

## Running the project in development

```bash
# automatically restarts the server
npm run dev -w server

```

## Running the project in production


Server:

```bash
npm run build -w server
npm run start -w server
```
