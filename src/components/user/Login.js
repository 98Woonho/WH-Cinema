import '../../css/user/Login.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { isJoinPage } = location.state === null ? '' : location.state;

    const handleUserId = (e) => {
        setUserId(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('rememberMe', e.target.rememberMe.checked);

        axios.post('/user/login', formData)
            .then(res => {
                isJoinPage ? navigate('/') : navigate(-1);
            })
            .catch(err => {
                if (err.response.status === 400) {
                    alert(err.response.data.msg);
                } else {
                    alert('알 수 없는 이유로 로그인에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            })
    }

    return (
        <div id='loginMain' className='main'>
            <div className="content-container">
                <h1>로그인</h1>
                <div className="login-container">
                    <form onSubmit={handleSubmitLogin} id='loginForm'>
                        <div>
                            <input className="common-input" type='text' name='userId' value={userId} onChange={handleUserId} placeholder="아이디" />
                        </div>
                        <div>
                            <input className="common-input" type='password' name='password' value={password} onChange={handlePassword} placeholder="비밀번호" />
                        </div>
                        <div>
                            <input type="checkbox" name='rememberMe' onChange={handleRememberMe} />
                            <span>로그인 유지</span>
                        </div>
                        <div>
                            <button className='login-btn'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;