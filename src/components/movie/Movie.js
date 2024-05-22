// 영화 목록

import { useState, useEffect } from 'react';
import '../../css/movie/Movie.css';
import axios from 'axios';

function Movie() {
  const [movieMap, setMovieMap] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [num, setNum] = useState(0); // 현재상영작과 상영예정작을 가져오는 동작을 구분하기 위한 변수

  // 현재상영작 버튼 클릭 함수
  const currentMovieList = () => {
    setNum(0);
  }

  // 상영예정작 버튼 클릭 함수
  const scheduledMovieList = () => {
    setNum(1);
  };

  // /movie 경로로 접속하면 현재상영작을 먼저 보여줌.
  // 현재상영작, 상영예정작 버튼을 누를 때 마다 그에 맞는 영화 목록을 movieList에 set
  useEffect(() => {
    // axios.get(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=FPWJ81L14L7X38342790&releaseDts=20240523&ratedYn=y&releaseDte=20240723&listCount=500`)
    //   .then(res => {
    //     console.log(res.data.Data[0].Result)
    //   })

    if (num === 0) {
      const currentDate = new Date();

      // 현재 날짜에서 YYYY-MM-DD를 가져옴
      const newCurrentDate = currentDate.toISOString().slice(0, 10);

      // 현재 날짜로부터 60일 전 날짜를 계산
      const sixtyDaysAgoDate = new Date(currentDate.getTime() - (60 * 24 * 60 * 60 * 1000));

      // 60일 전 날짜에서 YYYY-MM-DD를 가져옴
      const newSixtyDaysAgoDate = sixtyDaysAgoDate.toISOString().slice(0, 10);

      axios.get(`/movie/${newCurrentDate}/${newSixtyDaysAgoDate}`)
        .then(res => {
          setMovieList(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // num이 1이면, 즉 상영 예정작을 클릭했을 때는 내일 날짜부터 2개월 후의 영화를 가져옴

      const tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);

      // 내일 날짜에서 YYYY-MM-DD를 가져옴
      const newTomorrowDate = tomorrowDate.toISOString().slice(0, 10);
      console.log(newTomorrowDate);

      // 내일 날짜로부터 60일 후 날짜를 계산
      const sixtyDaysLaterDate = new Date(tomorrowDate.getTime() + (60 * 24 * 60 * 60 * 1000));

      // 60일 후 날짜에서 YYYY-MM-DD를 가져옴
      const newSixtyDaysLaterDate = sixtyDaysLaterDate.toISOString().slice(0, 10);

      axios.get(`/movie/${newSixtyDaysLaterDate}/${newTomorrowDate}`)
        .then(res => {
          const movieList = res.data;

          // 상영예정작 영화리스트를 날짜순으로 오름차순 정렬
          const sortedMovieList = movieList.sort((a, b) => {
            const dateA = new Date(a.releaseDate);
            const dateB = new Date(b.releaseDate);
            return dateA - dateB;
          });

          // 상영예정작 리스트에 D-day를 추가
          sortedMovieList.forEach(movie => {
            const releaseDate = movie.releaseDate;

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
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [num]);

  // movieList가 set되면 화면에 보여주기 위한 map을 set
  useEffect(() => {
    
    // movieList의 개봉일 형태 변경
    movieList.forEach(movie => {
      const releaseDate = movie.releaseDate;

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
            <img src={data.posters} alt='영화 포스터' />
          </a>
          <div className='title'>
            {data.title}
          </div>
          <div>
            {data.releaseDate} 개봉  {data.Dday}
          </div>
        </div>
    );
    setMovieMap(newMovieMap);
  }, [movieList])

  return (
    <div>
      <div id="menu">
        <button onClick={currentMovieList}>현재 상영작</button>
        <button onClick={scheduledMovieList}>상영 예정작</button>
      </div>
      <div id='movieList'>
        {movieMap}
      </div>
    </div>
  );

}

export default Movie;
