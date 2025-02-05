# ConvoMate Chat App - Server

## Overview
The **ConvoMate Chat App** server is a Node.js-based backend that manages real-time chat communication using **Socket.IO** and REST APIs. It handles user authentication, message storage, and chat room management using **MongoDB** as the database.

## Features
- User authentication (registration, login, JWT-based authentication)
- Real-time chat using **Socket.IO**
- Persistent message storage in **MongoDB**
- Chat room creation and management
- Secure password hashing
- RESTful API endpoints for managing users, messages, and rooms

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud-based)
- **npm** (or yarn)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/EngSeif/ConvoMate-chat-app.git
   ```

2. Navigate to the server directory:
   ```sh
   cd ConvoMate-chat-app/Server_Nodejs
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add the required environment variables (see `.env.example`).

5. Start the server:
   ```sh
   npm start
   ```
   or for development mode:
   ```sh
   npm run dev
   ```

## Configuration
Create a `.env` file and configure the following:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints
### User Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate a user and get a token

### Chat Rooms
- **GET** `/api/rooms` - Get all chat rooms
- **POST** `/api/rooms` - Create a new chat room

### Messages
- **GET** `/api/messages/:roomId` - Get messages for a room
- **POST** `/api/messages` - Send a message

## WebSocket Events
- `connection` - Triggered when a user connects
- `joinRoom` - User joins a chat room
- `chatMessage` - User sends a message
- `disconnect` - User disconnects

## Deployment
1. Build the project:
   ```sh
   npm run build
   ```

2. Use **PM2** for process management:
   ```sh
   pm2 start app.js
   ```

3. Deploy to a cloud provider like **Heroku, AWS, or DigitalOcean**.

## Contributing
Feel free to contribute by submitting pull requests or opening issues.

## License
This project is licensed under the **MIT License**.
