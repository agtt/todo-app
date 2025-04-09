# Todo App - Banzai

A modern todo application built with Next.js, TypeScript, and MongoDB. Features include adding, toggling, and deleting todos with persistent storage.

## Prerequisites

- Node.js 18+ or Bun
- MongoDB running locally or accessible via connection string

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory with the following content:

   ```
   DATABASE_URL=mongodb://localhost:27017/todo-banzai
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Persistent storage using MongoDB
- Modern UI with Tailwind CSS
- Type-safe with TypeScript

## Tech Stack

- Next.js 15
- TypeScript
- MongoDB
- Tailwind CSS
- React 19
