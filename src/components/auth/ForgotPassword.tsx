import React from 'react'
import Layout from '@/components/common/Layout'

const ForgotPassword = () => {
    return (
        <Layout>
            <div>
                <h1 className="text-3xl font-bold text-center mt-10">Forgot Password</h1>
                <p className="text-center text-gray-600 mt-4">
                    Please enter your email address to receive a password reset link.
                </p>
                <form className="max-w-md mx-auto mt-8">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Send Reset Link
                    </button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword
