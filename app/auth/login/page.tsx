"use client";
import { loginFxn } from '@/hooks/auth.hooks';
import { LoginFormData } from '@/types/iauth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const initialValues = {
        email: '',
        password: ''
    };

    const [loading, setLoading] = useState(false);

    const onSubmit = (values: LoginFormData) => {
        setLoading(true);
        loginFxn(values);
        setTimeout(() => setLoading(false), 2000); // Simulate API delay
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e] p-4">
            <div className="w-full max-w-md bg-[#16213e] p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl font-bold text-center text-[#ffcc00] mb-4">Login</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <Field 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                            />
                            <ErrorMessage name="email" component="p" className="text-red-400" />
                            
                            <Field 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                            />
                            <ErrorMessage name="password" component="p" className="text-red-400" />
                            
                            <button 
                                type="submit" 
                                className="w-full p-2 bg-[#ffcc00] text-[#16213e] font-bold rounded hover:bg-[#e6b800]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Register Link */}
                <p className="mt-4 text-center text-gray-300">
                    Not registered?{" "}
                    <Link href="/auth/register" className="text-[#ffcc00] font-semibold hover:underline">
                        Click here to create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
