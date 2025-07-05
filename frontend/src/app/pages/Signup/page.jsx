"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Hotel, ArrowRight, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signup } from "../../api/auth";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const response = await signup(signupData);
      
      // Success handling
      showToast('Account created successfully! Redirecting to home page...', 'success');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Navigate to home page after a short delay
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
      // Error handling
      const errorMessage = error.message || 'Signup failed. Please try again.';
      showToast(errorMessage, 'error');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/pages/Login');
  };

  const goToHome = () => {
    router.push('/');
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  return (
    <div className="h-screen w-full bg-[#EDF6F9] flex overflow-hidden">
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#E29578] via-[#83C5BE] to-[#006D77] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-16 left-16 w-36 h-36 bg-white rounded-full"></div>
          <div className="absolute bottom-28 right-12 w-28 h-28 bg-white rounded-full"></div>
          <div className="absolute top-2/3 left-1/4 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-16 left-2/3 w-14 h-14 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-12">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <Hotel className="h-20 w-20 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2">Join LuxeStay</h1>
              <p className="text-xl opacity-90">
                Start your journey to exceptional hotel management
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm mb-6">
              <h3 className="text-xl font-semibold mb-6">Why Choose LuxeStay?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-300" />
                  <div>
                    <div className="font-semibold">Complete Management Suite</div>
                    <div className="text-sm opacity-80">All-in-one solution for your hotel</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-300" />
                  <div>
                    <div className="font-semibold">Real-time Analytics</div>
                    <div className="text-sm opacity-80">Track performance and optimize operations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-300" />
                  <div>
                    <div className="font-semibold">24/7 Support</div>
                    <div className="text-sm opacity-80">Expert assistance whenever you need it</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-300" />
                  <div>
                    <div className="font-semibold">Secure & Reliable</div>
                    <div className="text-sm opacity-80">Enterprise-grade security for your data</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-80">Hotels</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Rooms</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm opacity-80">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 bg-white">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <Hotel className="h-8 w-8 text-[#006D77] mr-2" />
              <h1 className="text-xl font-bold text-[#006D77]">LuxeStay</h1>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={goToHome}
            className="mb-4 text-[#006D77] hover:text-[#83C5BE] transition-colors duration-200 flex items-center"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Home
          </button>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm">
              Join thousands of hotels using LuxeStay
            </p>
          </div>

          {/* Signup Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] transition-colors duration-200"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] transition-colors duration-200"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] transition-colors duration-200 ${
                    formData.confirmPassword && !passwordsMatch 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className="mt-1 text-xs text-green-600 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Passwords match
                </p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-[#006D77] focus:ring-[#006D77] border-gray-300 rounded mt-0.5"
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-[#006D77] hover:text-[#83C5BE] transition-colors duration-200">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-[#006D77] hover:text-[#83C5BE] transition-colors duration-200">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#006D77] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            {/* Social Signup */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button 
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                <span className="ml-2">Google</span>
              </button>
              <button 
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                <span className="ml-2">Twitter</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={goToLogin}
              className="text-[#006D77] hover:text-[#83C5BE] font-medium transition-colors duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;