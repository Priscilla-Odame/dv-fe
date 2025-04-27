"use client";
import { forgotPasswordFxn } from '@/hooks/auth.hooks';
import { ForgotPasswordFormData } from '@/types/iauth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
    const initialValues = {
        email: ''
    };

    const [loading, setLoading] = useState(false);

    const onSubmit = (values: ForgotPasswordFormData) => {
        // setLoading(true);
        forgotPasswordFxn(values);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#e9f4fe] p-4">
            <div className="w-full max-w-md bg-[#eeedf3] p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl font-bold text-center text-[#16213e] mb-4">Forgot Password</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <Field 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                            />
                            <ErrorMessage name="email" component="p" className="text-red-400" />
                            
                            
                            <button 
                                type="submit" 
                                className="w-full p-2 bg-[#16213e] text-[white] font-bold rounded hover:bg-[#e9f4fe] hover:text-[#16213e]"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Send'}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Register Link */}
                <p className="mt-4 text-center text-[#16213e]">
                    Not registered?{" "}
                    <Link href="/auth/register" className="text-[#0e145a] font-semibold hover:underline">
                        Click here to create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
