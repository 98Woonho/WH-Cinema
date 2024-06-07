import '../../css/user/MyPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPage() {
    const [user, setUser] = useState([]);
    const [updateUserId, setUpdateUserId] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [menu, setMenu] = useState('info');

    const navigate = useNavigate();

    const handleUpdateUserId = (e) => {
        setUpdateUserId(e.target.value);
    }

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    // 메뉴 이벤트
    const handleMenu = (e) => {
        const menus = document.querySelectorAll('.menu');
        e.target.classList.add('selected');
        menus.forEach(menu => {
            if (menu !== e.target) {
                menu.classList.remove('selected');
            }
        })
    }

    const handleInfo = (e) => {
        handleMenu(e);

        setMenu('info');
    }

    const handleInfoUpdate = (e) => {
        handleMenu(e);

        setMenu('infoUpdate');
    }

    const handleSecession = (e) => {
        handleMenu(e);

        setMenu('secession');
    }

    const handleTicketingInfo = (e) => {
        handleMenu(e);

        setMenu('ticketingInfo');
    }

    const handleUpdateId = (e) => {

    }

    const handleUpdatePassword = (e) => {
        
    }

    useEffect(() => {
        axios.get('/user/accessTokenPayload', { withCredentials: true })
            .then(res => {
                const userId = res.data.userId;

                axios.get(`/user/${userId}`)
                    .then(res => {
                        setUser(res.data[0]);
                        setUpdateUserId(res.data[0].user_id);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                if (err.response.status === 401) {
                    if (window.confirm('로그인 후 이용 가능한 서비스 입니다.\n로그인 하시겠습니까?')) {
                        navigate('/user/login');
                    } else {
                        return;
                    }
                }
            })
    }, [])

    return (
        <div id='myPage'>
            <div className="my-page-left">
                <div className='menu-container'>
                    <h2 className='menu-title'>회원</h2>
                    <p className='menu selected' onClick={handleInfo}>회원정보</p>
                    <p className='menu' onClick={handleInfoUpdate}>회원정보수정</p>
                    <p className='menu' onClick={handleSecession}>회원탈퇴</p>
                </div>
                <div className='menu-container'>
                    <h2 className='menu-title'>예매</h2>
                    <p className='menu' onClick={handleTicketingInfo}>예매현황</p>
                </div>
            </div>
            <div className="my-page-right">
                {menu === 'info' ?
                    <div className='user-info'>
                        <span>아이디 : {user.user_id}</span>
                        <span>이름 : {user.name}</span>
                        <span>휴대폰 번호 : {user.phone}</span>
                    </div>
                    : menu === 'infoUpdate' ?
                        <table className='user-info-update-table'>
                            <tbody>
                                <tr>
                                    <td className='row-title'>아이디</td>
                                    <td>
                                        <input type='text' name='userId' value={updateUserId} onChange={handleUpdateUserId} />
                                        <button className='update-btn' onClick={handleUpdateId}>아이디 변경</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='row-title'>비밀번호</td>
                                    <td>
                                        <div>
                                            <label>현재 비밀번호</label>
                                            <input type='password' name='currentPassword' onChange={handleCurrentPassword} />
                                        </div>
                                        <div>
                                            <label>새 비밀번호</label>
                                            <input type='password' name='newPassword' onChange={handleNewPassword} />
                                        </div>
                                        <button className='update-btn' onClick={handleUpdatePassword}>비밀번호 변경</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        : menu === 'secession' ?
                            <div>

                            </div>
                            : <div>

                            </div>
                }
            </div>
        </div>
    );
}

export default MyPage;