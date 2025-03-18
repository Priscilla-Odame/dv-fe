"use client";
import { registerFxn } from "@/hooks/auth.hooks";
import { SignUpFormData } from "@/types/iauth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const initialValues = {
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    company_name: "",
    country: "",
    current_location: "",
    password: "",
    mobile: "",
    birth_date: "",
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = (values: SignUpFormData) => {
    setLoading(true);
    registerFxn(values);
    setTimeout(() => setLoading(false), 2000); // Simulate API delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e] p-4">
      <div className="w-full max-w-md bg-[#16213e] p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center text-[#ffcc00] mb-4">
          Sign Up
        </h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field
                name="firstName"
                placeholder="First Name"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <ErrorMessage name="firstName" component="p" className="text-red-400" />

              <Field
                name="lastName"
                placeholder="Last Name"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <ErrorMessage name="lastName" component="p" className="text-red-400" />

              <Field
                name="otherNames"
                placeholder="Other Names (Optional)"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <ErrorMessage name="email" component="p" className="text-red-400" />

              <Field
                name="country"
                placeholder="Country"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />

              <Field
                name="current_location"
                placeholder="Current Location"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <ErrorMessage name="password" component="p" className="text-red-400" />

              <Field
                name="mobile"
                placeholder="Mobile"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />

              <Field
                type="date"
                name="birth_date"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />

              <button
                type="submit"
                className="w-full p-2 bg-[#ffcc00] text-[#16213e] font-bold rounded hover:bg-[#e6b800]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#ffcc00] font-semibold hover:underline">
            Click here to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
