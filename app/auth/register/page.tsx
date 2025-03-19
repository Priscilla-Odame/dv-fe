"use client";
import { registerFxn } from "@/hooks/auth.hooks";
import { SignUpFormData } from "@/types/iauth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

export default function SignUp() {
  const initialValues = {
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
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
    <div className="flex items-center justify-center min-h-screen bg-[#e9f4fe] p-4">
      <div className="w-full max-w-4xl bg-[#eeedf3] p-6 rounded-lg shadow-lg text-[#16213e]">
        <h2 className="text-2xl font-bold text-center text-[#16213e] mb-4">
          Sign Up
        </h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Field
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
                <ErrorMessage name="firstName" component="p" className="text-red-400" />
              </div>

              <div className="col-span-1">
                <Field
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
                <ErrorMessage name="lastName" component="p" className="text-red-400" />
              </div>

              <div className="col-span-1">
                <Field
                  name="otherNames"
                  placeholder="Other Names (Optional)"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
              </div>

              <div className="col-span-1">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
                <ErrorMessage name="email" component="p" className="text-red-400" />
              </div>

              <div className="col-span-1">
                <Field
                  name="country"
                  placeholder="Country"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
              </div>

              <div className="col-span-1">
                <Field
                  name="current_location"
                  placeholder="City"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
              </div>

              <div className="col-span-1">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
                <ErrorMessage name="password" component="p" className="text-red-400" />
              </div>

              <div className="col-span-1">
                <Field
                  name="mobile"
                  placeholder="Mobile"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="birth_date" className="sr-only">
                  Birth Date
                </label>
                <DatePicker
                  selected={initialValues.birth_date ? new Date(initialValues.birth_date) : null}
                  onChange={(date: Date) => setFieldValue("birth_date", date)}
                  placeholderText="Date of Birth"
                  className="w-full p-2 bg-white border border-gray-600 rounded text-[#16213e]"
                  dateFormat="MM/dd/yyyy"
                />
                <ErrorMessage name="birth_date" component="p" className="text-red-400" />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full p-2 bg-[#16213e] text-white font-bold rounded hover:bg-[#e9f4fe] hover:text-[#16213e]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <p className="mt-4 text-center text-[#16213e]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#16213e] font-semibold hover:underline">
            Click here to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
