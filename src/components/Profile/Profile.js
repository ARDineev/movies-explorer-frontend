import React from 'react';
import Header from '../Header/Header';

function Profile({ handleLogOut, loggedIn }) {
  const [isEdit, setIsEdit] = React.useState(false);

  function handleEditOpen() {
    setIsEdit(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <div className="profile__info-container">
              <label className="profile__info-text" for="profile-name">Имя</label>
              <input className="profile__info-input" id="profile-name" defaultValue="Виталий" placeholder="Ваше имя" readOnly={!isEdit} minLength="2" maxLength="40" required/>
            </div>
            <div className="profile__info-container">
              <label className="profile__info-text" for="profile-email">E-mail</label>
              <input className="profile__info-input" id="profile-email" defaultValue="pochta@yandex.ru" placeholder="Ваш email" readOnly={!isEdit} minLength="2" maxLength="40" required/>
            </div>
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