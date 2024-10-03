import { AuthError } from "@/components/pages/auth/Error";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Opa! Algo deu errado'
}

const AuthErrorPage = () => (
    <AuthError />
)

export default AuthErrorPage;