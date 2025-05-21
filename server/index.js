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
//   console.log('Received body:', req.body); // Add this line
  const { name, email,age,address } = req.body;

  if (!name || !email || !age || !address) {
    return res.status(400).json({ message: 'FoemData is required' });
  }

  userData.push({ name, email, age, address });
//   console.log('User saved:', { name, email, age, address }); // Add this line

  res.status(200).json({ message: 'User data saved successfully!' });
});

app.get('/api/users', (req, res) => {
  res.json({ users: userData });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
