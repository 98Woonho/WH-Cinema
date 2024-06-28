// 영화 목록

import { useState, useEffect } from 'react';
import '../../css/movie/Movie.css';
import axios from 'axios';

function Movie() {
  const [movieMap, setMovieMap] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [num, setNum] = useState(1); // 현재상영작과 상영예정작을 가져오는 동작을 구분하기 위한 변수
  const [sort, setSort] = useState('');

  // 현재상영작 버튼 클릭 함수
  const handleCurrentMovieList = () => {
    setNum(1);
  }

  // 상영예정작 버튼 클릭 함수
  const handleScheduledMovieList = () => {
    setNum(0);
  };

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  }

  // 정렬 기준 and 상영 옵션에 따른 영화 목록 가져오기
  useEffect(() => {
    axios.get(`/movie?screeningFlag=${num}&sort=${sort}`)
    .then(res => {
      if (num === 1) {
        setMovieList(res.data);
      }
  
      if (num === 0) {
        const movieList = res.data;
  
        // 상영예정작 영화리스트를 날짜순으로 오름차순 정렬
        const sortedMovieList = movieList.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateA - dateB;
        });
  
        // 상영예정작 리스트에 D-day를 추가
        sortedMovieList.forEach(movie => {
          const releaseDate = movie.release_date;
  
          // 주어진 날짜 문자열을 Date 객체로 변환
          const givenDate = new Date(releaseDate);
  
          // 현재 날짜
          const currentDate = new Date();
  
          // 남은 날짜 계산
          const timeDiff = Math.abs(currentDate.getTime() - givenDate.getTime());
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
          // "D-n" 형식으로 남은 날짜 표시
          const result = "D-" + diffDays;
  
          movie.Dday = result;
        })
  
        setMovieList(sortedMovieList);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, [sort, num])

  // movieList가 set되면 화면에 보여주기 위한 map을 set
  useEffect(() => {
    // movieList의 개봉일 형태 변경
    movieList.forEach(movie => {
      const releaseDate = movie.release_date;

      const date = new Date(releaseDate);

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = date.getDate();

      // YYYY-MM-DD 형태로 변환
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

      movie.releaseDate = formattedDate;
    })

    const newMovieMap = movieList.map(
      data =>
        <div className='movie'>
          <a href={`/movie/detail?title=${data.title}`}>
            <img src={data.poster} alt='영화 포스터' />
          </a>
          <div className='title'>
            {data.title}
          </div>
          <div>
            {data.releaseDate} 개봉 {data.Dday}
          </div>
        </div>
    );
    setMovieMap(newMovieMap);
  }, [movieList])

  return (
    <main className='main' id='movieMain'>
      <div className="content-container">
        <div className="button-container">
          <div className="flex-1"></div>
          <button className={num == 1 ? 'selected' : ''} onClick={handleCurrentMovieList}>현재 상영작</button>
          <button className={num == 0 ? 'selected' : ''} onClick={handleScheduledMovieList}>상영 예정작</button>
        </div>
        <div className="sort-container">
          <div className="flex-1"></div>
          <select onChange={handleChangeSort} className="sort-select">
            <option value="평점순">평점순</option>
            <option value="개봉일순(오름차순)">개봉일순(오름차순)</option>
            <option value="개봉일순(내림차순)">개봉일순(내림차순)</option>
          </select>
        </div>
        <div className='movie-container'>
          {movieMap}
        </div>
      </div>
    </main>
  );

}

export default Movie;
