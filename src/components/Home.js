// 홈페이지

import { useState, useEffect } from 'react';
import { Cookies } from "react-cookie";
import axios from 'axios';

// cheerio : html/xml을 파싱하고 쉽게 조작하게 해주는 js 라이브러리
// import cheerio from 'cheerio'
import '../css/Home.css';

function Home() {
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('authorization').split('Bearer ')[1];
    
    axios.get('/user/verify', { params : { token : token }})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })


  });

  return (
    <div id='home'>
      홈
    </div>
  )
}


export default Home;
