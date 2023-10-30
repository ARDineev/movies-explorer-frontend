function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="section-title" id="about-project">О проекте</h2>
      <div className="about-project__description">
        <p className="about-project__caption about-project__caption_row_one">Дипломный проект включал 5 этапов</p>
        <p className="about-project__caption about-project__caption_row_three">На выполнение диплома ушло 5 недель</p>
        <p className="about-project__annotation about-project__annotation_row_two">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about-project__annotation about-project__annotation_row_four">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__scheme">
        <p className="about-project__duration about-project__duration_color_green">1 неделя</p>
        <p className="about-project__duration about-project__duration_color_gray">4 недели</p>
        <p className="about-project__stage">Back-end</p>
        <p className="about-project__stage">Front-end</p>
      </div>

    </section>
  )
}

export default AboutProject;
