const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/message_tracker', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define schema for messages
const messageSchema = new mongoose.Schema({
  user_id: String,
  message_content: String,
  message_timestamp: Date
});

const Message = mongoose.model('Message', messageSchema);

// Middleware to limit daily messages
app.use(async (req, res, next) => {
  const userId = req.body.user_id; // Assuming user ID is included in the request body
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'days');
  const messageCount = await Message.countDocuments({
    user_id: userId,
    message_timestamp: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    }
  });
  if (messageCount >= 5) { // Limiting to 5 messages per day
    return res.status(403).json({ success: false, message: 'Daily message limit exceeded' });
  }
  next();
});

// API endpoint to send messages
app.post('/send-message', async (req, res) => {
  const { user_id, message_content } = req.body;
  const message = new Message({
    user_id,
    message_content,
    message_timestamp: new Date()
  });
  try {
    await message.save();
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
