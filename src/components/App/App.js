import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>

      <Footer />

    </>
  );
}

export default App;
