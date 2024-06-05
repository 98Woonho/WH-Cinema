import { useState, useEffect } from 'react';
import '../css/Ticketing.css';
import axios from 'axios';
import seatsData from '../data/seatsData.json';
import { useNavigate } from 'react-router-dom';


// react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let adultCount = 0; // 좌석 선택 시 요금에 표시할 일반 count
let youthCount = 0; // 좌석 선택 시 요금에 표시할 청소년 count
let adultCost; // 일반 요금
let youthCost; // 청소년 요금
let totalCost; // 총 요금
let isFullSelectedSeat = false; // 선택 좌석이 인원을 초과하는가에 대한 여부
let isDeletedSelectedSeat = false; // 선택한 좌석을 취소했는가에 대한 여부

function Ticketing() {
    const [movieMap, setMovieMap] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [theaterNameList, setTheaterNameList] = useState([]);
    const [theaterNameMap, setTheaterNameMap] = useState(null);
    const [theaterList, setTheaterList] = useState([]);
    const [regionMap, setRegionMap] = useState(null);
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedTheaterName, setSelectedTheaterName] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateList, setDateList] = useState([]);
    const [dateMap, setDateMap] = useState(null);
    const [screenInfoList, setScreenInfoList] = useState([]);
    const [screenInfoMap, setScreenInfoMap] = useState(null);
    const [reservedSeatCountList, setReservedSeatCountList] = useState([]);
    const [reservedSeatList, setReservedSeatList] = useState([]);
    const [selectedSeatList, setSelectedSeatList] = useState([]);
    const [selectedSeatMap, setSelectedSeatMap] = useState(null);
    const [moviePoster, setMoviePoster] = useState(null);
    const [selectedScreenTime, setSelectedScreenTime] = useState(null);
    const [selectedScreenHallName, setSelectedScreenHallName] = useState(null);
    const [seatMap, setSeatMap] = useState(null);
    const [step, setStep] = useState(1);
    const [adult, setAdult] = useState(0);
    const [youth, setYouth] = useState(0);
    const [adultMap, setAdultMap] = useState(null);
    const [youthMap, setYouthMap] = useState(null);
    const [adultCostDiv, setAdultCostDiv] = useState(null);
    const [youthCostDiv, setYouthCostDiv] = useState(null);
    const [totalCostDiv, setTotalCostDiv] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ticketingId, setTicketingId] = useState(null);

    const personnelList = [0, 1, 2, 3, 4];
    const columnList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const navigate = useNavigate();

    // 결제
    const payment = (e) => {
        if (!e.target.classList.contains('on')) {
            alert('결제 수단을 선택해 주세요.');
            return;
        }

        const { IMP } = window;
        let pg;
        let pay_method;

        axios.get(`/user/${userId}`)
            .then(res => {
                const phone = res.data[0].phone;
                if (selectedPaymentMethod === 'card') {
                    pg = "html5_inicis";
                    pay_method = "card";
                }

                if (selectedPaymentMethod === 'kakaoPay') {
                    pg = "kakaopay";
                    pay_method = "card";
                }

                if (selectedPaymentMethod === 'tossPay') {
                    pg = "tosspay";
                    pay_method = "card";
                }

                if (selectedPaymentMethod === 'payco') {
                    pg = "payco"
                    pay_method = "card";
                }

                if (selectedPaymentMethod === 'phone') {
                    pg = "danal";
                    pay_method = "phone";
                }

                IMP.init('imp82217082');

                IMP.request_pay({
                    pg: pg,
                    pay_method: pay_method,
                    merchant_uid: 'merchant_' + new Date().getTime(),
                    name: `${selectedTheaterName}_${selectedMovieTitle}`, // 제품 이름
                    amount: 100, // 총 가격
                    buyer_tel: phone, // 구매자 휴대폰 번호
                },
                    function (resp) {
                        console.log(resp);
                        if (resp.success) {
                            const paymentObj = { impUid: resp.imp_uid, merchantUid: resp.merchant_uid, payMethod: resp.pay_method, name: `${selectedTheaterName}_${selectedMovieTitle}`, paidAmount: resp.paid_amount, status: resp.status, ticketingId: ticketingId };
                            axios.post('/payment', paymentObj)
                                .then(res => {
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        } else {
                            if (resp.error_code === 'F1001') {
                                alert('결제가 취소 되었습니다.');
                            } else {
                                // 그 외의 결제 실패
                                alert(`결제에 실패하였습니다. 에러 메시지: ${resp.error_msg}`);
                            }
                        }

                    }
                )
            })
            .catch(err => {
                console.log(err);
            })
    }



    // 결제 수단 선택 버튼
    const handlePaymentMethodBtn = (e) => {
        // 결제 버튼에 className='on' 추가
        const paymentBtn = document.querySelector('.payment-btn');
        paymentBtn.classList.add('on');

        // 선택한 결제 수단 set
        setSelectedPaymentMethod(e.target.id);

        // 클릭한 결제 수단 버튼에 className='selected' 추가
        // 나머지 결제 수단 버튼에 className='selected' 제거
        const paymentMethodBtns = document.querySelectorAll('.payment-method-box button');
        paymentMethodBtns.forEach(paymentMethodBtn => {
            e.target.classList.add('selected');
            if (e.target !== paymentMethodBtn) {
                paymentMethodBtn.classList.remove('selected');
            }
        })
    }

    // 성인 
    const handleAdult = (count) => {
        if (youth + count < selectedSeatList.length) {
            alert('선택한 좌석이 예매 인원보다 많습니다.');
            return;
        }
        setAdult(count);
    }

    // 청소년
    const handleYouth = (count) => {
        if (count + adult < selectedSeatList.length) {
            alert('선택한 좌석이 예매 인원보다 많습니다.');
            return;
        }
        setYouth(count);
    }

    // 지역 선택 함수
    const handleRegion = (region) => {
        setSelectedRegion(region);

        // theaterList에서 매개변수로 전달받은 region에 해당하는 값으로 filter 후 name 값으로만 mapping
        const filteredTheaterNameList = theaterList.filter(theater => theater.region === region).map(theater => theater.name);

        setTheaterNameList(filteredTheaterNameList);

        // mapping 후 set
        const filteredTheaterNameMap = filteredTheaterNameList.map(name =>
            <button onClick={() => handleTheaterName(name)}>{name}</button>
        )

        setTheaterNameMap(filteredTheaterNameMap);
    }

    // 상영시간, 상영관 선택 함수
    const handleScreenTimeAndHall = (time, hallName) => {
        setSelectedScreenTime(time);
        setSelectedScreenHallName(hallName);
    }

    // 날짜 선택 함수
    const handleDate = (date) => {
        setSelectedDate(date.toISOString().slice(0, 10));
    }

    // 극장 선택 함수
    const handleTheaterName = (name) => {
        setSelectedTheaterName(name);
    }

    // 영화 선택 함수
    const handleMovie = (title) => {
        // 선택한 영화 포스터 가져오기
        axios.get(`/movie/${title}`)
            .then(res => {
                setMoviePoster(res.data[0].poster);
            })
            .catch(err => {
                console.log(err);
            })

        setSelectedMovieTitle(title);
    }

    // 다음 스텝 버튼 클릭 함수
    const handleNextStepBtn = () => {
        if (step === 1) {
            if (!selectedMovieTitle) {
                alert('영화를 선택해 주세요.');
                return;
            }

            if (!selectedTheaterName) {
                alert('극장을 선택해 주세요.');
                return;
            }

            if (!selectedDate) {
                alert('날짜를 선택해 주세요.');
                return;
            }

            if (!selectedScreenTime) {
                alert('상영시간을 선택해 주세요.');
                return;
            }

            axios.get(`/ticketing/${selectedMovieTitle}/${selectedTheaterName}/${selectedScreenHallName}/${selectedScreenTime}`)
                .then(res => {
                    const reservedSeatList = res.data.map(data =>
                        data.seat.split(', ')
                    ).flat();
                    setReservedSeatList(reservedSeatList);
                    setStep(2);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (step === 2) {
            if (adult === 0 && youth === 0) {
                alert('관람 인원을 선택해 주세요.');
                return;
            }

            if (selectedSeatList.length !== adult + youth) {
                alert('관람 인원과 좌석 수가 동일하지 않습니다.');
                return;
            }

            axios.get('/user/accessTokenPayload', { withCredentials: true })
                .then(res => {
                    setUserId(res.data.userId);
                    setStep(3);
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
        }
    }

    const handlePrevStepBtn = () => {
        if (step === 2) {
            setStep(1);
        }
    }

    // 좌석 버튼 클릭 함수
    const selectSeat = (seat) => {
        // 이미 선택된 좌석을 눌렀을 때 -> selected 제거
        if (seat.classList.contains('selected')) {
            // selectedSeatList에서 제거
            setSelectedSeatList(prevSelectedSeatList => prevSelectedSeatList.filter(num => num !== seat.dataset.num));
            isDeletedSelectedSeat = true;
        } else {
            // selectedSeatList에 추가
            // ...(요소명) : 요소명의 이전 값을 뜻함.
            setSelectedSeatList(prevSelectedSeatList => [...prevSelectedSeatList, seat.dataset.num]);
            isDeletedSelectedSeat = false;
        }
    }

    useEffect(() => {
        // 2024-05-28 :: 현재 상영중 영화 리스트 가져오기 (구현 예정)
        axios.get('/movie')
            .then(res => {
                setMovieList(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        // 극장 리스트 가져오기
        axios.get('/theater')
            .then(res => {
                setTheaterList(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        // 오늘 기준 한달 뒤 날짜 리스트 생성

        // 오늘 날짜 
        const today = new Date();
        // 오늘 기준 30일 뒤 날짜
        const dateInMonth = new Date(today.getTime() + (30 * 24 * 3600 * 1000));

        const dateList = [];

        while (today <= dateInMonth) {
            dateList.push(new Date(today));
            today.setDate(today.getDate() + 1);
        }
        setDateList(dateList);
    }, []);

    // 영화 목록 Map set
    useEffect(() => {
        const MovieMap = movieList.map(movie =>
            <li onClick={() => handleMovie(movie.title)} className={selectedMovieTitle === movie.title ? 'selected' : ''}>
                <span className={movie.rating === '전체관람가' ? 'rating-icon-all' : movie.rating === '12세이상관람가' ? 'rating-icon-12' : movie.rating === '15세이상관람가' ? 'rating-icon-15' : 'rating-icon-19'}>{movie.rating === '전체관람가' ? 'All' : movie.rating === '12세이상관람가' ? '12' : movie.rating === '15세이상관람가' ? '15' : '19'}
                </span>
                <span className='title'>{movie.title}</span>
            </li>
        );

        setMovieMap(MovieMap);
    }, [movieList, selectedMovieTitle]);

    useEffect(() => {
        // 첫 렌더링 시, 초기 영화관 리스트 출력을 위한 코드

        // result = 영화관 리스트

        // 영화관 리스트에 region 데이터를 중복 제거하여 얻기 위해 Set 객체로 생성
        const uniqueRegions = [...new Set(theaterList.map(theater => theater.region))];

        // 중복 제거한 지역 리스트의 0번 째 지역의 영화관 이름 리스트 생성
        const theaterNameList = theaterList.filter(theater => theater.region === uniqueRegions[0]).map(theater => theater.name);

        setTheaterNameList(theaterNameList)

        // mapping 후 set
        const theaterNameMap = theaterNameList.map(name =>
            <button onClick={() => handleTheaterName(name)}>{name}</button>
        )

        setTheaterNameMap(theaterNameMap);

        setSelectedRegion(uniqueRegions[0]);

        // 맵 생성 후 set
        const regionMap = uniqueRegions.map(region =>
            // onClick = { () => 함수명(매개변수) } --> 함수에 매개변수를 담아서 click 이벤트를 발생시키고 싶을 때 위 형태로 작성해야함.
            <button onClick={() => handleRegion(region)} className={region === selectedRegion ? 'selected' : ''}>{region}</button>
        )
        setRegionMap(regionMap);
    }, [theaterList])


    useEffect(() => {
        if (step === 1) {
            const uniqueRegions = [...new Set(theaterList.map(theater => theater.region))];

            const theaterNameMap = theaterNameList.map(name =>
                <button className={selectedTheaterName === name ? 'selected' : ''} onClick={() => handleTheaterName(name)}>{name}</button>
            )

            setTheaterNameMap(theaterNameMap);

            // 맵 생성 후 set
            const regionMap = uniqueRegions.map(region =>
                // onClick = { () => 함수명(매개변수) } --> 함수에 매개변수를 담아서 click 이벤트를 발생시키고 싶을 때 위 형태로 작성해야함.
                <button onClick={() => handleRegion(region)} className={region === selectedRegion ? 'selected' : ''}>{region}</button>
            )
            setRegionMap(regionMap);
        }

        if (step === 2) {
            axios.get(`/theater/screenHall/${selectedScreenHallName}/${selectedTheaterName}`)
                .then(res => {
                    adultCost = res.data[0].adult_cost;
                    youthCost = res.data[0].youth_cost;
                }).catch(err => {
                    console.log(err);
                });

            if (selectedSeatList.length !== 0 || adult !== 0 || youth !== 0) {
                setSelectedSeatList([]);
                setYouth(0);
                setAdult(0);
            }

            const adultMap = personnelList.map(count =>
                <button className={adult === count ? 'selected people-count' : 'people-count'} onClick={() => handleAdult(count)}>{count}</button>
            )

            setAdultMap(adultMap);

            const youthMap = personnelList.map(count =>
                <button className={youth === count ? 'selected people-count' : 'people-count'} onClick={() => handleYouth(count)}>{count}</button>
            )

            setYouthMap(youthMap);

            let idx = 0;
            const theaterData = seatsData[selectedTheaterName];
            if (theaterData) {
                const seatMap = theaterData[selectedScreenHallName].map(row => {
                    return (
                        <div className='seat-row'>
                            <div className='column'>{columnList[idx++]}</div>
                            {row.map(seat =>
                                // e.currentTarget : 자기 자신 요소
                                <button data-num={columnList[idx - 1] + seat} className={`${seat === '' ? 'seat empty' : 'seat'} ${reservedSeatList.indexOf(columnList[idx - 1] + seat) === -1 ? '' : 'reserved'}`} onClick={(e) => selectSeat(e.currentTarget)}>
                                    <p className='seat-number'>{seat}</p>
                                </button>
                            )}
                        </div>
                    )
                })
                setSeatMap(seatMap);
            }
        }

        if (step === 3) {
            const date = new Date(new Date());

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

            const ticketingObj = { theaterName: selectedTheaterName, screenHallName: selectedScreenHallName, movieTitle: selectedMovieTitle, screenTime: selectedScreenTime, seat: selectedSeatList.join(', '), status: '예약중', createdAt: formattedDate, userId: userId };

            axios.post('/ticketing', ticketingObj)
                .then(res => {
                    setTicketingId(res.ticketingId);
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }, [step])


    // 지역 선택 시 선택 요소에 selected class 추가 및 극장 버튼의 selected class 모두 제거
    useEffect(() => {
        const regionBtns = document.querySelectorAll('.region-container button');

        regionBtns.forEach(btn => {
            if (selectedRegion === btn.innerText) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        })

        // 지역 선택 시 이전에 선택한 극장 버튼의 selected가 남아있어서 극장 버튼의 selected 모두 제거
        const theaterNameBtns = document.querySelectorAll('.theater-name-container button');

        theaterNameBtns.forEach(btn => {
            btn.classList.remove('selected');
            setSelectedTheaterName(null);
        })
    }, [selectedRegion])

    // 극장 선택 시 선택 요소에 selected class 추가
    useEffect(() => {
        const theaterNameBtns = document.querySelectorAll('.theater-name-container button');

        theaterNameBtns.forEach(btn => {
            if (selectedTheaterName === btn.innerText) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        })
    }, [selectedTheaterName])

    useEffect(() => {
        const today = new Date();

        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        const dateMap = dateList.map(date => {
            date = new Date(date.getTime());
            return (
                <button className={selectedDate === date.toISOString().slice(0, 10) ? 'selected day-btn' : 'day-btn'} onClick={() => handleDate(date)}>
                    <p>{date.getDate() === 1 ? date.getMonth() + 1 + '월' : ''}</p>
                    <p className={date.getDay() === 6 ? 'blue' : date.getDay() === 0 ? 'red' : ''}>{date.getDate()}</p>
                    <p>{today.toDateString() === date.toDateString() ? '오늘' : daysOfWeek[date.getDay()]}</p>
                </button>
            )
        })
        setDateMap(dateMap);
    }, [dateList, selectedDate]);

    // 영화, 극장, 날짜 모두 선택 했을 때, 상영시간 및 좌석 정보 set
    useEffect(() => {
        if (selectedMovieTitle !== null && selectedDate !== null && selectedTheaterName !== null) {
            axios.get(`/theater/screenInfo/${selectedMovieTitle}/${selectedDate}/${selectedTheaterName}`)
                .then(res => {
                    setScreenInfoList(res.data);
                })
                .catch(err => {
                })
        }
    }, [selectedMovieTitle, selectedDate, selectedTheaterName])

    // 상영관별 예매 된 좌석수를 가져오는 코드
    useEffect(() => {
        const createReservedSeatCountList = async () => {
            const reservedSeatCountList = [];

            for (const screenInfo of screenInfoList) {
                for (const time of screenInfo.time.split(',')) {
                    try {
                        const res = await axios.get(`/ticketing/${screenInfo.title}/${screenInfo.theater_name}/${screenInfo.screen_hall_name}/${time}`);
                        let reservedSeatCount = 0;

                        if (res.data.length === 0) {
                            reservedSeatCountList.push(0);
                        } else {
                            res.data.forEach(data => {
                                reservedSeatCount += data.seat.split(',').length;
                            });
                            reservedSeatCountList.push(reservedSeatCount);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
            }

            setReservedSeatCountList(reservedSeatCountList);
        };

        createReservedSeatCountList();
    }, [screenInfoList])

    // 예매 된 좌석수를 뺀 후에 상영정보 set
    useEffect(() => {
        let idx = -1;
        if (screenInfoList.length === 0) {
            setScreenInfoMap(<div className='screen-info-warning'>
                <p>영화, 극장, 날짜를 선택해 주세요</p>
            </div>);
        } else {
            const screenInfoMap = screenInfoList.map(screenInfo =>
                <div>
                    <p className='screen-hall-name'>{screenInfo.screen_hall_name}</p>
                    <div class='screen-time-container'>
                        {screenInfo.time.split(',').map(time =>
                            // className 조건 두 개 이상 하는 법 -> {` `}
                            <button onClick={() => handleScreenTimeAndHall(time, screenInfo.screen_hall_name)} className={`${screenInfo.seat_count - reservedSeatCountList[++idx] === 0 ? 'full-reservation screen-time-btn' : 'screen-time-btn'} ${time === selectedScreenTime ? 'selected' : ''}`}>
                                <p>{time}</p>
                                <p className={screenInfo.seat_count - reservedSeatCountList[idx] === 0 ? 'red' : ''}>{screenInfo.seat_count - reservedSeatCountList[idx] === 0 ? '매진' : screenInfo.seat_count - reservedSeatCountList[idx] + ' / ' + screenInfo.seat_count}</p>
                            </button>
                        )}
                    </div>
                </div>

            )
            setScreenInfoMap(screenInfoMap);
        }
    }, [reservedSeatCountList, selectedScreenTime])

    useEffect(() => {
        // 일반
        const adultMap = personnelList.map(count =>
            <button className={adult === count ? 'selected people-count' : 'people-count'} onClick={() => handleAdult(count)}>{count}</button>
        )

        setAdultMap(adultMap);

        // 청소년
        const youthMap = personnelList.map(count =>
            <button className={youth === count ? 'selected people-count' : 'people-count'} onClick={() => handleYouth(count)}>{count}</button>
        )

        setYouthMap(youthMap);


        isFullSelectedSeat = false;

        // 일반, 청소년 각각 최소 1명 이상이고, 좌석을 선택한 상황
        if (youth !== 0 && selectedSeatList.length !== 0) {
            // 일반 인원을 늘렸을 때
            // ex) 일반2, 청소년2 인 상황에서 일반을 3명으로 선택하면, 요금 정보가 
            // 일반2, 청소년2 -> 일반3, 청소년1 으로 변경됨.
            if (adult > adultCount) {
                adultCount = adult;

                const adultCostDiv = <div>
                    <span>일반</span>
                    <span>{adultCost} X {adultCount}</span>
                </div>;

                setAdultCostDiv(adultCostDiv);



                youthCount = selectedSeatList.length - adult;

                const youthCostDiv = youthCount === 0 ? null : <div>
                    <span>청소년</span>
                    <span>{youthCost} X {youthCount}</span>
                </div>;

                setYouthCostDiv(youthCostDiv);
            }

            // 일반 인원을 줄였을 때
            if (adult < adultCount) {
                adultCount = adult;

                const adultCostDiv = adultCount === 0 ? null : <div>
                    <span>일반</span>
                    <span>{adultCost} X {adultCount}</span>
                </div>;

                setAdultCostDiv(adultCostDiv);


                youthCount = selectedSeatList.length - adult;

                const youthCostDiv = youthCount === 0 ? null : <div>
                    <span>청소년</span>
                    <span>{youthCost} X {youthCount}</span>
                </div>;

                setYouthCostDiv(youthCostDiv);
            }
        }

        // 인원 선택 안 했을 시, 좌석 선택 못하도록 필터 적용
        if (step === 2) {
            const filter = document.querySelector('.filter');

            filter.style.zIndex = adult === 0 && youth === 0 ? '1' : 'unset';
        }

        totalCost = adultCost * adultCount + youthCost * youthCount;

        if (totalCost > 0) {
            const totalCostDiv = <div>
                <span>총금액</span>
                <span>{totalCost}</span>
            </div>

            setTotalCostDiv(totalCostDiv);
        }
    }, [adult, youth])

    useEffect(() => {
        // 좌석 선택 시, 총 인원 수 보다 많을 때
        if (adult + youth < selectedSeatList.length) {
            alert('이미 모든 좌석을 선택 하였습니다.');

            setSelectedSeatList(selectedSeatList.slice(0, -1)); // 배열의 첫 번째 요소부터 마지막을 제외한 요소까지 저장

            isFullSelectedSeat = true;

            return;
        }

        // 좌석을 선택 했을 때, 일반 요금 우선 카운트 후, 청소년 요금 카운트
        if (!isFullSelectedSeat && !isDeletedSelectedSeat && selectedSeatList.length !== 0) {
            if (adult > adultCount) {
                const adultCostDiv = <div>
                    <span>일반</span>
                    <span>{adultCost} X {++adultCount}</span>
                </div>;
                setAdultCostDiv(adultCostDiv);
            } else {
                const youthCostDiv = <div>
                    <span>청소년</span>
                    <span>{youthCost} X {++youthCount}</span>
                </div>;
                setYouthCostDiv(youthCostDiv);
            }
        }

        // 좌석을 취소 했을 때
        if (isDeletedSelectedSeat) {
            // 선택 좌석보다 일반 인원이 더 많으면
            if (adult > selectedSeatList.length) {
                adultCount = selectedSeatList.length

                const adultCostDiv = adultCount === 0 ? null : <div>
                    <span>일반</span>
                    <span>{adultCost} X {adultCount}</span>
                </div>;

                setAdultCostDiv(adultCostDiv);

                isDeletedSelectedSeat = false;
                isFullSelectedSeat = false;

                // 그 외
            } else {
                youthCount = selectedSeatList.length - adult;

                const youthCostDiv = youthCount === 0 ? null : <div>
                    <span>청소년</span>
                    <span>{youthCost} X {youthCount}</span>
                </div>;

                setYouthCostDiv(youthCostDiv);

                isDeletedSelectedSeat = false;
                isFullSelectedSeat = false;
            }
        }

        // 좌석 클릭 시 좌석에 selected class 추가 및 제거
        const seats = document.querySelectorAll('.seat');
        seats.forEach(seat => {
            if (selectedSeatList.includes(seat.dataset.num)) {
                seat.classList.add('selected');
            } else {
                seat.classList.remove('selected');
            }
        })

        // 일반
        const adultMap = personnelList.map(count =>
            <button className={adult === count ? 'selected people-count' : 'people-count'} onClick={() => handleAdult(count)}>{count}</button>
        )

        setAdultMap(adultMap);

        // 청소년
        const youthMap = personnelList.map(count =>
            <button className={youth === count ? 'selected people-count' : 'people-count'} onClick={() => handleYouth(count)}>{count}</button>
        )

        setYouthMap(youthMap);

        const selectedSeatMap = selectedSeatList.map((selectedSeat, idx) =>
            <span>{idx === selectedSeatList.length - 1 ? selectedSeat : `${selectedSeat}, `}</span>
        )

        setSelectedSeatMap(selectedSeatMap);


        const totalCostDiv = selectedSeatList <= 0 ? null : <div>
            <span>총금액</span>
            <span>{adultCost * adultCount + youthCost * youthCount}</span>
        </div>

        setTotalCostDiv(totalCostDiv);

    }, [selectedSeatList])

    // slick setting
    const settings = {
        slidesToShow: 8,
        slidesToScroll: 8,
        infinite: false
    }

    return (
        <div id='ticketingMain' className='main'>
            {step === 1 ? (
                <div className='ticketing-option-container'>
                    <div className='section movie-section'>
                        <ul>
                            {movieMap}
                        </ul>
                    </div>
                    <div className='section theater-section'>
                        <div class='region-container'>
                            {regionMap}
                        </div>
                        <div class='theater-name-container'>
                            {theaterNameMap}
                        </div>
                    </div>
                    <div className='section screen-info-section'>
                        <Slider {...settings}>
                            {dateMap}
                        </Slider>
                        <div className='screen-info-container'>
                            {screenInfoMap}
                        </div>
                    </div>
                </div>
            ) : step === 2 ? (<div className='select-seat-container'>
                <div className='people'>
                    <ul>
                        <li>
                            <span className='people-type'>일반</span>
                            <span>
                                {adultMap}
                            </span>
                        </li>
                        <li>
                            <span className='people-type'>청소년</span>
                            <span>
                                {youthMap}
                            </span>
                        </li>
                    </ul>
                </div>

                <div className='seat-info'>
                    <div className='filter'></div>
                    <div className='seat-left'>
                        <div className='screen'>
                            스크린
                        </div>
                        <div className='seat-box'>
                            {seatMap}
                        </div>
                    </div>
                    <div className='seat-right'>
                        <div>
                            <span className='select-icon'></span>
                            <span>선택</span>
                        </div>
                        <div>
                            <span className='reserved-seat-icon'></span>
                            <span>예매 완료</span>
                        </div>
                    </div>
                </div>
            </div>
            ) : (<div className='payment-container'>
                <div className='payment-left'>
                    <div className='payment-method-box'>
                        <button id='card' onClick={handlePaymentMethodBtn}>신용/체크 카드</button>
                        <button id='kakaoPay' onClick={handlePaymentMethodBtn}>카카오페이</button>
                        <button id='tossPay' onClick={handlePaymentMethodBtn}>토스페이</button>
                        <button id='payco' onClick={handlePaymentMethodBtn}>페이코</button>
                        <button id='phone' onClick={handlePaymentMethodBtn}>휴대폰 결제</button>
                    </div>
                </div>
                <div className='payment-right'>

                </div>
            </div>

            )
            }
            <div className='ticketing-info-container'>
                {step === 2 ?
                    <button onClick={handlePrevStepBtn}>영화 선택</button>
                    : ''
                }

                <div className='movie'>
                    {moviePoster === null ? <p>영화선택</p> : <img className='poster' src={moviePoster} />}
                </div>
                <div className='theater'>
                    <div className='info name'>
                        <span>극장</span>
                        <span>{selectedTheaterName}</span>
                    </div>
                    <div className='info date'>
                        <span>일시</span>
                        <span>{selectedDate} {selectedScreenTime}</span>
                    </div>
                    <div className='info screen-hall'>
                        <span>상영관</span>
                        <span>{selectedScreenHallName}</span>
                    </div>
                    <div className='info'>
                        <span>인원</span>
                        <span>{`일반 ${adult}명, 청소년 ${youth}명`}</span>
                    </div>
                </div>
                <div>
                    <span>좌석</span>
                    {selectedSeatMap}
                </div>
                <div className='payment'>
                    결제
                    {adultCostDiv}
                    {youthCostDiv}
                    {totalCostDiv}
                </div>
                {step === 1 ? (<button className='next-step-btn' onClick={handleNextStepBtn}>
                    <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtElEQVR4nO3YPQrCQBRF4VPpfiytLSyMC1BSGLNVK7GwcQFWgrV/hUYCU4hoIYGY+7gfvAUcZpiZBMzMzMzMOmgIbNKMELYDqjQ3IEPU/iVEOmYG3D/ETBC0+BIzRZBj1FYmQ5BjfpEDx7elb3MuwJiGesD5jxFVmmvTe6YPnCKE1ObAQX1rtamI8HQpItwlS0d0RBnhBVxGiMiBh/rpFOpTdxshojYAVsBa/XeQmZmZmaHlCeC06ncEGe4qAAAAAElFTkSuQmCC' />
                    <p>좌석선택</p>
                </button>
                ) : step === 2 ? (<button className='next-step-btn' onClick={handleNextStepBtn}>
                    <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtElEQVR4nO3YPQrCQBRF4VPpfiytLSyMC1BSGLNVK7GwcQFWgrV/hUYCU4hoIYGY+7gfvAUcZpiZBMzMzMzMOmgIbNKMELYDqjQ3IEPU/iVEOmYG3D/ETBC0+BIzRZBj1FYmQ5BjfpEDx7elb3MuwJiGesD5jxFVmmvTe6YPnCKE1ObAQX1rtamI8HQpItwlS0d0RBnhBVxGiMiBh/rpFOpTdxshojYAVsBa/XeQmZmZmaHlCeC06ncEGe4qAAAAAElFTkSuQmCC' />
                    <p>결제선택</p>
                </button>
                ) : (<button className='payment-btn' onClick={payment}>결제하기</button>
                )}

            </div>
        </div>
    )
}

export default Ticketing;