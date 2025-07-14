'use client';

import React, { useState } from 'react';
 import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import {Button} from '@/components/ui/button';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  loading?: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading = false, error }) => {
  const [formData, setFormData] = useState<RegisterData & { confirmPassword: string }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterData & { confirmPassword: string }>>({});

  /**
   * Validates the form fields and sets error messages if validation fails.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData & { confirmPassword: string }> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the form submission.
   * Prevents default form submission and calls the onSubmit prop if the form is valid.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...submitData } = formData;
      onSubmit(submitData);
    }
  };

  /**
   * Handles changes to input fields.
   * Updates the formData state and clears any associated error when the user starts typing.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join Pamoja Electronics today</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="First name"
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              <User size={20} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            {errors.firstName && <p id="firstName-error" className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Last name"
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              <User size={20} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            {errors.lastName && <p id="lastName-error" className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <Mail size={20} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+254 700 123 456"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            <Phone size={20} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Create a password"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <Lock size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            <Lock size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;

