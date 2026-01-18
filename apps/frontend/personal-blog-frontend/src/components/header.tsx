import blog_logo from '../assets/resized_logo.png';
import blog_comic from '../assets/resized_comic.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar-outer">
            <div className = "navbar-inner">
                <div className="logo-wrapper">
                    <Link to="/" className='nav-item'>
                        <img src={blog_logo} alt="blog logo" className="nav-image-logo" />
                    </Link>
                </div>
                <div className="nav-item">
                    <img src={blog_comic} alt="blog comic" className="nav-image-comic" />
                </div>
            </div>

        </nav>
    )
}

export default Header;