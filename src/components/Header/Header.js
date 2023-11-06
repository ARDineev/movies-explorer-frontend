import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isBurgerClicked, setIsBurgerClicked] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked)
  }

  const handleLogoClick = () => {
    navigate('/', { replace: true });
  }

  const handleProfileClick = () => {
    navigate('/profile', { replace: true });
  }

  const handleSignInClick = () => {
    navigate('/signin', { replace: true });
  }

  return (
    <header className="header">
      <div className="header__logo" onClick={handleLogoClick}></div>

      {loggedIn && windowWidth <= 800 && (
        <div className="header__burger" onClick={handleBurgerClick}></div>
      )}

      {loggedIn && windowWidth > 800 && (<>
        <div className="header__links">
          <NavLink to="/movies" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        </div>
        <button className="account-btn" type="button" onClick={handleProfileClick}>Аккаунт</button>
      </>)}

      {!loggedIn && (
        <nav className="header__auth-container">
          <Link className="header__signup" to="/signup">Регистрация</Link>
          <button className="header__signin" type="button" onClick={handleSignInClick}>Войти</button>
        </nav>
      )}

      {windowWidth <= 800 && (
        <Navigation isOpen={isBurgerClicked} handleCloseClick={handleBurgerClick} handleProfileClick={handleProfileClick}/>
      )}
    </header>
  )
}

export default Header;
