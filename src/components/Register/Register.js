import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import * as mainApi from '../../utils/MainApi';

function Register(props) {

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formValue;

    try {
      const res = await mainApi.register(email, password, name);
      console.log(res);
 //     console.log(res.ok);
 //     console.log(res.status);
      navigate('/signin', { replace: true });
    } catch(err) {
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
        onChange={handleChange}
      />
    </main>
  )
}

export default Register;
