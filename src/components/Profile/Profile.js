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
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <div className="profile__info-container">
            <p className="profile__info-text">Имя</p>
            <input className="profile__info-input" defaultValue="Виталий" readOnly={!isEdit} />
          </div>
          <div className="profile__info-container">
            <p className="profile__info-text">E-mail</p>
            <input className="profile__info-input" defaultValue="pochta@yandex.ru" readOnly={!isEdit} />
          </div>
          {isEdit || (<button className="profile__edit-btn" type="button" onClick={handleEditOpen}>Редактировать</button>)}
          {isEdit || (<button className="profile__log-out-btn" type="button" onClick={handleLogOut}>Выйти из аккаунта</button>)}
          {isEdit && (<button className="profile__save-btn" type="submit">Сохранить</button>)}
        </form>
      </section>
    </>
  )
}

export default Profile;