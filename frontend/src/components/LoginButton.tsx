import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        (!isAuthenticated && <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => loginWithRedirect()}
        >
            Get started
        </button>
    ))
};

export default LoginButton;