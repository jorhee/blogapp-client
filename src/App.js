import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Blogs from './components/Blogs';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import LogoutButton from './pages/LogoutButton';



import Profile from './pages/Profile';
import Register from './pages/Register';






function App() {
  return (
    <>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AppNavbar />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
      </Router>
    </>
  );
}

export default App;
