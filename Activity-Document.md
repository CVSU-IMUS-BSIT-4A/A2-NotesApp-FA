# Activity 2: Personal Notes API + UI

## Description

A comprehensive personal notes application with user authentication that allows users to create, manage, and organize their private notes. The application features a secure backend API built with NestJS and TypeScript, connected to a MySQL database, and a modern React frontend with TypeScript for an intuitive user experience.

### What the App Does

- **User Authentication**: Secure registration and login system with JWT tokens
- **Personal Notes Management**: Create, edit, delete, and archive personal notes
- **Search & Filter**: Find notes quickly with search functionality and filter by status
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Updates**: Immediate reflection of changes without page refreshes
- **Secure Access**: All notes are private to each user with protected API endpoints

## Technology Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: MySQL 8+
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs for hashing
- **Validation**: class-validator and class-transformer
- **ORM**: TypeORM for database operations

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API

## Features

### Backend Features
- JWT-based authentication with secure token handling
- User registration and login endpoints
- Protected routes requiring authentication
- CRUD operations for notes (Create, Read, Update, Delete)
- Note archiving/unarchiving functionality
- User-specific note access (users can only access their own notes)
- Input validation and error handling
- CORS configuration for frontend integration

### Frontend Features
- User registration and login forms with validation
- Protected routes and automatic redirects
- Dashboard with notes overview and statistics
- Create and edit notes with modal forms
- Search notes by title or content
- Filter notes by status (All, Active, Archived)
- Archive/unarchive notes functionality
- Delete notes with confirmation
- Responsive design for mobile and desktop
- Loading states and error handling
- Automatic token refresh validation

## Project Structure

```
Act2-Notes/
├── backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-auth.guard.ts
│   │   ├── users/          # Users module
│   │   │   ├── entities/   # User entity
│   │   │   ├── dto/        # User DTOs
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── notes/          # Notes module
│   │   │   ├── entities/   # Note entity
│   │   │   ├── dto/        # Note DTOs
│   │   │   ├── notes.controller.ts
│   │   │   ├── notes.service.ts
│   │   │   └── notes.module.ts
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── env.sample          # Environment variables template
│   └── README.md
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx         # Main app component
│   │   ├── App.css
│   │   ├── index.tsx       # React entry point
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── setup.sh                # Linux/Mac setup script
├── setup.bat               # Windows setup script
├── README.md               # Main project README
└── Activity-Document.md    # This document
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Notes Table
```sql
CREATE TABLE notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    isArchived BOOLEAN DEFAULT FALSE,
    userId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## API Endpoints

### Authentication Endpoints
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token
- `GET /auth/profile` - Get current user profile (protected)

### Notes Endpoints (All Protected)
- `GET /notes` - Get all user's notes
- `POST /notes` - Create a new note
- `GET /notes/:id` - Get specific note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `PATCH /notes/:id/archive` - Archive note
- `PATCH /notes/:id/unarchive` - Unarchive note

## How to Run the Project

### Prerequisites
- Node.js (version 16 or higher)
- MySQL (version 8 or higher)
- npm or yarn package manager

### Quick Setup

#### Option 1: Using Setup Scripts
```bash
# For Linux/Mac users:
chmod +x setup.sh
./setup.sh

# For Windows users:
setup.bat
```

#### Option 2: Manual Setup

1. **Clone and navigate to the project directory**
```bash
cd Act2-Notes
```

2. **Setup Backend**
```bash
cd backend
npm install
cp env.sample .env
```

3. **Configure Environment Variables**
Edit `backend/.env` file with your settings:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=notes_db
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRES_IN=24h
PORT=3001
NODE_ENV=development
```

4. **Create MySQL Database**
```sql
CREATE DATABASE notes_db;
```

5. **Setup Frontend**
```bash
cd ../frontend
npm install
```

6. **Start the Applications**

In one terminal (Backend):
```bash
cd backend
npm run start:dev
```

In another terminal (Frontend):
```bash
cd frontend
npm start
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: Available through the NestJS endpoints

## Usage Instructions

1. **Registration**: Create a new account with email, password, and name
2. **Login**: Sign in with your credentials to access your notes
3. **Dashboard**: View all your notes with search and filter options
4. **Create Notes**: Click "New Note" to create a note with title and content
5. **Edit Notes**: Click "Edit" on any note to modify it
6. **Archive Notes**: Use "Archive" to hide notes from the main view
7. **Search**: Use the search bar to find notes by title or content
8. **Filter**: Use filter buttons to view All, Active, or Archived notes
9. **Delete**: Remove notes permanently with confirmation

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Automatic token expiration handling
- User-specific data access control

## Development Notes

- The backend uses TypeORM for automatic database table creation in development mode
- Frontend includes proxy configuration for seamless API communication
- Both applications include hot reload for development
- Comprehensive error handling and user feedback
- Responsive design works on mobile and desktop devices

## Future Enhancements

Potential improvements for the application:
- Note categories and tags
- Rich text editor for note content
- File attachments
- Note sharing capabilities
- Export functionality
- Dark mode theme
- Email notifications
- Advanced search with filters
- Note templates
