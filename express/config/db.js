var mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'wh_cinema',
    port:3306
})

// ticketing table에서 status='예약중'인 데이터가 10분이 지나면 삭제가 되도록 하는 이벤트
function createEvent() {
    const createEventQuery = `
        CREATE EVENT IF NOT EXISTS delete_old_reservations
        ON SCHEDULE EVERY 1 SECOND
        DO
          DELETE FROM ticketing
          WHERE status = '예약중' AND created_at < NOW() - INTERVAL 10 MINUTE;
    `;

    db.query(createEventQuery, (err, results) => {
        if (err) {
            console.error('이벤트 생성 중 오류 발생:', err);
        } else {
            console.log('이벤트가 성공적으로 생성되었습니다.');
        }
    });
}

// 데이터베이스 연결이 성공한 후 이벤트 생성
db.getConnection((err, connection) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
    } else {
        console.log('데이터베이스 연결 성공');
        createEvent();
        connection.release();
    }
});

module.exports=db;