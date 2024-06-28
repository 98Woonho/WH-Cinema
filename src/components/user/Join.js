import '../../css/user/Join.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Join() {
    const location = useLocation();
    const navigate = useNavigate();

    const { certificationInfo } = location.state;
    const { name, birthday, phone } = certificationInfo;

    const handleSubmitJoin = (e) => {
        e.preventDefault();
        
        const userId = e.target.userId.value;
        const password = e.target.password.value;

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

        const formData = new FormData(e.target);
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('phone', phone);

        axios.post('/user/join', formData)
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

    return (
        <main id='joinMain' className='main'>
            <div className="content-container">
                <h1 className='main-title'>회원가입</h1>
                <form onSubmit={handleSubmitJoin} id="joinForm">
                    <label>아이디</label>
                    <input className='common-input' type='text' name='userId' placeholder='아이디' />

                    <label>비밀번호</label>
                    <input className='common-input' type='password' name='password' placeholder="비밀번호 (영문, 숫자, 특수문자를 포함한 8~15자)"/>

                    <button className='join-btn'>회원가입</button>
                </form>
            </div>
        </main>
    )
}

export default Join;