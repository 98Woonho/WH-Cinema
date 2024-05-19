// 헤더
import '../css/Header.css'

function Header({ isAuthenticated }) {
  console.log(isAuthenticated);
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
