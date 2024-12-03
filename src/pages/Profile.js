import { useState, useEffect, useContext } from 'react';
import { Row, Button, Modal, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import ResetPassword from '../components/ResetPassword'; 
// import UpdateProfile from '../components/UpdateProfile'; 
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
    const { user } = useContext(AuthContext);  // Access user from context
    const [details, setDetails] = useState(null); // To hold the user details
    const [showResetPassword, setShowResetPassword] = useState(false);  // Modal state

    useEffect(() => {
        const notyf = new Notyf();
        
        // Check if token is present before attempting to fetch user details
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data && data.user) {
                    setDetails(data.user);  // Set the user details
                } else {
                    notyf.error(data.error || "Something went wrong. Contact your System Admin.");
                }
            })
            .catch(err => {
                notyf.error("Unable to fetch user details. Please try again later.");
                console.error(err);
            });
        } else {
            notyf.error("No token found. Please login again.");
        }
    }, [user]);  // Refetch user details when user context changes

    // If the user is not logged in or there's no user, redirect to products page
    if (!user) {
        return <Navigate to="/blogs" />;
    }

    // If user details are not fetched yet, show a loading message
    if (details === null) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Row>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-3 bg-info bg-gradient">
                            {/* Can add a profile image or other info here */}
                        </div>
                        <div className="col-9 p-5 border border-info">
                            <h1 className="fs-6 text-primary fw-semibold">Personal Profile</h1>
                            <h2 className="mt-1 fw-semibold fs-4">{`${details.userName}`}</h2>
                            <hr />
                            <hr className="my-1" />
                            <ul>
                                <li>Email: {details.email}</li>
                            </ul>
                            {/* Button to reset password */}
                            <Button variant="warning" className="px-5 w-25 fw-semibold" onClick={() => setShowResetPassword(true)}>
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </div>
            </Row>

            {/* Reset Password Modal */}
            <Modal show={showResetPassword} onHide={() => setShowResetPassword(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResetPassword />
                </Modal.Body>
            </Modal>
        </Container>
    );
}
