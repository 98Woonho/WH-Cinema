import '../../css/user/Join.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
    const navigate = useNavigate();
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const handleId = (e) => {
        setId(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const join = () => {
        const idRegex = /^[a-z0-9]+$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

        if (id === '') {
            alert('아이디를 입력해 주세요.')
            return
        }

        if (id.match(idRegex) === null) {
            alert('올바른 아이디를 입력해 주세요.')
            return
        }

        if (password === '') {
            alert('비밀번호를 입력해 주세요.')
            return
        }

        if (password.match(passwordRegex) === null) {
            alert('올바른 비밀번호를 입력해 주세요.')
            return
        }

        const userObj = {id:id, password:password}

        axios.post('/user/join', userObj)
        .then(res => {
            if(!res.data.errno) {
                switch(res.data) {
                    case 'DUPLICATE_ID':
                        alert('이미 존재하는 아이디 입니다. 다른 아이디를 입력해 주세요.')
                        break;
    
                    case 'SUCCESS':
                        alert('회원가입이 완료 되었습니다.')
                        navigate('/user/login')
                        break;
    
                    default:
                }
            } 
        })
        .catch(err => {
            alert('알 수 없는 이유로 회원가입에 실패 하였습니다. 잠시 후 다시 시도해 주세요.')
        })
    }

    return(
        <div id='join'>
            <h2>회원가입</h2>
            <div>
                <label>아이디 : </label>
                <input type='text' name='id' value={id} onChange={handleId} />
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