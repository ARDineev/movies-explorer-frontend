function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове,
            закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс
            по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href="#" className="about-me__link">Github</a>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </section>
  )
}

export default AboutMe;