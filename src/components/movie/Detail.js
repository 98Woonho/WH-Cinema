// 영화 상세정보

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../css/movie/Detail.css';
import axios from 'axios';

function Detail() {
    const [query, setQuery] = useSearchParams();
    const [movie, setMovie] = useState({});
    const [stillcuts, setStillcuts] = useState([]);

    useEffect(() => {
        axios.get(`/movie/${query.get('title')}`)
            .then(res => {
                console.log(res);
                setStillcuts(res.data[0].stillcuts.split('|'));
                setMovie(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div id='main'>
            <div className='detail'>
                <img src={movie.posters} alt='영화 포스터' />
                <div>
                    <h1>{movie.title}</h1>
                    <div>
                        <ul className='info1'>
                            <li>{movie.releaseDate} 개봉</li>
                            <li>{movie.runtime}분</li>
                            <li>{movie.rating}</li>
                        </ul>
                        <ul>
                            <li>감독 : {movie.director}</li>
                            <li>배우 : {movie.actor}</li>
                            <li>장르 : {movie.genre} / {movie.nation}</li>
                        </ul>
                        <button className='ticketing-btn'>예매하기</button>
                    </div>
                </div>
            </div>
            <div id="plot" dangerouslySetInnerHTML={{ __html: movie.plot }} />
            <div>
                <h2>스틸컷</h2>
                <div className='stillcuts'>
                    {stillcuts[0] === ''
                        ? <p>이미지가 존재하지 않습니다.</p> 
                        : stillcuts.map(url => (
                            <img src={url} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Detail;