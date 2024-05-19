// 헤더

import { useState, useEffect } from 'react';
import { Cookies } from "react-cookie";
import axios from 'axios';
import '../css/Header.css'

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const authorizationCookie = cookies.get('authorization');

    if (authorizationCookie) {
      const accessToken = cookies.get('authorization').split('Bearer ')[1];

      axios.get('/user/verify', { params: { token: accessToken } })
        .then(res => {
          if (res.data.ok === true) {
            console.log(isAuthenticated);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [cookies]);

  return (
    <div id='header'>
      <a href='/movie'>영화</a>
      <a href='/ticketing'>예매</a>
      {isAuthenticated ? (
        <>
          <a href='/'>로그아웃</a>
        </>
      ) : (
        <>
          <a href='/user/login'>로그인</a>
          <a href='/user/certification'>회원가입</a>
        </>
      )}
    </div>
  )
}

export default Header;
