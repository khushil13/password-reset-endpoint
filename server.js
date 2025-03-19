require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const User = require("./schema"); 

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email cannot be empty" });
  }
  if (newPassword.length < 8 || newPassword.length > 16) {
    return res.status(400).json({ error: "Password length should be between 8 and 16 characters" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
