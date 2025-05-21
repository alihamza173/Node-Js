// Already existing setup
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
 
// In-memory store (like a fake database for now)
let userData = [];

app.post('/api/save', (req, res) => {
  const { name, email, age, address } = req.body;

  if (!name || !email || !age || !address) { 
    return res.status(400).json({ message: 'FormData is required' });
  }

  // Check if email already exists
  const emailExists = userData.some(user => user.email === email);
  if (emailExists) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  userData.push({ name, email, age, address });

  res.status(200).json({ message: 'User data saved successfully!' });
});

app.get('/api/users', (req, res) => {
  res.json({ users: userData });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
