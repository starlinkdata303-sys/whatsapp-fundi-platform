const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const socketIO = require('socket.io');
const http = require('http');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/fundi', require('./routes/fundi'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/whatsapp', require('./routes/whatsapp'));

// WebSocket Events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_chat', (data) => {
    socket.join(`chat_${data.chatId}`);
    console.log(`User joined chat: ${data.chatId}`);
  });

  socket.on('send_message', (data) => {
    io.to(`chat_${data.chatId}`).emit('receive_message', data);
  });

  socket.on('fundi_status_update', (data) => {
    io.emit('fundi_online', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`WhatsApp Fundi Platform server running on port ${PORT}`);
});

module.exports = { app, io };
