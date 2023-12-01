import { useState } from "react";
import "../Navbar/navbarMain.css";
import User from "../../img/User.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/userAction";

const NavbarMain = () => {
  const user = useSelector((store) => store.users.user);

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleModal = () => {
    setModalClose(modalClose);
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="app-main__header--logo">
        <Link to="/">
        <i className='bx bx-library'></i>
          ShinoPost
        </Link>
      </div>
      <nav className="app-main__header--nav">
        <div onClick={handleModal}>
          <i className={` ${menuOpen ? "none" : "bx bx-menu"}`}></i>
        </div>

        <ul className={` ${menuOpen ? "nav-items" : "none"}`}>
          <li>
            <div onClick={handleClick}>
              <i className={` ${menuOpen ? " bx bx-x" : "none"}`}></i>
            </div>
          </li>
        
        

          {user ? (
            <>
              <div
                className={`avatar-container ${
                  showLogout ? "show-logout" : ""
                }`}
                onClick={toggleLogout}
              >
                {user.avatar ? (
                  <img className="user-avatar" src={user.avatar} alt="Avatar" />
                ) : (
                  <img
                    className="user-avatar"
                    src="https://static.vecteezy.com/system/resources/previews/007/933/996/non_2x/ninja-logo-silhouette-of-japanese-fighter-vector.jpg"
                    alt="Avatar"
                  />
                )}
                {showLogout && (
                  <div className="logout-button">
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <li className="app-login" onClick={handleClick}>
                <Link to={`/Login/`}>
                  <img className="user-icon" src={User} alt="" />
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div
        onClick={handleModal}
        className={` ${menuOpen ? "modalBackground" : "modalBackgroundNone"}`}
      ></div>
    </>
  );
};

export default NavbarMain;
