import { Link, useNavigate } from 'react-router-dom';

function Auth({
  title, name, btnCaption, text, linkName, link, showNameInput, onSubmit, formValue,
  isRegErr, isEmailConflict, isNoToken, isBadToken, isUnAuth, isLoginErr
}) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { replace: true });
  }
  return (
    <section className="auth">
      <div className="auth__logo" onClick={handleLogoClick}></div>
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={name} onSubmit={onSubmit}>
        <div className="auth__input-container">
          {showNameInput && ( // поле name отображаем только для страницы регистрации
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
                maxLength="30"
                onChange={formValue.name.onChange}
                onBlur={formValue.name.onBlur}
              />
              <p className={`auth__error-message ${formValue.name.isDirty && !formValue.name.inputValid && "auth__error-message_visible"}`}>
                {(formValue.name.isDirty && formValue.name.isEmptyErr && "Поле не может быть пустым.")
                  || (formValue.name.isDirty && !formValue.name.isEmptyErr && formValue.name.isMinLengthErr && `Минимальное количество символов: ${formValue.name.validators.minLength}.`)
                  || (formValue.name.isDirty && !formValue.name.isEmptyErr && !formValue.name.isMinLengthErr && formValue.name.isUserNameErr && "Поле содержит недопустимые символы.")}</p>
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
            maxLength="30"
            onChange={formValue.email.onChange}
            onBlur={formValue.email.onBlur}
          />
          <p className={`auth__error-message ${formValue.email.isDirty && !formValue.email.inputValid && "auth__error-message_visible"}`}>
            {(formValue.email.isDirty && formValue.email.isEmptyErr && "Поле не может быть пустым.")
              || (formValue.email.isDirty && !formValue.email.isEmptyErr && formValue.email.isMinLengthErr && `Минимальное количество символов: ${formValue.email.validators.minLength}.`)
              || (formValue.email.isDirty && !formValue.email.isEmptyErr && !formValue.email.isMinLengthErr && formValue.email.isEmailErr && "Поле не соответствует шаблону email.")}</p>
          <label className="auth__input-caption" for="auth-password">Пароль</label>
          <input
            className="auth__input"
            id="auth-password"
            type="password"
            name="password"
            placeholder="Ваш пароль"
            required
            minLength="2"
            maxLength="30"
            onChange={formValue.password.onChange}
            onBlur={formValue.password.onBlur}
          />
          <p className={`auth__error-message ${formValue.password.isDirty && !formValue.password.inputValid && "auth__error-message_visible"}`}>
            {(formValue.password.isDirty && formValue.password.isEmptyErr && "Поле не может быть пустым.")
              || (formValue.password.isDirty && !formValue.password.isEmptyErr && formValue.password.isMinLengthErr
                && `Минимальное количество символов: ${formValue.password.validators.minLength}.`)}</p>
        </div>
        <p className={`auth__server-error ${(isRegErr || isEmailConflict || isNoToken || isBadToken || isUnAuth || isLoginErr) && "auth__server-error_visible"}`}>
          {(isEmailConflict && "Пользователь с таким email уже существует.")
            || (isRegErr && "При регистрации пользователя произошла ошибка.")
            || (isNoToken && "Токен не передан или передан не в том формате.")
            || (isBadToken && "Переданный токен некорректен.")
            || (isUnAuth && "Вы ввели неправильный логин или пароль.")
            || (isLoginErr && "При авторизации произошла ошибка.")
          }</p>
        <button className="auth__btn" type="submit" disabled={!(formValue.name.inputValid && formValue.email.inputValid && formValue.password.inputValid)}>{btnCaption}</button>
      </form>
      <div className="auth__link-container">
        <p className="auth__text">{text}</p>
        <Link to={link} className="auth__link">{linkName}</Link>
      </div>
    </section>
  )
}

export default Auth;
