# FYP Backend - Express.js with MongoDB

A backend server built with Express.js and MongoDB using Mongoose for the FYP project.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/fyp
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

## Project Structure

```
Backend/
├── config/
│   └── database.js          # MongoDB connection setup
├── models/
│   └── User.js              # User schema
├── routes/
│   ├── users.js             # User endpoints
│   └── auth.js              # Authentication endpoints
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── server.js                # Main server file
└── package.json             # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - Server health status

## Setup Requirements

- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

## Notes

- Passwords are hashed using bcryptjs before saving
- JWT is used for authentication
- CORS is enabled for frontend communication
- All endpoints include error handling
