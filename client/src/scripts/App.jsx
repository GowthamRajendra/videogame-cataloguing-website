import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from './hooks/useAuthContext';
import { getGames } from './api/getGames';
import { getGameById } from './api/getGameByID';
import Home from './pages/Home';
import Navbar from './components/navbar.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Gamepage from './pages/Game';
import Profile from './pages/Profile';
import '../styles/App.css'

export default function App() {
  // const [search, setSearch] = useState("");
  // games for homepage, its in the parent of home so the api doesn't get called everytime
  // the homepage is revisted.
  const [banner_info, setBannerInfo] = useState({});
  const [home_games, setGames] = useState([]);
  const { user } = useAuthContext();
  // const [page, setPage] = useState({ next: false, prev: false });
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();


  // NOTE: keep this commented out for now
  // fetch games from server to display on home page
  useEffect(() => {
    async function getBannerInfo() {
      const data = await getGameById(3498);
      setBannerInfo(data);
    }

    async function getHomeGames() {
      setLoading(true);
      const data = await getGames("");
      setGames(data.games);
      setLoading(false);
    }

    getHomeGames();
    getBannerInfo();
  }, []);

  return <div className="App has-background-link-dark">
    <Navbar />
    <Routes>
      <Route
        path='/'
        element={<Home banner_info={banner_info} games={home_games} loading={loading} />}
      />
      {/* login redirects to profile if user is logged in */}
      <Route
        path="/login"
        element={!user ? <div className='container'><Login /> </div> : <Navigate to="/profile" />}
      />
      {/* signup redirects to profile if user is logged in */}
      <Route
        path="/signup"
        element={!user ? <div className='container'><Signup /> </div> : <Navigate to="/profile" />}
      />
      {/* profile redirects to login if user is not logged in */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/games/:id"
        element={<div className='container'><Gamepage /></div>}
      />
      <Route
        path="/search"
        element={<Search />}
      />
    </Routes>
  </div>
}