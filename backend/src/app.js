const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db'); // Import DB config
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const skillRoutes = require('./routes/skillRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

// Initialize Database Connection
connectDB();

const app = express();

// ─── Security ───────────────────────────────────────────────
app.use(helmet());

// ─── CORS ───────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      'http://localhost:5173', 
      'http://localhost:5174',
      'https://yamlak-negash.vercel.app',
      'https://yamlak-cms.vercel.app',
      'https://myportfolio-iota-six-18.vercel.app',
      process.env.FRONTEND_URL,
      process.env.CMS_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── UI Route (Preview) ─────────────────────────────────────
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <title>Portfolio Backend API 🚀</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Space Grotesk', sans-serif; background: #060e20; color: #dee5ff; }
      .glass-card { background: rgba(25, 37, 64, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
      .primary-gradient { background: linear-gradient(135deg, #0070eb 0%, #85adff 100%); }
      .gradient-text { background: linear-gradient(135deg, #85adff 0%, #0070eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
  </head>
  <body class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-5xl w-full">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold gradient-text mb-4">Portfolio Backend API 🚀</h1>
        <p class="text-gray-400 text-lg">System Status: Operational</p>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="glass-card rounded-2xl p-6 transition"><h2 class="text-xl font-semibold mb-3 text-blue-300">Projects</h2><a href="/api/projects" class="primary-gradient px-4 py-2 rounded-lg text-white inline-block">View Endpoint</a></div>
        <div class="glass-card rounded-2xl p-6 transition"><h2 class="text-xl font-semibold mb-3 text-blue-300">Experience</h2><a href="/api/experience" class="primary-gradient px-4 py-2 rounded-lg text-white inline-block">View Endpoint</a></div>
      </div>
    </div>
  </body>
  </html>
  `);
});

// ─── Rate Limiting ──────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ─── Body Parsing & Logging ─────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running 🚀',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected'
  });
});

// ─── API Routes ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/about', aboutRoutes);

// ─── Error Handlers ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});
app.use(errorHandler);

module.exports = app;