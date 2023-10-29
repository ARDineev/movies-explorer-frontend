function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <p className="portfolio__link-caption">Статичный сайт</p>
          <a href="https://github.com/ARDineev/how-to-learn" className="portfolio__link">↗</a>
        </li>
        <li className="portfolio__link-container">
          <p className="portfolio__link-caption">Адаптивный сайт</p>
          <a href="https://github.com/ARDineev/russian-travel" className="portfolio__link">↗</a>
        </li>
        <li className="portfolio__link-container">
          <p className="portfolio__link-caption">Одностраничное приложение</p>
          <a href="https://github.com/ARDineev/react-mesto-api-full-gha" className="portfolio__link">↗</a>
        </li>
      </ul>

    </section>
  )
}

export default Portfolio;