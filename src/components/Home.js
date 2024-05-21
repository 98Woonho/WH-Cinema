// 홈페이지

import { useState, useEffect } from 'react';
import { Cookies } from "react-cookie";
import axios from 'axios';

// cheerio : html/xml을 파싱하고 쉽게 조작하게 해주는 js 라이브러리
// import cheerio from 'cheerio'
import '../css/Home.css';

function Home() {
  const test = async () => {
    try {
      const response = await fetch('/user/test', {
          method: 'GET',
          credentials: 'include' // 이 부분이 중요합니다. 브라우저에게 쿠키를 포함시키도록 알려줍니다.
      });

      if (response.ok) {
          const data = await response.json();
          console.log('서버로부터 받은 데이터:', data);
      } else {
          console.error('서버에서 오류 응답:', response.status);
      }
  } catch (error) {
      console.error('네트워크 오류:', error);
  }
  }

  return (
    <div id='home'>
      홈
      <button onClick={test}>테스트 버튼</button>
    </div>
  )
}


export default Home;
