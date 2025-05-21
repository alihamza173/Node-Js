import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: ''
  });
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      // console.log('Fetched users:', res.data);
      
      setUsers(res.data.users || []);
      // console.log('Fetched users:', res.data.users);
      // console.log('Users state:', users);
      
      
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/save', formData);
      setFormData({
        name: '',
        email: '',
        age: '',
        address: ''
      });
      fetchUsers(); // Refresh user list after submission
      alert(res.data.message);
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message || 'Server error');
      } else if (err.request) {
        alert('No response from server');
      } else {
        alert('Error: ' + err.message);
      }
      console.error(err);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    background: "#f5f7fa",
    fontFamily: "Arial"
  } as React.CSSProperties;

  const cardStyle = {
    maxWidth: "400px",
    margin: "60px 24px 60px 0",
    padding: "32px 28px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    background: "#fff"
  };
  const labelStyle = { fontWeight: 600, marginBottom: "4px", display: "block" };
  const inputStyle = {
    padding: "8px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "16px",
    fontSize: "15px"
  };
  const buttonStyle = {
    padding: "10px 20px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "16px"
  };
  const userListStyle = {
    minWidth: "350px",
    margin: "60px 0 60px 24px",
    padding: "32px 28px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    background: "#fff"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Enter your name"
          />

          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Enter your email"
          />

          <label style={labelStyle}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Enter your age"
            min={1}
          />

          <label style={labelStyle}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Enter your address"
          />

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
      <div style={userListStyle}>
        <h3 style={{ textAlign: "center", marginBottom: "18px" }}>All Users</h3>
        {users.length === 0 ? (
          <p style={{ textAlign: "center" }}>No users yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((user: any, idx: number) => (
              <li key={idx} style={{ marginBottom: "18px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <strong>Name:</strong> {user.name}<br />
                <strong>Email:</strong> {user.email}<br />
                <strong>Age:</strong> {user.age}<br />
                <strong>Address:</strong> {user.address}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;