import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection after logging out

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session && session.accessToken;
        const response = await axios.get('http://127.0.0.1:5555/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    const username = user ? user.username : 'User';
    localStorage.removeItem('session');
    alert(`${username} logged out`);
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  if (!user) return <div className="text-center">No user data available</div>;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="text-center p-4 shadow-sm user-profile-card">
            <Card.Body>
              <PersonIcon fontSize="large" style={{ fontSize: 100, color: '#a74caf' }} />
              <Card.Title className="my-3">{user.username}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Role:</strong> {user.role}
              </Card.Text>
              <Button className="btn-custom" onClick={handleLogout}>Logout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
