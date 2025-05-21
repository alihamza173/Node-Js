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
  const [showModal, setShowModal] = useState(false);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data.users || []);
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
      setShowModal(false);
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
  const fabStyle = {
    position: "fixed" as "fixed",
    bottom: "32px",
    right: "32px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#1976d2",
    color: "#fff",
    fontSize: "36px",
    border: "none",
    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
    cursor: "pointer",
    zIndex: 1001
  };

  const modalOverlayStyle = {
    position: "fixed" as "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  };

  const modalCardStyle = {
    width: "90%",
    maxWidth: "400px",
    padding: "32px 28px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    background: "#fff",
    position: "relative" as "relative"
  };

  const closeBtnStyle = {
    position: "absolute" as "absolute",
    top: "12px",
    right: "18px",
    background: "none",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#888"
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
  padding: "12px 28px",
  background: "linear-gradient(90deg, #1976d2 60%, #2196f3 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "17px",
  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
  transition: "background 0.2s"
};
  const userListStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "40px auto",
    padding: "24px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    background: "#fff",
    boxSizing: "border-box" as const
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "#f5f7fa",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      {/* Modal for form */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalCardStyle}>
            <button style={closeBtnStyle} onClick={() => setShowModal(false)} title="Close">&times;</button>
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
        </div>
      )}

      {/* No users: Centered message and button */}
      {users.length === 0 ? (
        <div style={{
          background: "#fff",
          padding: "48px 36px",
          borderRadius: "14px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          textAlign: "center"
        }}>
          <h2>No users yet</h2>
          <p style={{ marginBottom: "28px" }}>Add some data to get started!</p>
          <button style={buttonStyle} onClick={() => setShowModal(true)}>
            Add Details
          </button>
        </div>
      ) : (
        <>
          {/* User List */}
          <div style={{
  ...userListStyle,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}}>
  <h3 style={{ textAlign: "center", marginBottom: "18px" }}>All Users</h3>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px",
      width: "100%",
      justifyItems: "center"
    }}
  >
    {users.map((user: any, idx: number) => (
      <div
        key={idx}
        style={{
          background: "#f7faff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          padding: "18px 16px",
          // minWidth: "0",
          width: "100%",
          // maxWidth: "180px",
          wordBreak: "break-word"
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{user.name}</div>
        <div style={{ fontSize: 14, color: "#555" }}>{user.email}</div>
        <div style={{ fontSize: 14 }}>Age: {user.age}</div>
        <div style={{ fontSize: 14 }}>{user.address}</div>
      </div>
    ))}
  </div>
</div>
          {/* Floating Action Button */}
          <button style={fabStyle} onClick={() => setShowModal(true)} title="Add User">
            +
          </button>
        </>
      )}
    </div>
  );
}

export default App;