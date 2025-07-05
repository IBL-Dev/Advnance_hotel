"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Hotel, ArrowRight, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { login } from '../../api/auth';
import { jwtDecode } from 'jwt-decode'; // You'll need to install this: npm install jwt-decode

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.email || !formData.password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (!formData.email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(formData);
      
      // Handle the response with access_token
      if (response.access_token) {
        // Store token in cookie (HttpOnly is better, but this works for client-side)
        document.cookie = `access_token=${response.access_token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        
        // Decode JWT to get user role
        try {
          const decodedToken = jwtDecode(response.access_token);
          const userRole = decodedToken.role;
          
          // Show success message
          showToast(`Welcome back! Redirecting to ${userRole === 'admin' ? 'admin dashboard' : 'homepage'}...`, 'success');
          
          // Clear form
          setFormData({
            email: '',
            password: ''
          });

          // Navigate based on role after a short delay
          setTimeout(() => {
            if (userRole === 'admin') {
              router.push('/pages/adminDashboard'); // Adjust path as needed
            } else {
              router.push('/'); // Homepage
            }
          }, 2000);

        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
          // If token decode fails, default to homepage
          showToast('Login successful! Redirecting...', 'success');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } else {
        throw new Error('No access token received');
      }

    } catch (error) {
      // Error handling
      const errorMessage = error.message || 'Login failed. Please check your credentials.';
      showToast(errorMessage, 'error');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/pages/Signup');
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#EDF6F9] flex">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Left Side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#006D77] via-[#83C5BE] to-[#E29578] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-12">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <Hotel className="h-20 w-20 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
              <p className="text-xl opacity-90">
                Continue managing your hotel with excellence
              </p>
            </div>

            {/* Features Grid */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Hotel className="h-6 w-6" />
                  </div>
                  <div className="font-semibold">Room Management</div>
                  <div className="opacity-80">Real-time availability</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="font-semibold">Guest Services</div>
                  <div className="opacity-80">Premium experience</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div className="font-semibold">Secure System</div>
                  <div className="opacity-80">Protected data</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <div className="font-semibold">Analytics</div>
                  <div className="opacity-80">Performance insights</div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
              <p className="text-lg italic mb-3">
                "Streamline your hotel operations with our comprehensive management solution"
              </p>
              <div className="text-sm opacity-80">
                - HotelMaster Team
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Hotel className="h-10 w-10 text-[#006D77] mr-3" />
              <h1 className="text-2xl font-bold text-[#006D77]">LuxeStay</h1>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={goToHome}
            className="mb-6 text-[#006D77] hover:text-[#83C5BE] transition-colors duration-200 flex items-center"
            disabled={isLoading}
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Home
          </button>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Sign In
            </h2>
            <p className="text-gray-600">
              Welcome back! Please sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] transition-colors duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#006D77] focus:ring-[#006D77] border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a 
                href="#" 
                className={`text-sm text-[#006D77] hover:text-[#83C5BE] transition-colors duration-200 ${
                  isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#006D77] text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                <span className="ml-2">Google</span>
              </button>
              <button 
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                <span className="ml-2">Twitter</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={goToSignup}
              className="text-[#006D77] hover:text-[#83C5BE] font-medium transition-colors duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              Sign up here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;