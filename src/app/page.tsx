'use client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginForm from '../components/auth/LoginForm';
import ForgotPassword from '../components/auth/ForgotPassword';
import RegisterForm from '../components/auth/RegisterForm';
import { LoginCredentials,RegisterData } from '../types';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
     

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
          
            <Route path="/auth/login" element={<LoginForm onSubmit={function (credentials: LoginCredentials): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/register" element={<RegisterForm onSubmit={function (data: RegisterData): void {
              throw new Error('Function not implemented.');
            } } />} />
             {/* <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} /> */}
          </Routes>
        </main>

      
      </div>
    </Router>
  );
}
