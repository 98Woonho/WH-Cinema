import { useState, useEffect } from 'react';
import '../css/Ticketing.css';
import axios from 'axios';
import userEvent from '@testing-library/user-event';


function Ticketing() {
    const [movieMap, setMovieMap] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [theaterNameMap, setTheaterNameMap] = useState(null);
    const [theaterList, setTheaterList] = useState([]);
    const [regionMap, setRegionMap] = useState(null);
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleRegion = (region) => {
        setSelectedRegion(region);

        // theaterList에서 매개변수로 전달받은 region에 해당하는 값으로 filter 후 name 값으로만 mapping
        const filteredTheaterNameList = theaterList.filter(theater => theater.region === region).map(theater => theater.name);

        // mapping 후 set
        const filteredTheaterNameMap = filteredTheaterNameList.map(filteredTheaterName =>
            <button onClick={handleName}>{filteredTheaterName}</button>
        )

        setTheaterNameMap(filteredTheaterNameMap);
    }

    const handleName = () => {

    }

    const handleTitle = (title) => {
        setSelectedMovieTitle(title);
    }

    useEffect(() => {
        axios.get('/movie')
            .then(res => {
                setMovieList(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('/theater')
            .then(res => {
                setTheaterList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        const MovieMap = movieList.map(movie =>
            <li onClick={() => handleTitle(movie.title)} className={selectedMovieTitle === movie.title ? 'selected' : ''}>
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

        // mapping 후 set
        const theaterNameMap = theaterNameList.map(theaterName =>
            <button onClick={handleName}>{theaterName}</button>
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
        const uniqueRegions = [...new Set(theaterList.map(theater => theater.region))];

        const regionMap = uniqueRegions.map(region =>
            // onClick = { () => 함수명(매개변수) } --> 함수에 매개변수를 담아서 click 이벤트를 발생시키고 싶을 때 위 형태로 작성해야함.
            <button onClick={() => handleRegion(region)} className={region === selectedRegion ? 'selected' : ''}>{region}</button>
        )

        setRegionMap(regionMap);
    }, [selectedRegion])

    return (
        <div id='main'>
            <div className="ticketing-container">
                <div className="section movie-section">
                    <ul>
                        {movieMap}
                    </ul>
                </div>
                <div className="section theater-section">
                    <div class='region-container'>
                        {regionMap}
                    </div>
                    <div class='name-container'>
                        {theaterNameMap}
                    </div>
                </div>
                <div className="section">날짜</div>
                <div className="section">상영관, 상영시간</div>
            </div>
        </div>
    )
}

export default Ticketing;