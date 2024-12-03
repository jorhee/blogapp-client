import React, { useState } from 'react';

export default function ResetPassword() {

	//const {user} = useContext(UserContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setSuccess(false);
      return;
    }

    try {
      // Retrieve the JWT token from localStorage or another storage method
      const token = localStorage.getItem('token'); // Make sure you set the token here

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
        method: 'PATCH', // Changed to PUT as per your route
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Sending JWT token in Authorization header
        },
        body: JSON.stringify({ newPassword }), // Using newPassword as per your controller's expectation
      });

      if (response.ok) {
        setMessage('Password reset successfully');
        setNewPassword('');
        setConfirmPassword('');
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to reset password');
        setSuccess(false);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setSuccess(false);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label fw-semibold">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && (
          <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        <button type="submit" className="btn m-0 py-2 w-100 border-0 fw-semibold bg-info bg-gradient text-white">Reset Password</button>
      </form>
    </div>
  );
};


