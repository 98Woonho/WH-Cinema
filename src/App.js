import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MovieRouter from './components/movie/MovieRouter';
import UserRouter from './components/user/UserRouter';
import { Cookies } from "react-cookie";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function App() {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);

  useEffect(() => {
    const authorizationCookie = cookies.get('authorization'); // authorization 쿠키 가져오기

    console.log(authorizationCookie);

    if (authorizationCookie) { // 쿠키가 있을 때
      const accessToken = cookies.get('authorization').split('Bearer ')[1]; // 쿠키에서 accessToken 가져오기
      console.log(accessToken);

      axios.get('/user/accessVerify', {params: { accessToken: accessToken }})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

      const decodedToken = jwtDecode(accessToken); // accessToken을 decode해서 payload 정보 가져오기
      const userId = decodedToken.userId; // payload에 있는 userId

      console.log(userId);

      // user의 refreshToken 가져오기
      axios.get('/user/refreshToken', { params: { userId: userId } })
        .then(res => {
          const refreshToken = res.data;

          // refreshToken 검증
          axios.get('/user/refreshVerify', { params: { refreshToken: refreshToken } })
            .then(res => {
              if (res.data.ok === true) { // ok
                setIsAuthenticated(true);
              } else { // 만료
                setIsAuthenticated(false);
              }
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      
    }

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
  }, []);

  return (
    <div id='App'>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/*' element={<UserRouter />} />
          <Route path='/movie/*' element={<MovieRouter />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;