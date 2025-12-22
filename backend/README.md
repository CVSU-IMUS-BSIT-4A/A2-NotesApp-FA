# Notes API Backend

A NestJS-based REST API for a personal notes application with user authentication.

## Features

- User registration and authentication with JWT
- CRUD operations for personal notes
- MySQL database integration
- Password hashing with bcryptjs
- Protected routes with JWT guards
- Note archiving functionality

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.sample .env
```
Edit `.env` with your database credentials and JWT secret.

3. Create MySQL database:
```sql
CREATE DATABASE notes_db;
```

4. Run the application:
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)

### Notes
- `GET /notes` - Get all user notes (protected)
- `POST /notes` - Create new note (protected)
- `GET /notes/:id` - Get specific note (protected)
- `PATCH /notes/:id` - Update note (protected)
- `DELETE /notes/:id` - Delete note (protected)
- `PATCH /notes/:id/archive` - Archive note (protected)
- `PATCH /notes/:id/unarchive` - Unarchive note (protected)

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- firstName
- lastName
- createdAt
- updatedAt

### Notes Table
- id (Primary Key)
- title
- content
- isArchived
- userId (Foreign Key)
- createdAt
- updatedAt
