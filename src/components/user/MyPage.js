import '../../css/user/MyPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPage() {
    const [user, setUser] = useState([]);
    const [newUserId, setNewUserId] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [menu, setMenu] = useState('info');

    const navigate = useNavigate();

    const changeNewUserId = (e) => {
        setNewUserId(e.target.value);
    }

    const changeCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const changeNewPassword = (e) => {
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

    const handleUpdateInfo = (e) => {
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
        e.preventDefault();

        if (newUserId === '' || newUserId === user.user_id) {
            alert('현재 아이디와 동일한 아이디 입니다. 다른 아이디를 입력해 주세요.');
            return;
        }

        axios.patch('/user', { newUserId: newUserId, currentUserId: user.user_id })
            .then(res => {
                alert(res.data.msg);

                axios.post('/user/logout', { withCredentials: true })
                    .then(res => {
                        navigate('/user/login');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                if (err.response.status === 409) {
                    alert(err.response.data.msg);
                } else {
                    alert('알 수 없는 이유로 비밀번호를 변경하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            })
    }

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

        if (newPassword.match(passwordRegex) === null) {
            alert('올바른 새 비밀번호를 입력해 주세요.');
            return;
        }

        axios.patch('/user', { newPassword: newPassword, currentUserId: user.user_id, currentPassword: currentPassword })
            .then(res => {
                alert(res.data.msg);

                axios.post('/user/logout', { withCredentials: true })
                    .then(res => {
                        navigate('/user/login');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 400) {
                    alert(err.response.data.msg);
                } else {
                    alert('알 수 없는 이유로 비밀번호를 변경하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            })
    }

    const certification = (e) => {
        e.preventDefault();

        const { IMP } = window;
        IMP.init('imp82217082');

        IMP.certification(
            {
                pg: 'inicis_unified',
                merchant_uid: `mid_${new Date().getTime()}`,
            },
            async function (res) {
                if (res.success) {
                    // 통합인증 정보 가져오기
                    const certificationInfo = await axios.post('/user/certification', { imp_uid: res.imp_uid }, { headers: { 'Content-Type': 'application/json' } });

                    // 통합인증 정보에서 필요한 정보 set
                    const { name, phone } = certificationInfo.data.response;

                    const userObj = { name: name, phone: phone };

                    axios.patch('/user', userObj)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.log(err);
                        })

                } else {
                    alert("인증에 실패하였습니다. 에러 내용: " + res.error_msg);
                }
            }
        )
    }

    const handleSubmitSecession = () => {
        if (window.confirm('정말로 회원 탈퇴를 하시겠습니까?\n탈퇴한 계정은 복구가 불가능합니다.')) {
            axios.delete(`/user/{${user.user_id}}`)
            .then(res => {
                axios.post('/user/logout', { withCredentials: true })
                    .then(res => {
                        alert('회원탈퇴가 완료 되었습니다.\n로그인 화면으로 이동합니다.')
                        navigate('/user/login');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        axios.get('/user/accessTokenPayload', { withCredentials: true })
            .then(res => {
                const userId = res.data.userId;

                axios.get(`/user/${userId}`)
                    .then(res => {
                        setUser(res.data[0]);
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

    useEffect(() => {
        setNewUserId(user.user_id);
    }, [user])

    return (
        <div id='myPage'>
            <div className="my-page-left">
                <div className='menu-container'>
                    <h2 className='menu-title'>회원</h2>
                    <p className='menu selected' onClick={handleInfo}>회원정보</p>
                    <p className='menu' onClick={handleUpdateInfo}>회원정보수정</p>
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
                                        <input type='text' name='userId' value={newUserId} onChange={changeNewUserId} />
                                        <button className='update-btn' onClick={handleUpdateId}>아이디 변경</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='row-title'>비밀번호</td>
                                    <td>
                                        <div>
                                            <label>현재 비밀번호</label>
                                            <input type='password' name='currentPassword' onChange={changeCurrentPassword} />
                                        </div>
                                        <div>
                                            <label>새 비밀번호</label>
                                            <input type='password' name='newPassword' onChange={changeNewPassword} />
                                        </div>
                                        <button className='update-btn' onClick={handleUpdatePassword}>비밀번호 변경</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='row-title'>이름 및 휴대폰 번호</td>
                                    <td>
                                        {user.name}
                                        {user.phone}
                                        <button className='update-btn' onClick={certification}>본인인증</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        : menu === 'secession' ?
                            <div>
                                <button className='secession-btn' onClick={handleSubmitSecession}>회원탈퇴</button>
                            </div>
                            : <div>

                            </div>
                }
            </div>
        </div>
    );
}

export default MyPage;