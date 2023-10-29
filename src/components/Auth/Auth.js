import { Link, useNavigate } from 'react-router-dom';

function Auth({ title, name, btnCaption, text, linkName, link, showNameInput }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { replace: true });
  }
  return (
    <section className="auth">
      <div className="auth__logo" onClick={handleLogoClick}></div>
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" name={name}>
        <div className="auth__input-container">
          {showNameInput && (
            <>
              <p className="auth__input-caption">Имя</p>
              <input
                className="auth__input"
                type="text"
                name="name"
                required
                minLength="2"
                maxLength="40"
              />
            </>
          )}
          <p className="auth__input-caption">E-mail</p>
          <input
            className="auth__input"
            type="email"
            name="email"
            required
            minLength="2"
            maxLength="40"
          />
          <p className="auth__input-caption">Пароль</p>
          <input
            className="auth__input"
            type="password"
            name="password"
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