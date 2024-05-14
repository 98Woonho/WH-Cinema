import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Certification() {
    const navigate = useNavigate();

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
                    const certificationInfo = await axios.post('/user/certification', { imp_uid: res.imp_uid }, { headers: { 'Content-Type': 'application/json' } });

                    await axios.get('/user', { name: certificationInfo.name, birthday: certificationInfo.birthday, phone: certificationInfo.phone })
                        .then(res => {
                            if (res.data.length === 0) {
                                const state = {
                                    certificationInfo: {
                                        name: certificationInfo.name,
                                        birthday: certificationInfo.birthday,
                                        phone: certificationInfo.phone
                                    }
                                }
                                navigate('/user/join', { state });
                            } else {
                                alert('이미 해당 정보로 계정이 존재 합니다. 로그인 화면으로 이동합니다.');
                                navigate('/user/login');
                            }
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

    return (
        <div>
            <button className='certification-btn' onClick={certification}>본인인증</button>
        </div>
    );
}

export default Certification;