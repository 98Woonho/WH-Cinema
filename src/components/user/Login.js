import '../../css/user/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleUserId = (e) => {
        setUserId(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    }

    const login = () => {
        const userObj = { userId: userId, password: password, rememberMe: rememberMe };
        axios.post('/user/login', userObj)
            .then(res => {
                navigate(-1);
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
        <div id='login'>
            <h2>로그인</h2>
            <div>
                <label>아이디 : </label>
                <input type='text' name='userId' value={userId} onChange={handleUserId} />
            </div>
            <div>
                <label>비밀번호 : </label>
                <input type='password' name='password' value={password} onChange={handlePassword} />
            </div>
            <div>
                <input type="checkbox" onChange={handleRememberMe}/>
                <span>로그인 유지</span>
            </div>
            <div>
                <button type='button' onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login;