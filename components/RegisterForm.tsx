"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { SocialLogins } from "@/components";
import { CALLBACK_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";

const registerSchema = Yup.object().shape({
    name: Yup.string().min(2, "name is too short!").max(50, "name is too long").required('Required'),
    email: Yup.string().email("Invalid email").required('email required'),
    password: Yup.string().min(8, "Too Short!").max(10, "Too Long!").required("Required")
})

export const RegisterForm = () => {
const router = useRouter();
    const handleSubmit = async (values: { name: string; email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values);
        await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
            }),
        });
        signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: CALLBACK_URL
        }).finally(() => {
            setSubmitting(false);
        });
        router.push('/profile')
    };

    return (
        <div className="w-full max-w-md p-8  rounded shadow-md">
            <h1 className="mb-6 text-2xl font-bold text-center ">Register</h1>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium ">
                                Name
                            </label>
                            <Field
                                name="name"
                                id="name"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 "
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="mt-1 text-sm text-red-500"
                            />
                        </div>

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
                            {isSubmitting ? "Submitting..." : "Register"}
                        </button>
                    </Form>)}
            </Formik>
            <SocialLogins />
        </div>
    )
}
