import React, { useState, useEffect} from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';
// import UserContext from '../context/UserContext';

export default function UpdateProfile() {
    const notyf = new Notyf();
    // const { user } = useContext(UserContext);
    
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setDetails(data);
                } else {
                    notyf.error(data.message || "Failed to load user details.");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                notyf.error("An error occurred while fetching user details. Please try again.");
            }
        };

        fetchUserDetails();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    firstName: details.firstName,
                    lastName: details.lastName,
                    mobileNo: details.mobileNo
                })
            });

            const data = await response.json();
            if (response.ok) {
                setDetails(data);
                notyf.success("Profile updated successfully.");
            } else {
                throw new Error(data.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('An error occurred while updating the profile. Please try again.');
            notyf.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <h2>Update Profile</h2>
                    <Form onSubmit={handleProfileUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={details.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={details.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={details.email}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobileNo"
                                value={details.mobileNo}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSaving}>
                            {isSaving ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Container>
    );
}
