import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';

const App = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn === "true" ? <Navigate to="/admin" /> : <Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
