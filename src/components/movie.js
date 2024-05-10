import { useState, useEffect } from 'react';
import '../css/Movie.css';
import axios from 'axios';

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [num, setNum] = useState(0);

  const currentMovieList = async () => {
    const currentDate = new Date();

    // 현재 날짜를 '00000000' 형태로 변환
    const newCurrentDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

    // 현재 날짜로부터 60일 전 날짜를 계산
    const sixtyDaysAgoDate = new Date(currentDate.getTime() - (60 * 24 * 60 * 60 * 1000));

    // 60일 전 날짜를 '00000000' 형태로 변환
    const newSixtyDaysAgoDate = sixtyDaysAgoDate.toISOString().slice(0, 10).replace(/-/g, '');

    await axios.get(`/movie/${newCurrentDate}/${newSixtyDaysAgoDate}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleNum = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    axios.get(`/movie`)
      .then(res => {
        setMovieList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  

  movieList.forEach(movie => {
    movie.releaseDate = movie.releaseDate.substring(0, 4) + '.' + movie.releaseDate.substring(4, 6) + '.' + movie.releaseDate.substring(6);
  });

  const movieMap = movieList.map(
    (data) =>
      <div className='movie'>
        <a href='/'>
          <img className='poster' src={data.posters} alt='영화 포스터' />
        </a>
        <div className='title'>
          {data.title}
        </div>
        <div className="releaseDate">
          {data.releaseDate} 개봉
        </div>
        {/* <div id="plot" dangerouslySetInnerHTML={{ __html: data.plot }} /> */}
      </div>
  );

  return (
    <div id="main">
      <div id="menu">
        <button onClick={currentMovieList}>현재 상영작</button>
        <button onClick={handleNum}>상영 예정작</button>
      </div>
      <div id='movieList'>
        {movieMap}
      </div>
    </div>
  );

}

export default Movie;
