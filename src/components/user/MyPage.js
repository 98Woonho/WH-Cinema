import '../../css/user/MyPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../Pagination.js';
import Loading from '../Loading.js';
import axios from 'axios';

function MyPage() {
    const boardPerPage = 10;

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [newUserId, setNewUserId] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [ticketingList, setTicketingList] = useState([]);
    const [perTicketingList, setPerTicketingList] = useState([]);
    const [ticketingMap, setTicketingMap] = useState(null);
    const [menu, setMenu] = useState('infoUpdate');
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();

    const { menuState } = location.state === null ? '' : location.state;

    // 아이디 input onChange 함수
    const changeNewUserId = (e) => {
        setNewUserId(e.target.value);
    }

    // 현재 비밀번호 input onChange 함수
    const changeCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    // 새 비밀번호 input onChange 함수
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

    // 회원정보확인/수정 메뉴 선택 함수
    const handleUpdateInfo = (e) => {
        handleMenu(e);

        setMenu('infoUpdate');
    }

    // 회원탈퇴 메뉴 선택 함수
    const handleSecession = (e) => {
        handleMenu(e);

        setMenu('secession');
    }

    // 예매현황 메뉴 선택 함수
    const handleTicketingInfo = (e) => {
        handleMenu(e);

        setMenu('ticketingInfo');
    }

    // 예약 취소 버튼 click 함수
    const handleClickTicketingCancel = (e) => {
        if (window.confirm('정말로 예약을 취소하시겠습니까?')) {
            const status = '예약완료';
            axios.delete(`/ticketing/${e.target.dataset.id}/${status}`)
                .then(res => {
                    alert('예약이 취소 되었습니다.');

                    const state = {
                        menuState: 'ticketingInfo'
                    }
                    navigate('/user/myPage', { state });
                    window.location.reload();
                })
                .catch(err => {
                    alert('알 수 없는 이유로 예약 취소에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
                })
        }
    }

    // 아이디 변경 버튼 click 함수
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

    // 비밀번호 변경 버튼 click 함수
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

    // 본인인증 버튼 click 함수
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

                    const userObj = { newName: name, newPhone: phone, currentUserId: user.user_id };

                    axios.patch('/user', userObj)
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
                            console.log(err);
                        })

                } else {
                    alert("인증에 실패하였습니다. 에러 내용: " + res.error_msg);
                }
            }
        )
    }

    // 회원탈퇴 버튼 click 함수
    const handleSubmitSecession = () => {
        if (window.confirm('정말로 회원 탈퇴를 하시겠습니까?\n탈퇴한 계정은 복구가 불가능합니다.')) {
            axios.delete(`/user/${user.user_id}`)
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
        // state가 존재할 때 (결제 완료 후 예매현황 페이지로 이동할 때 state를 같이 요청으로 보냄)
        if (menuState) {
            const menus = document.querySelectorAll('.menu');
            menus.forEach(menu => {
                menu.classList.remove('selected');
                if (menu.innerText === '예매현황') {
                    menu.classList.add('selected');
                }
            })

            setMenu(menuState);
        }

        axios.get('/user/accessTokenPayload', { withCredentials: true })
            .then(res => {
                const userId = res.data.userId;

                axios.get(`/user?userId=${userId}`)
                    .then(res => {
                        setUser(res.data[0]);
                        setNewUserId(res.data[0].user_id);
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
        if (menuState) {
            setIsLoading(true);
        }
        
        if (newUserId) {
            axios.get(`/ticketing?userId=${newUserId}`)
                .then(res => {
                    setTicketingList(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [newUserId])

    useEffect(() => {
        // 현재 페이지에 나타낼 예매현황 set
        const startIndex = (currentPage - 1) * boardPerPage;
        const endIndex = startIndex + boardPerPage;
        setPerTicketingList(ticketingList.slice(startIndex, endIndex));
    }, [ticketingList, currentPage])

    useEffect(() => {
        // 예매 리스트 map
        const ticketingMap = perTicketingList.map(ticketing => {
            let screenDate = new Date(ticketing.screen_date);
            screenDate = screenDate.toISOString().slice(0, 10);

            return (
                <tr>
                    <td>{ticketing.movie_title}</td>
                    <td>{ticketing.theater_name}</td>
                    <td>{ticketing.screen_hall_name}</td>
                    <td>{screenDate}</td>
                    <td>{ticketing.screen_time}</td>
                    <td>{ticketing.seat}</td>
                    <td>{ticketing.status}</td>
                    <td>
                        <button data-id={ticketing.id} onClick={handleClickTicketingCancel} className='ticketing-cancel-btn'>예약취소</button>
                    </td>
                </tr>
            )
        });

        setTicketingMap(ticketingMap);
        setIsLoading(false);

    }, [perTicketingList])

    return (
        <main id='myPageMain'>
            <Loading isVisible={isLoading} />
            <div className="content-container">
                <div className="my-page-container">
                    <div className="my-page-left">
                        <ul>
                            <li className='menu-title'>
                                <h2>회원</h2>
                            </li>
                            <li className='menu selected' onClick={handleUpdateInfo}>회원정보확인/수정</li>
                            <li className='menu' onClick={handleSecession}>회원탈퇴</li>
                            <li className='menu-title'>
                                <h2>예매</h2>
                            </li>
                            <li className='menu' onClick={handleTicketingInfo}>예매현황</li>
                        </ul>

                    </div>
                    <div className="my-page-right">
                        {menu === 'infoUpdate' ?
                            <>
                                <h2>회원정보확인/수정</h2>
                                <table className='user-info-update-table'>
                                    <tbody>
                                        <tr>
                                            <th>아이디</th>
                                            <td>
                                                <div>
                                                    <input type='text' className='common-input id-input' name='userId' value={newUserId} onChange={changeNewUserId} />
                                                    <button className='my-page-btn update-id-btn' onClick={handleUpdateId}>아이디 변경</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>비밀번호</th>
                                            <td>
                                                <div>
                                                    <label>현재 비밀번호</label>
                                                    <input type='password' className='common-input' name='currentPassword' placeholder='현재 비밀번호' onChange={changeCurrentPassword} />
                                                </div>
                                                <div>
                                                    <label>새 비밀번호</label>
                                                    <input type='password' className='common-input' name='newPassword' placeholder='새 비밀번호 (영문, 숫자, 특수문자로 구성된 8~15자리)' onChange={changeNewPassword} />
                                                </div>
                                                <button className='my-page-btn update-password-btn' onClick={handleUpdatePassword}>비밀번호 변경</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>이름 및 휴대폰 번호</th>
                                            <td>
                                                <div>
                                                    <span class='name'>
                                                        {user.name}
                                                    </span>
                                                    <span>
                                                        {user.phone}
                                                    </span>
                                                    <button className='my-page-btn certification-btn' onClick={certification}>본인인증</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                            : menu === 'secession' ?
                                <>
                                    <h2>회원 탈퇴 확인 안내</h2>
                                    <div className='secession-text-container'>
                                        안녕하세요, {user.name}님. <br></br>
                                        귀하의 회원 탈퇴 요청을 받았습니다. 귀하께서 소중한 회원으로서 보낸 시간에 감사드립니다. <br></br>
                                        다음 사항에 유의하시기 바랍니다. <br></br>
                                        <div style={{ margin: '0.5rem 0 0.5rem 0.5rem' }}>
                                            - 회원 탈퇴는 1시간 내에 공식적으로 완료 됩니다.<br></br>
                                            - 회원 탈퇴 시, 작성한 게시글이나 댓글은 모두 삭제 됩니다.<br></br>
                                            - 회원 전용 기능 및 혜택은 탈퇴 후에는 더 이상 이용할 수 없습니다. <br></br>
                                        </div>
                                        탈퇴와 관련하여 궁금한 사항이 있으시면 언제든지 고객지원팀에 연락 주시기 바랍니다. <br></br>
                                        탈퇴를 원하시면 오른쪽 하단의 회원탈퇴 버튼을 클릭해 주시기 바랍니다.
                                    </div>
                                    <button className='my-page-btn secession-btn' onClick={handleSubmitSecession}>회원탈퇴</button>
                                </>
                                :
                                <>
                                    <h2>예매현황</h2>
                                    <table class='ticketing-table'>
                                        <thead>
                                            <th>영화명</th>
                                            <th>영화관</th>
                                            <th>상영관</th>
                                            <th>상영날짜</th>
                                            <th>상영시간</th>
                                            <th>좌석</th>
                                            <th>상태</th>
                                            <th></th>
                                        </thead>
                                        <tbody>
                                            {ticketingMap}
                                        </tbody>
                                    </table>
                                    <Pagination total={ticketingList.length} boardPerPage={boardPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                </>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MyPage;