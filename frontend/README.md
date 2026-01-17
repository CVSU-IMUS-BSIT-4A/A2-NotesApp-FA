# Notes Frontend

A React-based frontend for the personal notes application with user authentication.

## Features

- User registration and login
- JWT token-based authentication
- Create, edit, delete, and archive notes
- Search and filter notes
- Responsive design
- Real-time note management
- Protected routes

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:3001
```

3. Start the development server:
```bash
npm start
```

The application will open at http://localhost:3000

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
  components/          # React components
    Auth.css          # Authentication styles
    Dashboard.css     # Dashboard styles
    Dashboard.tsx     # Main dashboard component
    Login.tsx         # Login form component
    NoteCard.tsx      # Individual note display
    NoteForm.tsx      # Note creation/editing form
    ProtectedRoute.tsx # Route protection component
    Register.tsx      # Registration form component
  contexts/           # React contexts
    AuthContext.tsx   # Authentication context
  services/           # API services
    api.ts           # API client and endpoints
  types/              # TypeScript type definitions
    index.ts         # Application types
  App.tsx             # Main application component
  index.tsx           # Application entry point
```

## Key Features

### Authentication
- JWT token storage in localStorage
- Automatic token refresh validation
- Protected routes for authenticated users
- Automatic redirect on token expiration

### Notes Management
- Create new notes with title and content
- Edit existing notes
- Delete notes with confirmation
- Archive/unarchive notes
- Search notes by title or content
- Filter notes by status (all/active/archived)

### UI/UX
- Modern, responsive design
- Loading states and error handling
- Form validation
- Intuitive navigation
- Mobile-friendly interface
