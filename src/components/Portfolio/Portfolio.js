function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <a href="https://github.com/ARDineev/how-to-learn" className="portfolio__link portfolio__link_type_caption">Статичный сайт</a>
          <a href="https://github.com/ARDineev/how-to-learn" className="portfolio__link">↗</a>
        </li>
        <li className="portfolio__link-container">
          <a href="https://github.com/ARDineev/russian-travel" className="portfolio__link portfolio__link_type_caption">Адаптивный сайт</a>
          <a href="https://github.com/ARDineev/russian-travel" className="portfolio__link">↗</a>
        </li>
        <li className="portfolio__link-container">
          <a href="https://github.com/ARDineev/react-mesto-api-full-gha" className="portfolio__link portfolio__link_type_caption">Одностраничное приложение</a>
          <a href="https://github.com/ARDineev/react-mesto-api-full-gha" className="portfolio__link">↗</a>
        </li>
      </ul>

    </section>
  )
}

export default Portfolio;