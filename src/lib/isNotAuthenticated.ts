import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const isNotAuthenticated = async () => {
    const session = await auth()

    if (session?.user) redirect('/')
}