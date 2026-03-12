import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar" id="main-navbar">
            <img
                src="/logoHeader.png"
                alt="Jamia Razvia Zia ul Uloom Logo"
                className="logo"
                onClick={() => navigate('/')}
                role="button"
                tabIndex={0}
            />
            <img
                src="/1.png"
                alt="Zia ul Uloom Logo"
                className="logo-right"
            />
        </div>
    );
}
