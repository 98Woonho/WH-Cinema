import '../../css/user/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [userId, setuserId] = useState('')
    const [password, setPassword] = useState('')

    const handleuserId = (e) => {
        setuserId(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const login = () => {
        const userObj = {userId:userId, password:password}
        axios.post('/user/login', userObj)
        .then(res => {
            if(!res.data.errno) {
                switch(res.data) {
                    case 'FAILURE':
                        alert('아이디 혹은 비밀번호가 올바르지 않습니다. 다시 한 번 확인해 주세요.')
                        break;
    
                    case 'SUCCESS':
                        navigate('/')
                        break;
    
                    default:
                }
            } else {
                alert('서버가 예상치 못한 응답을 반환 하였습니다. 잠시 후 다시 시도해 주세요.')
            }
        })
        .catch(err => {
            alert('알 수 없는 이유로 로그인에 실패 하였습니다. 잠시 후 다시 시도해 주세요.')
        })
    }

    return(
        <div id='login'>
            <h2>로그인</h2>
            <div>
                <label>아이디 : </label>
                <input type='text' name='userId' value={userId} onChange={handleuserId} />
            </div>
            <div>
                <label>비밀번호 : </label>
                <input type='password' name='password' value={password} onChange={handlePassword} />
            </div>
            <div>
                <p id='warning'></p>
            </div>
            <div>
                <button type='button' onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login;