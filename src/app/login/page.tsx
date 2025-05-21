'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function LoginPage() {
  const { setIsAuthenticated, setUser, setAccount } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Fixed line
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Email Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status === 403) {
        alert(data.message);
        setIsRegister(true);
        setOtpSent(false);
        return;
      }
      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('authToken', data.token);
      const decoded: { id: string } = jwtDecode(data.token);
      setUser(decoded.id);
      setIsAuthenticated(true);
      setAccount({ name: data.name, email: data.email });
      router.push('/dashboard/home');
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    }
  };

  // Send OTP for Registration
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to send OTP');
        return;
      }
      alert(data.message);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'OTP verification failed');
        return;
      }
      alert(data.message);
      setOtpSent(false);
      setIsRegister(false);
      setOtp('');
      setName('');
      setPassword('');
      setPhone('');
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    }
  };

  // Resend OTP
  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to resend OTP');
        return;
      }
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {isRegister ? 'Create Account' : 'Sign In'}
        </h2>
        <h5 className="text-center text-gray-600 mb-6">
          {isRegister ? 'Register with Email' : 'Login with Email'}
        </h5>

        {isRegister ? (
          <>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="toggleShowPasswordReg"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="toggleShowPasswordReg" className="ml-2 text-sm text-gray-600">
                    Show Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter OTP"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Verify OTP
                  </button>
                </form>
                <button
                  onClick={handleResendOtp}
                  className="w-full text-blue-600 text-sm hover:underline mt-2"
                  aria-label="Resend OTP"
                >
                  Resend OTP
                </button>
              </>
            )}
          </>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="toggleShowPasswordLogin"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="toggleShowPasswordLogin" className="ml-2 text-sm text-gray-600">
                Show Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        )}

        <button
          className="w-full text-blue-600 text-sm hover:underline mt-4"
          onClick={() => {
            setIsRegister(!isRegister);
            setOtpSent(false);
          }}
          aria-label={isRegister ? 'Switch to Login' : 'Switch to Register'}
        >
          {isRegister ? 'Already have an account? Login' : 'Create Account'}
        </button>
      </div>
    </div>
  );
}