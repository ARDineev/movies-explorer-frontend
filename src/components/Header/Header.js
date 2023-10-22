function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__links">
        <a href="#" class="header__link">Фильмы</a>
        <a href="#" class="header__link">Сохранённые фильмы</a>
      </div>
      <button className="header__account-btn" type="button">Аккаунт</button>
    </header>
  )
}

export default Header;
