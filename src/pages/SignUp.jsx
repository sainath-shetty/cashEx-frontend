import React, { useState } from 'react';
import { BottomWarning, ButtonComponent, Heading, InputBox, SubHeading } from '../assets/RequiredCompo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError(''); // Reset error message
    if (!username || !password || !firstName || !lastName) {
      setError('Please fill all the required fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await axios.post(
        'https://cash-ex-api.vercel.app/api/user/signup',
        { username, firstName, lastName, password },
        { withCredentials: true } // Allow credentials if needed
      );

      localStorage.setItem('token', response.data.token); // Save token in localStorage
      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      if (error.response && error.response.data) {
        const backendMessage = error.response.data.message;
        const detailedErrors = error.response.data.errors;

        if (detailedErrors) {
          // Show detailed error messages from the backend
          setError(detailedErrors.map(err => `${err.path.join('.')} - ${err.message}`).join(', '));
        } else {
          setError(backendMessage || 'An unexpected error occurred.');
        }
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center overflow-hidden">
      <div className="bg-white flex flex-col w-[400px] h-[540px] justify-center p-6 rounded-lg shadow-lg">
        <Heading label="Sign Up" />
        <SubHeading label="You can enter your details and sign up" />

        <InputBox
          onChange={(e) => setFirstname(e.target.value)}
          label="First Name"
          placeholder="Enter your first name"
        />

        <InputBox
          onChange={(e) => setLastname(e.target.value)}
          label="Last Name"
          placeholder="Enter your last name"
        />

        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          label="Email Address"
          placeholder="Enter your email here"
        />

        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <ButtonComponent onClick={handleSignUp} label="Sign Up" />

        <BottomWarning label="Already have an Account?" buttonText="Sign In" to="/signin" />

        {/* Display error message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
