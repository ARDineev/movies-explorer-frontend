import { Link, useNavigate } from 'react-router-dom';
import {
  MAIN_PATH,
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH
} from '../../utils/constants';

function Auth({
  title, name, btnCaption, text, linkName, link, showNameInput, onSubmit, formValue,
  isRegErr, isEmailConflict, isNoToken, isBadToken, isUnAuth, isLoginErr, isLoading
}) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(MAIN_PATH, { replace: true });
  }
  return (
    <section className="auth">
      <div className="auth__logo" onClick={handleLogoClick}></div>
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={name} onSubmit={onSubmit}>
        <div className="auth__input-container">
          {showNameInput && ( // поле name отображаем только для страницы регистрации
            <>
              <label className="auth__input-caption" htmlFor="auth-name">Имя</label>
              <input
                className="auth__input"
                id="auth-name"
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                minLength={NAME_MIN_LENGTH}
                maxLength={NAME_MAX_LENGTH}
                noValidate
                onChange={formValue.name.onChange}
                onBlur={formValue.name.onBlur}
              />
              <p className={`auth__error-message ${formValue.name.isDirty && !formValue.name.inputValid && "auth__error-message_visible"}`}>
                {(formValue.name.isDirty && formValue.name.isEmptyErr && "Поле не может быть пустым.")
                  || (formValue.name.isDirty && !formValue.name.isEmptyErr && formValue.name.isMinLengthErr && `Минимальное количество символов: ${formValue.name.validators.minLength}.`)
                  || (formValue.name.isDirty && !formValue.name.isEmptyErr && !formValue.name.isMinLengthErr && formValue.name.isUserNameErr && "Поле содержит недопустимые символы.")}</p>
            </>
          )}
          <label className="auth__input-caption" htmlFor="auth-email">E-mail</label>
          <input
            className="auth__input"
            id="auth-email"
            type="email"
            name="email"
            placeholder="Ваш email"
            required
            minLength={EMAIL_MIN_LENGTH}
            maxLength={EMAIL_MAX_LENGTH}
            noValidate
            onChange={formValue.email.onChange}
            onBlur={formValue.email.onBlur}
          />
          <p className={`auth__error-message ${formValue.email.isDirty && !formValue.email.inputValid && "auth__error-message_visible"}`}>
            {(formValue.email.isDirty && formValue.email.isEmptyErr && "Поле не может быть пустым.")
              || (formValue.email.isDirty && !formValue.email.isEmptyErr && formValue.email.isMinLengthErr && `Минимальное количество символов: ${formValue.email.validators.minLength}.`)
              || (formValue.email.isDirty && !formValue.email.isEmptyErr && !formValue.email.isMinLengthErr && formValue.email.isEmailErr && "Поле не соответствует шаблону email.")}</p>
          <label className="auth__input-caption" htmlFor="auth-password">Пароль</label>
          <input
            className="auth__input"
            id="auth-password"
            type="password"
            name="password"
            placeholder="Ваш пароль"
            required
            minLength={PASSWORD_MIN_LENGTH}
            maxLength={PASSWORD_MAX_LENGTH}
            noValidate
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
        <button className="auth__btn" type="submit" disabled={(!(formValue.name.inputValid && formValue.email.inputValid && formValue.password.inputValid)
        || isLoading)}>{btnCaption}</button>
      </form>
      <div className="auth__link-container">
        <p className="auth__text">{text}</p>
        <Link to={link} className="auth__link">{linkName}</Link>
      </div>
    </section>
  )
}

export default Auth;
