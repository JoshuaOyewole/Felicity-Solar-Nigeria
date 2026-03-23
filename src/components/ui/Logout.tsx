'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {

        try {
            const response = await fetch(`/api/logout`, {
                method: "GET"
            });
            const data = await response.json();
            toast.success(data.message);
            router.push('/auth/login');
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <button onClick={handleLogout} className="px-4 hover:bg-red-500 bg-red-600/90 py-2 w-max mt-10 text-left text-white rounded">
            Logout
        </button>
    );
}
