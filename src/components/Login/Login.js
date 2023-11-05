import Auth from '../Auth/Auth';

function Login() {

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
      />
    </main>
  )
}

export default Login;