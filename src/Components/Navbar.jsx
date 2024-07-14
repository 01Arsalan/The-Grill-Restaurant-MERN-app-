import "@/assets/Styles/navbar.css"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toggleUser } from "../Features/homePageSlice"
import { clearUser,logoutUser } from "../Features/userSlice"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); 
  const navData = useSelector((state) => state.homePage.data.nav);
  const user = useSelector((state) => state.user.isUser);
  const { fullName, email } = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearUser());
  };

  // because "data-bs-dismiss="offcanvas"", on link's doesnt let it navigate, we are managing navigation programatically
  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar fixed-top container-fluid scrolled-navbar">
      <div className="container-fluid">
        <div className="navbar-logo-brand">
          <img className="navbar-logo" src={navData.logo.url} alt="" />
          <a className="navbar-brand" href="#">The Grill</a>
        </div>
        <div className="navbar-links d-flex gap-5">
          <div className="navbar-links d-none d-md-flex gap-5">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/menu" className="navbar-link">Order-online</Link>
            <Link to="/contact" className="navbar-link">Contact-us</Link>
          </div>
          {user === false ? (
            <button
              className="navbar-link"
              disabled={location.pathname === "/login"}
              onClick={() => { dispatch(toggleUser()) }}
              style={{ background: "transparent", border: "none" }}
            >
              <i className="bi bi-door-open"></i>
            </button>
          ) : (
            <button
              className="navbar-link navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list"></i>
            </button>
          )}
        </div>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <i className="bi bi-person-circle"></i>
            <div>
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{fullName ? fullName.split(' ')[0] : "user"}</h5>
              <p className="email">{email ? email : "abc....@...com"}</p>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body px-0">
            <ul className="navbar-nav justify-content-end flex-grow-1">
              <li className="nav-item">
                <Link to="/info" className="nav-link navbar-side-link" aria-current="page" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("/info")}><span>Personal Information</span> <i className="side-link-icon bi bi-caret-right"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link navbar-side-link" aria-current="page" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("/orders")}><span>My Orders</span> <i className="side-link-icon bi bi-caret-right"></i></Link>
              </li>
              {user === true ? (
                <div className="navbar-nav d-md-none px-0">
                  <Link to="/home" className="navbar-link navbar-side-link d-row" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("/home")}><span>Home</span> <i className="side-link-icon bi bi-caret-right"></i></Link>
                  <Link to="/menu" className="navbar-link navbar-side-link d-row" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("/menu")}><span>Order-online</span><i className="side-link-icon bi bi-caret-right"></i></Link>
                  <Link to="/contact" className="navbar-link navbar-side-link d-row" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("/contact")}><span>Contact-us</span> <i className="side-link-icon bi bi-caret-right"></i></Link>
                </div>
              ) : null}
              <li className="nav-item">
                <button
                  className="navbar-side-link side-link-button border-0 d-flex align-items-center justify-content-center"
                  type="submit"
                  onClick={() => { handleLogout(); }}
                  data-bs-dismiss="offcanvas"
                >
                  <i className="bi bi-box-arrow-left me-2"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;









