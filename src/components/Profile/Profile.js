import React, { useState } from 'react';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';

function Profile({ handleLogOut, loggedIn, setCurrentUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isCommonPatchErr, setCommonPatchErr] = React.useState(false); // обобщенная ошибка при попытке патч-запроса
  const [isEmailConflict, setEmailConflict] = React.useState(false); // ошибка 409 Conflict при совпадении email у пользователей

  function handleEditOpen() {
    setIsEdit(true);
  }
  const [formValue, setFormValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.name || !formValue.email) {
      return;
    }

    try {
      const data = await mainApi.patchUserInfo(formValue.email, formValue.name);
      if (data.email && data.name) {
        setCurrentUser(data)
      }
      console.log(data);
      setIsEdit(false);
      setCommonPatchErr(false);
      setEmailConflict(false)

    } catch (err) {
      if (err.message.startsWith('409')) {
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
              <label className="profile__info-text" for="profile-name">Имя</label>
              <input className="profile__info-input"
                id="profile-name"
                defaultValue={currentUser.name}
                placeholder="Ваше имя"
                readOnly={!isEdit}
                minLength="2"
                maxLength="40"
                required
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="profile__info-container">
              <label className="profile__info-text" for="profile-email">E-mail</label>
              <input className="profile__info-input"
                id="profile-email"
                defaultValue={currentUser.email}
                placeholder="Ваш email"
                readOnly={!isEdit}
                minLength="2"
                maxLength="40"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <p className={
              `profile__error-mesage ${isEdit && isCommonPatchErr && "profile__error-mesage_visible"}`
            }>При обновлении профиля произошла ошибка.</p>
            <p className={
              `profile__error-mesage ${isEdit && isEmailConflict && "profile__error-mesage_visible"}`
            }>Пользователь с таким email уже существует.</p>

            {isEdit || (<button className="profile__edit-btn" type="button" onClick={handleEditOpen}>Редактировать</button>)}
            {isEdit || (<button className="profile__log-out-btn" type="button" onClick={handleLogOut}>Выйти из аккаунта</button>)}
            {isEdit && (<button className="profile__save-btn" type="submit">Сохранить</button>)}
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile;