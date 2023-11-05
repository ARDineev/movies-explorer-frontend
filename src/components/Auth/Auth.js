import { Link, useNavigate } from 'react-router-dom';

function Auth({ title, name, btnCaption, text, linkName, link, showNameInput }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { replace: true });
  }
  return (
    <section className="auth">
      <div className="auth__logo" onClick={handleLogoClick}></div>
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={name}>
        <div className="auth__input-container">
          {showNameInput && (
            <>
              <label className="auth__input-caption" for="auth-name">Имя</label>
              <input
                className="auth__input"
                id="auth-name"
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                minLength="2"
                maxLength="40"
              />
            </>
          )}
          <label className="auth__input-caption" for="auth-email">E-mail</label>
          <input
            className="auth__input"
            id="auth-email"
            type="email"
            name="email"
            placeholder="Ваш email"
            required
            minLength="2"
            maxLength="40"
          />
          <label className="auth__input-caption" for="auth-password">Пароль</label>
          <input
            className="auth__input"
            id="auth-password"
            type="password"
            name="password"
            placeholder="Ваш пароль"
            required
            minLength="2"
            maxLength="40"
          />
        </div>
        <button className="auth__btn" type="submit">{btnCaption}</button>
      </form>
      <div className="auth__link-container">
        <p className="auth__text">{text}</p>
        <Link to={link} className="auth__link">{linkName}</Link>
      </div>
    </section>
  )
}

export default Auth;