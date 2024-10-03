import { SignIn } from "@/components/pages/auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Faça seu Login'
}

const SignInPage = () => (
    <SignIn />
)

export default SignInPage;