// 헤더

// import { useState, useEffect } from 'react';
import '../css/Header.css'

function Header() {
  return(
    <div id='header'>
       <a href='/movie'>영화</a>
       <a href='/ticketing'>예매</a>
       <a href='/user/login'>로그인</a>
       <a href='/user/join'>회원가입</a>
    </div>
  )
}

export default Header;
