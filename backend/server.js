// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connexion MongoDB
connectDB();

// Swagger
const { swaggerUi, specs } = require('./swagger');

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Middleware JSON
app.use(express.json());

// Routes API
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Export pour Vercel serverless
module.exports = app;

// Démarrer le serveur localement seulement
if (require.main === module) {
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
}
