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

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/agtt/todo-app
cd todo
```

2. Start the application:

```bash
docker-compose up
```

The application will be available at `http://localhost:3000`

### Manual Setup

1. Install dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

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
