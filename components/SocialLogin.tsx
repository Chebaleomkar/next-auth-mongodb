import { CALLBACK_URL } from "@/utils/constants";
import { signIn } from "next-auth/react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { JSX } from "react";

interface SignInOption {
    provider: string;
    callbackUrl: string;
    icon: JSX.Element;
    label: string;
}

export const signInOptions: SignInOption[] = [
    {
        provider: "github",
        callbackUrl: CALLBACK_URL,
        icon: <FaGithub className="mr-2 h-4 w-4" />,
        label: "GitHub"
    },
    {
        provider: "facebook",
        callbackUrl: CALLBACK_URL,
        icon: <FaFacebook className="h-4 w-4" />,
        label: "Facebook"
    },

];

export const SocialLogins = () => {
    const handleProviderSignUp = (provider: string, callbackUrl: string) => {
        signIn(provider, { callbackUrl } );
    };

    return (
        <div className="mt-6 grid grid-cols-2 gap-3">
            {signInOptions.map(({ provider, callbackUrl, icon, label }) => (
                <button
                    type="button"
                    key={provider}
                    onClick={() => handleProviderSignUp(provider, callbackUrl)}
                    className="w-full"
                >
                    {icon}
                    <span className="sr-only sm:not-sr-only sm:ml-2">{label}</span>
                </button>
            ))}
        </div>
    );
};