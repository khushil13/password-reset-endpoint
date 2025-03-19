const express = require('express');
const mongoose = require('mongoose');
const User = require('./schema'); 

const app = express();
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:3000/passwordReset') 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json()); 

app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email cannot be empty" });
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
        return res.status(400).json({ error: "Password length should be greater than 8 or less than or equal to 16" });
    }

    const user = new User({ email, newPassword });
    user.save()
        .then(() => res.status(200).json({ message: "Password reset successfully" }))
        .catch(err => res.status(500).json({ error: "Error saving user data" }));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
