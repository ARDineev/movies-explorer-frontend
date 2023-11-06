import React, { useState } from 'react';
import Auth from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';

function Login(props) {

  const [formValue, setFormValue] = useState({
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
    if (!formValue.email || !formValue.password) {
      return;
    }

    try {
      const data = await mainApi.authorize(formValue.email, formValue.password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setFormValue({ email: '', password: '' });
        await props.handleLogin();
        navigate('/', { replace: true });
      }
    } catch(err) {
      console.log(err);
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
        link="/signup"
        showNameInput={false}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </main>
  )
}

export default Login;
