import React from 'react';
import Auth from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import useInput from '../../hooks/useInput';
import {
  TOKEN_KEY,
  MOVIES_PATH,
  SIGNUP_PATH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  UNAUTHORIZED_CODE,
} from '../../utils/constants';


function Login(props) {
  const [isNoToken, setNoToken] = React.useState(false); // сервер не вернул токен или передал его не в том формате
  const [isBadToken, setBadToken] = React.useState(false); // сервер вернул токен, по которому невозможно залогиниться
  const [isUnAuth, setUnAuth] = React.useState(false); // ошибка 401 Unauthorized - неправильный логин или пароль
  const [isLoginErr, setLoginErr] = React.useState(false); // обобщенная ошибка при попытке логина
  const [isLoading, setLoading] = React.useState(false); // признак загрузки, когда еще не получен ответ от сервера

  const formValue = { // объект с полями формы
    name: useInput('', {}), // name не будет отрисовываться
    email: useInput('', { isEmpty: true, minLength: EMAIL_MIN_LENGTH, isEmail: true }), // поле email валидируем на пустоту, минимальную длину и соответствие формату email
    password: useInput('', { isEmpty: true, minLength: PASSWORD_MIN_LENGTH }), // поле password валидируем на минимальную длину
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await mainApi.authorize(formValue.email.value, formValue.password.value);
      if (data.token) { // если токен есть в ответе сервера
        localStorage.setItem(TOKEN_KEY, data.token);
        const success = await props.handleLogin();
        if (success) { // если получилось залогиниться по токену
          setUnAuth(false);
          setNoToken(false);
          setLoginErr(false);
          setBadToken(false);
          navigate(MOVIES_PATH, { replace: true });
        } else { // а если нет, значит токен - плохой
          setBadToken(true);
        }
      } else { setNoToken(true) } // если токена не было в ответе сервера
    } catch (err) {
      if (err.message.startsWith(UNAUTHORIZED_CODE)) { // сервер ответил ошибкой 401
        setUnAuth(true);
      } else {
        setLoginErr(true); // сервер ответил другой ошибкой
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <Auth
        title="Рады видеть!"
        name="login"
        btnCaption="Войти"
        text="Ещё не зарегистрированы?"
        linkName="Регистрация"
        link={SIGNUP_PATH}
        showNameInput={false}
        onSubmit={handleSubmit}
        formValue={formValue}
        isNoToken={isNoToken}
        isBadToken={isBadToken}
        isUnAuth={isUnAuth}
        isLoginErr={isLoginErr}
        isLoading={isLoading}
      />
    </main>
  )
}

export default Login;
