const Message = require("../models/message");

// Send a message
const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;

  try {
    const message = await Message.create({
      sender: req.user,
      receiver,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { sendMessage, getMessages };
