import Auth from '../Auth/Auth';

function Register() {

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
      />
    </main>
  )
}

export default Register;