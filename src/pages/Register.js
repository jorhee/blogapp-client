import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Register() {
    const notyf = new Notyf();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    // Enable the submit button only when the form is valid
    useEffect(() => {
        if (
            userName !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            password === confirmPassword
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [userName, email, password, confirmPassword]);

    async function registerUser(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                notyf.success('Registration successful');
                setUserName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
            } else {
                notyf.error(data.message || 'Error registering user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            notyf.error('An error occurred. Please try again.');
        }
    }

    return user ? (
        <Navigate to="/login" />
    ) : (
        <Form onSubmit={registerUser} className="registration">
            <h1 className="mt-5 text-center">Register</h1>
            <div className="container p-4" style={{ maxWidth: '600px', border: '1px solid #ced4da' }}>
                <Form.Group className="my-3">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
            </div>
            <div className="container bg-info bg-gradient mb-3" style={{ maxWidth: '600px', border: '1px solid #ced4da' }}>
                <Button
                    variant="primary"
                    type="submit"
                    id="submitBtn"
                    className="m-0 py-2 w-100 border-0 fw-semibold bg-transparent"
                    disabled={!isActive}
                >
                    Submit
                </Button>
            </div>
            <div className="container text-center">
                <p>
                    Already have an account? <Link to="/login">Click here</Link> to login.
                </p>
            </div>
        </Form>
    );
}
