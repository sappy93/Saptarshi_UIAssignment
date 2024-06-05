import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import brandLogo from '../../assets/images/demo-logo.webp';


const Header = ()=>{
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
      };
    return (
        <>
        <div className="ch__header-top--container">
            <div className="container-fluid">
                <button aria-label="Expand Spectrum Sites navigation section">Shop Lorem Ipsum</button>
            </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand"><img className="ch__brand-logo" src={brandLogo} alt="Demo logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to={'/'} className="nav-link active">Home</Link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Company
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">About Company</a></li>
                    <li><a class="dropdown-item" href="#">Leadership</a></li>
                    <li><a class="dropdown-item" href="#">History</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Newsroom
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Letest News</a></li>
                    <li><a class="dropdown-item" href="#">Media Nibrary</a></li>
                    <li><a class="dropdown-item" href="#">Media Contacts</a></li>
                </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li>
                {auth.isAuthenticated ? (
                    <Link to={'/dashboard'} className="nav-link"><span className="glyphicon glyphicon-user"></span> {auth?.user?.username}</Link>
                    ) : (
                        ''
                        )}
                </li>
                <li>
                {auth.isAuthenticated ? (
                    <Link onClick={handleLogout} className="nav-link"><span className="glyphicon glyphicon-user"></span> Logout</Link>
                   
                ) : (
                    <Link to={'/login'} className="nav-link"><span className="glyphicon glyphicon-user"></span> Login</Link>
                    )}
                </li>
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Header;