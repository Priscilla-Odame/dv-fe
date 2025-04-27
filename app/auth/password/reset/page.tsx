"use client";
import { resetPasswordFxn } from '@/hooks/auth.hooks';
import { ResetPasswordFormData } from '@/types/iauth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  // Using Suspense to handle the async call for search parameters.
  return (
    <Suspense fallback={<p className="text-center my-10">Loading Page...</p>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const [loading, setLoading] = useState(false);

    const onSubmit = (values: ResetPasswordFormData) => {
        // setLoading(true);
        const token = searchParams.get("token");
        const qryParams = {
            newpassword : values.confirmPassword,
            token: token
        }
        resetPasswordFxn(qryParams);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#e9f4fe] p-4">
            <div className="w-full max-w-md bg-[#eeedf3] p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl font-bold text-center text-[#16213e] mb-4">Reset Password</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <Field 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                            />
                            <ErrorMessage name="password" component="p" className="text-red-400" />
                            <Field 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password" 
                                className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                            />
                            <ErrorMessage name="confirmPassword" component="p" className="text-red-400" />
                            
                            <button 
                                type="submit" 
                                className="w-full p-2 bg-[#16213e] text-[white] font-bold rounded hover:bg-[#e9f4fe] hover:text-[#16213e]"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Reset'}
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
