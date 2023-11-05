import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(true);

  function handleLogOut() {
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
        <Route exact path="/movies" element={<Movies loggedIn={loggedIn} />} />
        <Route exact path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} />} />
        <Route exact path="/profile" element={<Profile handleLogOut={handleLogOut} loggedIn={loggedIn} />} />
        <Route exact path="/signin" element={<Login/>} />
        <Route exact path="/signup" element={<Register/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
