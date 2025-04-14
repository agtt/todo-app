# Todo Application

A modern Todo application built with Next.js, TypeScript, tRPC, and MongoDB.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Persistent storage
- Clean and intuitive UI
- Type-safe API with tRPC

## Tech Stack

- Next.js
- TypeScript
- tRPC
- MongoDB
- Docker
- Bun

## Prerequisites

- Docker and Docker Compose
- Git

### Using Docker

1. Clone the repository:

```bash
git clone https://github.com/agtt/todo-app
cd todo
```

2. Create .env.local file

```
DATABASE_URL=mongodb://mongo:27017/todo-banzai
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Start the application:

```bash
docker compose up --build -d
```

or

```bash
docker compose up
```

Note: For older versions of Docker, use `docker-compose` instead of `docker compose`.

The application will be available at `http://localhost:3000`

## Development

- Development server runs on port 3000
- MongoDB runs on port 27017
- Hot reloading enabled
- Type checking enabled

## Testing

Run tests with:

```bash
bun run test
```
