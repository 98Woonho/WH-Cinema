import '../../css/user/Join.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Join() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');

    const { certificationInfo } = location.state;
    const { name, birthday, phone } = certificationInfo;

    const handleuserId = (e) => {
        setuserId(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const join = () => {
        const userIdRegex = /^[a-z0-9]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

        if (userId === '') {
            alert('아이디를 입력해 주세요.');
            return;
        }

        if (userId.match(userIdRegex) === null) {
            alert('올바른 아이디를 입력해 주세요.');
            return;
        }

        if (password === '') {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        if (password.match(passwordRegex) === null) {
            alert('올바른 비밀번호를 입력해 주세요.');
            return;
        }

        const userObj = {userId:userId, password:password, name:name, birthday:birthday, phone:phone};

        axios.post('/user/join', userObj)
        .then(res => {
            const state = {
                isJoinPage: true
            }

            alert(res.data.msg);
            navigate('/user/login', { state });
        })
        .catch(err => {
            if (err.response.status === 409) {
                alert(err.response.data.msg);
            } else {
                alert('알 수 없는 이유로 회원가입에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        })
    }

    return(
        <div id='join'>
            <h2>회원가입</h2>
            <div>
                <label>아이디 : </label>
                <input type='text' name='userId' value={userId} onChange={handleuserId} />
            </div>
            <div>
                <label>비밀번호 : </label>
                <input type='password' name='password' placeholder="비밀번호 (영문, 숫자, 특수문자를 포함한 8~15자)" value={password} onChange={handlePassword} />
            </div>
            <div>
                <button type='button' onClick={join}>회원가입</button>
            </div>
        </div>
    )
}

export default Join;