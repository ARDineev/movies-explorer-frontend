import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import * as mainApi from '../../utils/MainApi';
import useInput from '../../hooks/useInput';
import {
  TOKEN_KEY,
  MOVIES_PATH,
  SIGNIN_PATH,
  NAME_MIN_LENGTH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  CONFLICT_CODE,
} from '../../utils/constants';

function Register(props) {
  const [isRegErr, setRegErr] = React.useState(false); // обобщенная ошибка при попытке регистрации
  const [isEmailConflict, setEmailConflict] = React.useState(false); // ошибка 409 Conflict при совпадении email у пользователей
  const [isLoading, setLoading] = React.useState(false); // признак загрузки, когда еще не получен ответ от сервера

  const formValue = {
    name: useInput('', { isEmpty: true, minLength: NAME_MIN_LENGTH, isUserName: true }), // поле name валидируем на пустоту, минимальную длину и соответствие формату юзера
    email: useInput('', { isEmpty: true, minLength: EMAIL_MIN_LENGTH, isEmail: true }), // поле email валидируем на пустоту, минимальную длину и соответствие формату email
    password: useInput('', { isEmpty: true, minLength: PASSWORD_MIN_LENGTH }), // поле password валидируем на минимальную длину
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formValue;
    try {
      setLoading(true);
      let success = false; // успешная регистрация и авторизация
      const response = await mainApi.register(email.value, password.value, name.value);
      if (response) {
        const data = await mainApi.authorize(email.value, password.value);
        if (data.token) { // если токен есть в ответе сервера
          localStorage.setItem(TOKEN_KEY, data.token);
          success = await props.handleLogin();
        }
      }
      if (success) {
        navigate(MOVIES_PATH, { replace: true });
        setRegErr(false);
        setEmailConflict(false)
      } else setRegErr(true);
    } catch (err) {
      if (err.message.startsWith(CONFLICT_CODE)) { // сервер ответил ошибкой 409 Conflict
        setEmailConflict(true)
      } else {
        setRegErr(true); // сервер ответил другой ошибкой
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <Auth
        title="Добро пожаловать!"
        name="register"
        btnCaption="Зарегистрироваться"
        text="Уже зарегистрированы?"
        linkName="Войти"
        link={SIGNIN_PATH}
        showNameInput={true}
        onSubmit={handleSubmit}
        formValue={formValue}
        isRegErr={isRegErr}
        isEmailConflict={isEmailConflict}
        isLoading={isLoading}
      />
    </main>
  )
}

export default Register;
