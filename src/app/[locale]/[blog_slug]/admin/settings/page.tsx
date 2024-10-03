import { AdminSettingsPage } from "@/components/pages/admin/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Configurações | Dashboard'
}

const AdminSettings = () => {
    return (
        <AdminSettingsPage />
    )
}

export default AdminSettings;