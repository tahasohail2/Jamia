import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar" id="main-navbar">
            <span
                className="header_title"
                onClick={() => navigate('/')}
                role="button"
                tabIndex={0}
            >
                جامعۂ رضویۃ ضیاء العلوم ،پاکستان
            </span>
            <img
                src="/logo.png"
                alt="Jamia Razvia Zia ul Uloom Logo"
                className="logo"
                onClick={() => navigate('/')}
                role="button"
                tabIndex={0}
            />
        </div>
    );
}
