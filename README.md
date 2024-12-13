backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js     # Handles authentication
│   │   ├── profileController.js  # CRUD for profiles
│   │   └── messageController.js  # Messaging logic
│   ├── models/
│   │   ├── user.js               # User schema
│   │   ├── profile.js            # Profile schema
│   │   └── message.js            # Message schema
│   ├── routes/
│   │   ├── authRoutes.js         # Routes for auth
│   │   ├── profileRoutes.js      # Routes for profiles
│   │   └── messageRoutes.js      # Routes for messaging
│   ├── services/
│   │   ├── authService.js        # Authentication logic
│   │   └── profileService.js     # Profile-related logic
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT middleware
│   ├── app.js                    # Express app setup
│   └── server.js                 # Entry point
├── config/
│   ├── db.js                     # MongoDB connection
│   └── env.js                    # Environment variables
├── package.json
└── README.md



Auth Endpoints:

POST /api/auth/register: Register a new user.
POST /api/auth/login: Login to get a token.
Profile Endpoints:

GET /api/profiles: Get all profiles.
GET /api/profiles/:id: Get a specific profile (protected).
POST /api/profiles: Create or update a profile (protected).
Message Endpoints:

POST /api/messages: Send a message (protected).
GET /api/messages/:userId: Get messages with a user (protected).
