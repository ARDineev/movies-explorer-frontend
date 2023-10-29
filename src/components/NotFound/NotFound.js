import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
      </div>
      <p className="not-found__caption">Страница не найдена</p>
      <button className="not-found__btn" onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}

export default NotFound;