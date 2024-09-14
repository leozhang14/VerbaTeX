import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'
import './index.css'

// const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN
// const client_id = import.meta.env.REACT_APP_AUTH0_CLIENT_ID


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Auth0Provider
            domain="dev-mpn6iffi8psydlea.us.auth0.com"
            clientId="4g4cYqXHL9Yd165rYtt8C1GVioPOIeJB"
            authorizationParams={{
                redirect_uri: "http://localhost:5173"
            }}
        >
            <App />
        </Auth0Provider>,
    </StrictMode>,
)