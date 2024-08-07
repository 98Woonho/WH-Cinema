import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Ticketing from './components/Ticketing';
import MovieRouter from './components/movie/MovieRouter';
import UserRouter from './components/user/UserRouter';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
${reset}
`;

function App() {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, [])

  useEffect(() => {
    // accessToken, refreshToken 검증
    axios.get('/user/verify', { withCredentials: true })
      .then(res => {
        setIsAuthenticated(true);
      })
      .catch(err => {
        if (err.response.status === 401) {
          setIsAuthenticated(false);

          axios.post('/user/logout')
            .then(res => {
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
  }, [location]);

  return (
    <div id='App'>
      <GlobalStyle />
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ticketing' element={<Ticketing />} />
        <Route path='/user/*' element={<UserRouter />} />
        <Route path='/movie/*' element={<MovieRouter />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}