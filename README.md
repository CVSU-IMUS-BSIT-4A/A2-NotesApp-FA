# Personal Notes Application

A full-stack personal notes application with user authentication, built with NestJS (backend) and React (frontend).

## Features

- 🔐 User authentication (Register/Login) with JWT
- 📝 Create, edit, delete, and archive personal notes
- 🔍 Search and filter notes
- 📱 Responsive design for mobile and desktop
- 🛡️ Secure API with protected routes
- 🎨 Modern UI with intuitive user experience

## Technology Stack

### Backend
- NestJS with TypeScript
- MySQL Database
- JWT Authentication
- TypeORM
- bcryptjs for password hashing

### Frontend
- React 18 with TypeScript
- React Router DOM
- Axios for API calls
- Context API for state management
- Custom CSS with responsive design

## Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- npm

### Setup

1. **Run the setup script:**
   ```bash
   # Linux/Mac
   chmod +x setup.sh && ./setup.sh
   
   # Windows
   setup.bat
   ```

2. **Configure database:**
   - Edit `backend/.env` with your MySQL credentials
   - Create database: `CREATE DATABASE notes_db;`

3. **Start the applications:**
   ```bash
   # Backend (Terminal 1)
   cd backend && npm run start:dev
   
   # Frontend (Terminal 2)
   cd frontend && npm start
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Project Structure

```
Act2-Notes/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── users/    # Users module
│   │   ├── notes/    # Notes module
│   │   └── ...
├── frontend/         # React App
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── ...
├── setup.sh         # Linux/Mac setup
├── setup.bat        # Windows setup
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile

### Notes (Protected)
- `GET /notes` - Get all user notes
- `POST /notes` - Create note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `PATCH /notes/:id/archive` - Archive note

## Usage

1. Register a new account or login
2. Create notes with title and content
3. Search notes using the search bar
4. Filter notes by status (All/Active/Archived)
5. Edit, archive, or delete notes as needed

## Development

- Backend runs on port 3001 with hot reload
- Frontend runs on port 3000 with hot reload
- Database tables are auto-created in development mode

For detailed documentation, see [Activity-Document.md](Activity-Document.md).
