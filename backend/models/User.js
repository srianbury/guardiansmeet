const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  viewed: { type: Boolean, default: false },
  name: { type: String }
});

const messageSchema = new mongoose.Schema({
  message: { type: String },
  sender: { type: String },
  timestamp: { type: String }
});

const matchedSchema = new mongoose.Schema({
  username: { type: String },
  id: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  age: { type: String },
  preference: { type: String },
  bio: { type: String },
  profilePicture: { type: String },
  notifications: { type: [notificationSchema], default: undefined },
  messages: { type: [messageSchema], default: undefined },
  matched: { type: [matchedSchema], default: undefined }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
