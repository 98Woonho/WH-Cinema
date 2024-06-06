// 헤더
import '../css/Header.css';
import axios from 'axios';

function Header(isAuthenticated) {

  const handleLogout = () => {
    axios.post('user/logout', { withCredentials: true })
    .then(res => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  return (
    <div id='header'>
      <a href='/movie'>영화</a>
      <a href='/ticketing'>예매</a>
      {!isAuthenticated.isAuthenticated ? (
        <>
          <a href='/user/login'>로그인</a>
          <a href='/user/certification'>회원가입</a>
        </>
      ) : (
        <>
          <button className="logout" onClick={handleLogout}>로그아웃</button>
          <a href='/user/myPage'>마이페이지</a>
        </>
      )}
    </div>
  )
}

export default Header;