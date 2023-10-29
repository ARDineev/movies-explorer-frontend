import Auth from '../Auth/Auth';

function Login() {

  return (
    <Auth
      title="Рады видеть!"
      name="login"
      btnCaption="Войти"
      text="Ещё не зарегистрированы?"
      linkName="Регистрация"
      link="/signup"
      showNameInput={false}
    />
  )
}

export default Login;