import { AdminDashboardPage } from "@/components/pages/admin/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Dashboard'
}

const AdminDashboard = () => {
    return (
        <AdminDashboardPage />
    )
}

export default AdminDashboard;