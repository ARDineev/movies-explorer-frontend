import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import * as mainApi from '../../utils/MainApi';
import useInput from '../../hooks/useInput';

function Register() {
  const [isRegErr, setRegErr] = React.useState(false); // обобщенная ошибка при попытке регистрации
  const [isEmailConflict, setEmailConflict] = React.useState(false); // ошибка 409 Conflict при совпадении email у пользователей

  const formValue = {
    name: useInput('', { isEmpty: true, minLength: 2, isUserName: true }), // поле name валидируем на пустоту, минимальную длину и соответствие формату юзера
    email: useInput('', { isEmpty: true, minLength: 2, isEmail: true }), // поле email валидируем на пустоту, минимальную длину и соответствие формату email
    password: useInput('', { isEmpty: true, minLength: 8 }), // поле password валидируем на минимальную длину
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formValue;
    try {
      await mainApi.register(email.value, password.value, name.value);
      navigate('/signin', { replace: true });
      setRegErr(false);
      setEmailConflict(false)
    } catch (err) {
      if (err.message.startsWith('409')) { // сервер ответил ошибкой 409 Conflict
        setEmailConflict(true)
      } else {
        setRegErr(true); // сервер ответил другой ошибкой
      }
      console.log(err);
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
        link="/signin"
        showNameInput={true}
        onSubmit={handleSubmit}
        formValue={formValue}
        isRegErr={isRegErr}
        isEmailConflict={isEmailConflict}
      />
    </main>
  )
}

export default Register;
