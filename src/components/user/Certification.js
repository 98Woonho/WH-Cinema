import axios from 'axios';

function Certification() {

    const certification = (e) => {
        e.preventDefault();

        const { IMP } = window;
        IMP.init('imp82217082');

        IMP.certification(
            {
                pg: 'inicis_unified',
                merchant_uid: `mid_${new Date().getTime()}`,
            },
            function (res) {
                if (res.success) {
                    axios.post('/user/certification', { imp_uid: res.imp_uid }, {
                        headers: { 'Content-Type': 'application/json' }
                    })
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

    return (
        <div>
            <button className='certification-btn' onClick={certification}>본인인증</button>
        </div>
    );
}

export default Certification;