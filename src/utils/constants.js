export const SHORT_MOVIE_TIME = 40; // критерий для поиска короткометражек

export const EMAIL_MIN_LENGTH = 5; // минимально-допустимая длина email для валидации
export const EMAIL_MAX_LENGTH = 30; // максимально-допустимая длина поля email
export const PASSWORD_MIN_LENGTH = 8; // минимально-допустимая длина пароля для валидации
export const PASSWORD_MAX_LENGTH = 30; // максимально-допустимая длина поля password
export const NAME_MIN_LENGTH = 2; // минимально-допустимая длина имени для валидации
export const NAME_MAX_LENGTH = 30; // максимально-допустимая длина поля name

export const MINUTES_IN_HOUR = 60; // минут в часе

export const WIDE_WINDOW_WIDTH = 1020; // ширина экрана, при которой рендерится 6 карточек
export const SMALL_WINDOW_WIDTH = 690; // ширина экрана, при которой рендерится 5 карточек
export const WINDOW_WIDTH_BURGER = 800; // ширина экрана, при которой рендерится бургер-меню
export const WIDE_WINDOW_CARDS_NUM = 6; // количество карточек, которое рендерится на широком экране
export const MIDDLE_WINDOW_CARDS_NUM = 4; // количество карточек, которое рендерится на среднем экране
export const SMALL_WINDOW_CARDS_NUM = 5; // количество карточек, которое рендерится на маленьком экране
export const WIDE_WINDOW_MORE_NUM = 3; // количество карточек, которое добавляется на большом экране при нажатии на кнопку "еще"
export const SMALL_WINDOW_MORE_NUM = 2; // количество карточек, которое добавляется на малом экране при нажатии на кнопку "еще"

export const UNAUTHORIZED_CODE = '401'; // ошибка 401 сервера
export const CONFLICT_CODE = '409'; // ошибка 409 сервера

export const TOKEN_KEY = 'token'; // ключ, по которому токен хранится в local storage
export const ALL_MOVIES_KEY = 'allMovies'; // ключ, по которому все фильмы с api beatfilm-movies хранятся в local storage
export const FILTER_KEY = 'filter'; // ключ чек-бокса фильтра короткометражек в local storage
// ключ, по которому найденные по ключевому слову и отфильтрованные фильмы с api beatfilm-movies хранятся в local storage
export const SEARCHED_MOVIES_KEY = 'searchedMovies'; 
export const KEYWORD_KEY = 'keyWord'; // ключевое слово строки поиска, хранящееся в local storage

export const MAIN_PATH = '/'; // относительный путь главной страницы
export const MOVIES_PATH = '/movies'; // относительный путь страницы с фильмами, полученными с api beatfilm-movies
export const SAVED_MOVIES_PATH = '/saved-movies'; // относительный путь страницы с сохраненными фильмами, полученными с основного бэкэнда
export const PROFILE_PATH = '/profile'; // относительный путь страницы профиля пользователя
export const SIGNIN_PATH = '/signin'; // относительный путь страницы входа на сайт
export const SIGNUP_PATH = '/signup'; // относительный путь страницы регистрации
export const ANY_PATH = '*'; // "любой" другой путь, приводящий к 404 ошибке

export const IMG_PRE_LINK = 'https://api.nomoreparties.co'; // первая часть абсолютного пути к картинке

// регулярное выражение email
export const EMAIL_REG_EXP = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const USERNAME_REG_EXP = /^[а-яА-ЯёЁa-zA-Z-\s]+$/i; // регулярное выражение имени пользователя
