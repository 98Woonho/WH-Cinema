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
        axios.get(`/movie?title=${query.get('title')}`)
            .then(res => {
                const releaseDate = new Date(res.data[0].release_date);
                res.data[0].release_date = releaseDate.toISOString().slice(0, 10);

                setStillcuts(res.data[0].stillcuts.split('|'));
                setMovie(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <main id='detailMain' className='main'>
            <div className="content-container">
                <div className='detail-container'>
                    <img src={movie.poster} alt='영화 포스터' />
                    <div className='detail'>
                        <h1>{movie.title}</h1>
                        <ul className='info1'>
                            <li>{movie.release_date} 개봉</li>
                            <li>{movie.runtime}분</li>
                            <li>{movie.rating}</li>
                        </ul>
                        <div>감독 : {movie.director}</div>
                        <div>배우 : {movie.actor}</div>
                        <div>장르 : {movie.genre} / {movie.nation}</div>
                        <a className='ticketing' href='/ticketing'>예매하기</a>
                    </div>
                </div>
                <div className='plot-container'>
                    <h2>줄거리</h2>
                    <div className='plot' dangerouslySetInnerHTML={{ __html: movie.plot }} />
                </div>
                <div className='stillcut-container'>
                    <h2>스틸컷</h2>
                    <div className='stillcuts'>
                        {stillcuts[0] === ''
                            ? <p>이미지가 존재하지 않습니다.</p>
                            : stillcuts.map(url => (
                                <div>
                                    <img src={url} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Detail;