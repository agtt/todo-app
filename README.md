# Todo Application

A modern Todo application built with Next.js, TypeScript, tRPC, and MongoDB.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Persistent storage
- Clean and intuitive UI
- Type-safe API with tRPC
- Email notifications with Resend

## Tech Stack

- Next.js
- TypeScript
- tRPC
- MongoDB
- Docker
- Bun
- Resend (Email Provider)

## Prerequisites

- Docker and Docker Compose
- Git

### Using Docker

1. Clone the repository:

```bash
git clone https://github.com/agtt/todo-app
cd todo-app
```

2. Create .env.local file

```
# Database Configuration
DATABASE_URL=mongodb://mongo:27017/todo-banzai
NEXT_PUBLIC_API_URL=http://localhost:3000

# Email Configuration (Resend)
MAIL_PROVIDER="resend"
MAIL_RESEND_API=your_resend_api_key
MAIL_FROM="your_verified_email@domain.com"
```

Note: You need to:

1. Sign up for a Resend account at https://resend.com
2. Get your API key from the Resend dashboard
3. Verify your sender email address in the Resend dashboard
4. Replace `your_resend_api_key` with your actual Resend API key
5. Replace `your_verified_email@domain.com` with your verified sender email address

6. Start the application:

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

1. Install packages;

```bash
bun install
```

2. Run Tests

```bash
bun run test
```
