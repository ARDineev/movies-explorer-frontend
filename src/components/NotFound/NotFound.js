import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="main">
      <section className="not-found">
        <div className="not-found__container">
          <h1 className="not-found__title">404</h1>
        </div>
        <p className="not-found__caption">Страница не найдена</p>
        <button className="not-found__btn" type="button" onClick={() => navigate(-1)}>Назад</button>
      </section>
    </main>
  )
}

export default NotFound;