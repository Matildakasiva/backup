import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('http://localhost:5555/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        setSuccessMessage(`Registration successful! Welcome, ${formData.username}!`);
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'user'
        });
        
        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Adjust the delay as needed (2 seconds here)
      } else {
        console.error('Registration failed:', data);
        setSuccessMessage(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setSuccessMessage('Error during registration. Please try again later.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      margin: 0
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, fontWeight: 'bold', color: '#333' }}>Register</h2>
        {successMessage && (
          <p style={{ color: successMessage.startsWith('Registration successful') ? 'green' : 'red', fontWeight: 'bold' }}>
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}>
          <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              padding: 10,
              marginBottom: 20,
              border: '1px solid #ccc',
              borderRadius: 5,
              width: '100%'
            }}
          />
          <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: 10,
              marginBottom: 20,
              border: '1px solid #ccc',
              borderRadius: 5,
              width: '100%'
            }}
          />
          <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: 10,
              marginBottom: 20,
              border: '1px solid #ccc',
              borderRadius: 5,
              width: '100%'
            }}
          />
          <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              padding: 10,
              marginBottom: 20,
              border: '1px solid #ccc',
              borderRadius: 5,
              width: '100%'
            }}
          >
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>
          <button type="submit" style={{
            padding: 10,
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;


