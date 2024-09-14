import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        (isAuthenticated && <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => logout()}
        >
            Log out
        </button>
    ))
};

export default LogoutButton;