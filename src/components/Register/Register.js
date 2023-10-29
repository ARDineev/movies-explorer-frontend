import Auth from '../Auth/Auth';

function Register() {

  return (
    <Auth
      title="Добро пожаловать!"
      name="register"
      btnCaption="Зарегистрироваться"
      text="Уже зарегистрированы?"
      linkName="Войти"
      link="/signin"
      showNameInput={true}
    />
  )
}

export default Register;