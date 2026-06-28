import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-lg backdrop-blur-sm bg-opacity-90 sticky top-0 z-50">
            <div className="container mx-auto">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-2xl font-bold text-white hover:scale-105 transition-transform">
                        <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                            🎓 CertifyMe
                        </span>
                    </Link>
                </div>
                <div className="flex-none">
                    <span className="text-white text-sm hidden md:inline">Create Beautiful Certificates</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
