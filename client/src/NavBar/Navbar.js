import './Navbar.css'

export default function NavBar() {
    return <nav className="nav"> 
        <h1><a href="/">MSense</a></h1>
        <ul>
            <li><a href="/">Scan</a></li>
            <li><a href="#about-us-card">About Us</a></li>
        </ul>
    </nav>
}