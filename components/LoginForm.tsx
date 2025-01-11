"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { SocialLogins } from "@/components";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const LoginForm = () => {
  const handleSubmit = (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    console.log(values);
    signIn('credentials', { 
      email: values.email, 
      password: values.password, 
      redirect: false, 
      callbackUrl: '/' 
    }).finally(() => {
      setSubmitting(false);
    });
  };

  return (
      <div className="w-full mt-16 max-w-md p-8 border border-black  rounded-md shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center ">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4  ">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium ">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium ">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <SocialLogins />
      </div>
  );
};
