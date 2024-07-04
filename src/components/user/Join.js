import '../../css/user/Join.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Join() {
    const location = useLocation();
    const navigate = useNavigate();

    const [userIdCondition, setUserIdCondition] = useState(0); // 아이디 조건 텍스트 활성화/비활성화
    const [passwordCondition, setPasswordCondition] = useState(0); // 비밀번호 조건 텍스트 활성화/비활성화
    const [isSatisfiedUserIdCondition1, setIsSatisfiedUserIdCondition1] = useState(false); // 아이디 조건 1
    const [isSatisfiedUserIdCondition2, setIsSatisfiedUserIdCondition2] = useState(false); // 아이디 조건 2
    const [isSatisfiedPasswordCondition1, setIsSatisfiedPasswordCondition1] = useState(false); // 비밀번호 조건 1

    const { certificationInfo } = location.state;
    const { name, birthday, phone } = certificationInfo;

    const userIdRegex = /^[a-z][a-z0-9]{5,14}$/; // 영문자로 시작하는 영어또는 숫자로 구성된 6~15자
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/; // 영어, 숫자, 특수문자로 구성된 8~15자

    const handleChangeUserId = (e) => {
        // 아이디 조건 텍스트 활성화
        setUserIdCondition(1);

        const userIdConditionRegex1 = /^[a-z]/;

        // 조건 1 유효성 검사 (영어 소문자로 시작)
        setIsSatisfiedUserIdCondition1(userIdConditionRegex1.test(e.target.value) ? true : false);

        // 조건 2 유효성 검사 (영어 소문자, 숫자로 구성된 6~15자리)
        setIsSatisfiedUserIdCondition2(userIdRegex.test(e.target.value) ? true : false);
    }

    const handleChangePassword = (e) => {
        // 비밀번호 조건 텍스트 활성화
        setPasswordCondition(1);

        // 조건 1 유효성 검사 (영어, 숫자, 특수문자로 구성된 8~15자리)
        setIsSatisfiedPasswordCondition1(passwordRegex.test(e.target.value) ? true : false);
    }

    // 회원가입 버튼 click 함수
    const handleSubmitJoin = (e) => {
        e.preventDefault();

        const userId = e.target.userId.value;
        const password = e.target.password.value;

        if (userId === '') {
            alert('아이디를 입력해 주세요.');
            return;
        }

        if (!userIdRegex.test(userId)) {
            alert('올바른 아이디를 입력해 주세요.');
            return;
        }

        if (password === '') {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        if (!passwordRegex.test(password)) {
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
                    <input onChange={handleChangeUserId} className='common-input' type='text' name='userId' placeholder='아이디' />
                    <div className={`condition-container ${userIdCondition === 1 ? 'visible' : ''}`}>
                        <div className='condition'>
                            {isSatisfiedUserIdCondition1 ? <img className='condition-icon' src='../check-icon.png' /> : <img className='condition-icon' src='../x-icon.png' />}
                            <span className={`condition-text ${isSatisfiedUserIdCondition1 ? 'success' : ''}`}>아이디는 영어 소문자로 시작</span>
                        </div>
                        <div className='condition'>
                            {isSatisfiedUserIdCondition2 ? <img className='condition-icon' src='../check-icon.png' /> : <img className='condition-icon' src='../x-icon.png' />}
                            <span className={`condition-text ${isSatisfiedUserIdCondition2 ? 'success' : ''}`}>영어 소문자, 숫자로 구성된 6~15자리</span>
                        </div>
                    </div>

                    <label>비밀번호</label>
                    <input onChange={handleChangePassword} className='common-input' type='password' name='password' placeholder="비밀번호 (영문, 숫자, 특수문자로 구성된 8~15자리)" />
                    <div className={`condition-container ${passwordCondition === 1 ? 'visible' : ''}`}>
                        <div className='condition'>
                            {isSatisfiedPasswordCondition1 ? <img className='condition-icon' src='../check-icon.png' /> : <img className='condition-icon' src='../x-icon.png' />}
                            <span className={`condition-text ${isSatisfiedPasswordCondition1 ? 'success' : ''}`}>영문, 숫자, 특수문자로 구성된 8~15자리</span>
                        </div>
                    </div>

                    <button className='join-btn'>회원가입</button>
                </form>
            </div>
        </main>
    )
}

export default Join;