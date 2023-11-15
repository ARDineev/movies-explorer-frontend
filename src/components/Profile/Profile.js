import React from 'react';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import useInput from '../../hooks/useInput';
import {
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  CONFLICT_CODE
} from '../../utils/constants';

function Profile({ handleLogOut, loggedIn, setCurrentUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isCommonPatchErr, setCommonPatchErr] = React.useState(false); // обобщенная ошибка при попытке патч-запроса
  const [isEmailConflict, setEmailConflict] = React.useState(false); // ошибка 409 Conflict при совпадении email у пользователей
  const [isBtnDisabled, setBtnDisabled] = React.useState(true); // блокирована ли кнопка отправки формы
  const [isSuccessPatchMes, setSuccessPatchMes] = React.useState(false); // сообщение об успешном патч-запросе

  const name = useInput(currentUser.name, { isEmpty: true, minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH, isUserName: true });
  const email = useInput(currentUser.email, { isEmpty: true, isEmail: true });

  React.useEffect(() => { // блокировка кнопки отправки формы при невалидности инпутов, а также при совпадении со старыми данными
    if (!name.inputValid || !email.inputValid
      || (name.value === currentUser.name && email.value === currentUser.email)) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [name.value, email.value, name.inputValid, email.inputValid]);

  function handleEditOpen() {
    setIsEdit(true);
    setSuccessPatchMes(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.value || !email.value) {
      return;
    }
    try {
      setBtnDisabled(true);
      setSuccessPatchMes(false);
      const data = await mainApi.patchUserInfo(email.value, name.value);
      if (data.email && data.name) {
        setCurrentUser(data)
        setIsEdit(false);
        setCommonPatchErr(false);
        setEmailConflict(false);
        setSuccessPatchMes(true);
      } else {
        setBtnDisabled(false);
        setCommonPatchErr(true)
      }
    } catch (err) {
      setBtnDisabled(false);
      if (err.message.startsWith(CONFLICT_CODE)) {
        setEmailConflict(true)
      } else {
        setCommonPatchErr(true);
      }
      console.log(err);
    }
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__info-container">
              <label className="profile__info-text" htmlFor="profile-name">Имя</label>
              <input className="profile__info-input"
                id="profile-name"
                defaultValue={currentUser.name}
                placeholder="Ваше имя"
                readOnly={!isEdit}
                minLength={NAME_MIN_LENGTH}
                maxLength={NAME_MAX_LENGTH}
                required
                noValidate
                name="name"
                onChange={name.onChange}
                onBlur={name.onBlur}
              />
              <p className={
                `profile__name-error ${isEdit && name.isDirty && name.isEmptyErr && "profile__name-error_visible"}`
              }>Поле не может быть пустым.</p>
              <p className={
                `profile__name-error ${isEdit && name.isDirty && !name.isEmptyErr && name.isMinLengthErr && "profile__name-error_visible"}`
              }>Минимальное количество символов: {name.validators.minLength}.</p>
              <p className={
                `profile__name-error ${isEdit && name.isDirty && !name.isEmptyErr && !name.isMinLengthErr && name.isUserNameErr && "profile__name-error_visible"}`
              }>Поле содержит недопустимые символы.</p>
            </div>

            <div className="profile__info-container">
              <label className="profile__info-text" htmlFor="profile-email">E-mail</label>
              <input className="profile__info-input"
                id="profile-email"
                defaultValue={currentUser.email}
                placeholder="Ваш email"
                readOnly={!isEdit}
                minLength={EMAIL_MIN_LENGTH}
                maxLength={EMAIL_MAX_LENGTH}
                required
                noValidate
                name="email"
                onChange={email.onChange}
                onBlur={email.onBlur}
              />
              <p className={
                `profile__email-error ${isEdit && email.isDirty && email.isEmptyErr && "profile__email-error_visible"}`
              }>Поле не может быть пустым.</p>
              <p className={
                `profile__email-error ${isEdit && email.isDirty && !email.isEmptyErr && email.isEmailErr && "profile__email-error_visible"}`
              }>Поле не соответствует шаблону email.</p>
            </div>
            <p className={
              `profile__error-mesage ${isEdit && isCommonPatchErr && "profile__error-mesage_visible"}`
            }>При обновлении профиля произошла ошибка.</p>
            <p className={
              `profile__error-mesage ${isEdit && isEmailConflict && "profile__error-mesage_visible"}`
            }>Пользователь с таким email уже существует.</p>
            <p className={
              `profile__success-mesage ${isSuccessPatchMes && "profile__success-mesage_visible"}`
            }>Данные профиля успешно обновлены!</p>

            {isEdit || (<button className="profile__edit-btn" type="button" onClick={handleEditOpen}>Редактировать</button>)}
            {isEdit || (<button className="profile__log-out-btn" type="button" onClick={handleLogOut}>Выйти из аккаунта</button>)}
            {isEdit && (<button className="profile__save-btn" type="submit" disabled={isBtnDisabled}>Сохранить</button>)}
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile;
