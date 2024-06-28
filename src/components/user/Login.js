import '../../css/user/Login.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isWarning, setIsWarning] = useState(false);

    const { isJoinPage } = location.state === null ? '' : location.state;

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('rememberMe', e.target.rememberMe.checked);

        axios.post('/user/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                isJoinPage ? navigate('/') : navigate(-1);
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setIsWarning(true);
                } else {
                    alert('알 수 없는 이유로 로그인에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            })
    }

    return (
        <main id='loginMain' className='main'>
            <div className='content-container'>
                <h1 className='main-title'>로그인</h1>
                <form onSubmit={handleSubmitLogin} id='loginForm'>
                    <div>
                        <input className='common-input' type='text' name='userId' placeholder='아이디' />
                    </div>
                    <div>
                        <input className='common-input' type='password' name='password' placeholder='비밀번호' />
                    </div>
                    <div className={`warning ${isWarning ? 'visible' : ''}`}>
                        아이디 혹은 비밀번호가 올바르지 않습니다. 다시 한 번 확인해 주세요.
                    </div>
                    <div>
                        <input type='checkbox' name='rememberMe' />
                        <span>로그인 유지</span>
                    </div>
                    <div>
                        <button className='login-btn'>Login</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login;