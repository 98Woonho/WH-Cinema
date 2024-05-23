import { useState, useEffect } from 'react';
import '../css/Ticketing.css';
import axios from 'axios';


function Ticketing() {
    const [movieMap, setMovieMap] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [theaterList, setTheaterList] = useState([]);

    useEffect(() => {
        axios.get('/movie')
            .then(res => {
                setMovieList(res.data);
            })
            .catch(err => {

            })
    }, []);

    useEffect(() => {
        const newMovieMap = movieList.map(movie => 
            <li>
                <span className='rating-icon'>
                    <p className='rating'>12</p>
                </span>
                <span class='title'>{movie.title}</span>
            </li>
        );
    
        setMovieMap(newMovieMap);
    }, [movieList]);

    return (
        <div id='main'>
            <div className="ticketing-container">
                <div className="box">
                    <ul class='movie-list'>
                        {movieMap}
                    </ul>
                </div>
                <div className="box">영화관</div>
                <div className="box">날짜</div>
                <div className="box">상영관, 상영시간</div>
            </div>
        </div>
    )
}

export default Ticketing;