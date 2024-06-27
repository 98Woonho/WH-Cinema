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
    <header id='header'>
      <div className="content-container">
        <a className="logo-link" href="/">
          {/* <img className="logo" src="https://fontmeme.com/permalink/240626/2cc27132657daa24cd6375b25b976e10.png" alt="play-story-font" border="0" /> */}
        </a>
        <ul>
          <li>
            <a href='/movie'>영화</a>
          </li>
          <li>
            <a href='/ticketing'>예매</a>
          </li>
        </ul>
        <div className="flex-1"></div>
        {!isAuthenticated.isAuthenticated ? (
          <ul>
            <li>
              <a href='/user/login'>로그인</a>
            </li>
            <li>
              <a href='/user/certification'>회원가입</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
            <li>
              <a href='/user/myPage'>마이페이지</a>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header;