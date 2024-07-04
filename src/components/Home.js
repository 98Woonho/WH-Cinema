// 홈페이지

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../css/Home.css';

function Home() {
  const [topRateScreeningMovieList, setTopRateScreeningMovieList] = useState([]);
  const [topRateScreeningMovieMap, setTopRateScreeningMovieMap] = useState(null);
  const [topRateScheduledMovieList, setTopRateScheduledMovieList] = useState([]);
  const [topRateScheduledMovieMap, setTopRateScheduledMovieMap] = useState(null);

  useEffect(() => {
    const playBtns = document.querySelectorAll('.play-btn');
    const trailerContainers = document.querySelectorAll('.trailer-container');
    const dialog = document.getElementById('dialog');
    const closeDialogBtns = document.querySelectorAll('.close-dialog-btn');

    playBtns.forEach((playBtn, index) => {
      playBtn.addEventListener('click', function () {
        trailerContainers[index - 1].classList.add('visible');
        dialog.classList.add('visible');
      })
    })

    closeDialogBtns.forEach((closeDialogBtn, index) => {
      closeDialogBtn.addEventListener('click', function () {
        trailerContainers[index].classList.remove('visible');
        dialog.classList.remove('visible');
      })
    })

    axios.get('/movie/topRate?screeningFlag=1')
      .then(res => {
        setTopRateScreeningMovieList(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('/movie/topRate?screeningFlag=0')
      .then(res => {
        setTopRateScheduledMovieList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    const topRateScreeningMovieMap = topRateScreeningMovieList.map(
      data =>
        <li>
          <a href={`/movie/detail?title=${data.title}`}>
            <img src={data.poster} alt=""/>
          </a>
          <p className="title">{data.title}</p>
        </li>
    );

    setTopRateScreeningMovieMap(topRateScreeningMovieMap);
  }, [topRateScreeningMovieList])

  useEffect(() => {
    const topRateScheduledMovieMap = topRateScheduledMovieList.map(
      data =>
        <li>
          <a href={`/movie/detail?title=${data.title}`}>
            <img src={data.poster} />
          </a>
          <p className="title">{data.title}</p>
        </li>
    );

    setTopRateScheduledMovieMap(topRateScheduledMovieMap);
  }, [topRateScheduledMovieList])

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    draggable: false,
  }

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className="trailer-container">
            <button className="close-dialog-btn">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJUlEQVR4nO3YT0sCQRyH8YeuUu0KG/RHUG8efAceetFBJ6noEKUI6iG1wHolxcIYg6wi67Qzs3w/IHga92F09zeCiIiIiMg/6QEPwKXDNRvAHXBLhYbADzAHLhysdwo8W2ueUJEMmJoPfj9yZ/KdeDRrfQNdKpYCY3MBC+DKQUQHT46JsSO+fEYUxSwPjMkjnkKKsGNGVsw1u50BLyFGFMWsdsQEH7GR7Ik534poE7hkK+YmxoiNJjAxF/4BvJr3n0CLyCTAmwnIX+uYdqJ2Ic06fLWSgjtXdD/2dM/tN5pnSHrA0z3Y0aTMvBVsTFpiAg5mfHc9xnuNyaxT4qLkKbFhzv7eTocZMHN41PUWM6zLnw99E+Miwo65BwYO1xQRERER4c8v6Th7MMbV15kAAAAASUVORK5CYII=" alt=""/>
            </button>
            <iframe className="trailer" width="950px" height="550px" src="https://www.youtube.com/embed/4ycxumdqUnY"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div className="trailer-container">
            <button className="close-dialog-btn">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJUlEQVR4nO3YT0sCQRyH8YeuUu0KG/RHUG8efAceetFBJ6noEKUI6iG1wHolxcIYg6wi67Qzs3w/IHga92F09zeCiIiIiMg/6QEPwKXDNRvAHXBLhYbADzAHLhysdwo8W2ueUJEMmJoPfj9yZ/KdeDRrfQNdKpYCY3MBC+DKQUQHT46JsSO+fEYUxSwPjMkjnkKKsGNGVsw1u50BLyFGFMWsdsQEH7GR7Ik534poE7hkK+YmxoiNJjAxF/4BvJr3n0CLyCTAmwnIX+uYdqJ2Ic06fLWSgjtXdD/2dM/tN5pnSHrA0z3Y0aTMvBVsTFpiAg5mfHc9xnuNyaxT4qLkKbFhzv7eTocZMHN41PUWM6zLnw99E+Miwo65BwYO1xQRERER4c8v6Th7MMbV15kAAAAASUVORK5CYII=" />
            </button>
            <iframe className="trailer" width="950px" height="550px" src="https://www.youtube.com/embed/oGbkEBrqUAs"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </>,
        document.getElementById('dialog')
      )}
      <main id="homeMain">
        <div className="main-img-container">
          <div className="slider-container">
            <Slider {...settings}>
              <div className="slider-img">
                <button className="play-btn">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACmUlEQVR4nO2bv49NQRTHDxFEEIUfEaJDLKFQSfyqCCr/wCarUBLUEgmFdgtaodRtS+KFiEqzcb278/3OuInNRrF+JCJYwpUTb3gRsTtX3u7Onfkk072bl/vJzJkzZ84VyWQymUwm0wQAa51ze40xu4qiWC6pAGADgNsAPpGsdQB4C+BaWZZrpM0A2Epy0r/4X8aktfa0tBWS9//x8r8GgDHn3DZpEyR3z+Xl+8YHkpc6nc4yaQMkhwMF+NkwTvKAxA6AC00E9CR8I3mjqqp1EiskLzYV0Cfilc4kSVUAf4t4UJblTklVAH9K+EjyCoAVErsAAM80RwBwnuT7QBnPjTGHJPIZcNf/rtvtbgZwJ3A2fNdnNMuU2AV4jDGnSFaBs+GNtfZsXddLJHYBytTU1Cpd5yRnAkU8BDAksQvw6KkRwJNACV9IXq+qaqXELkDRad3LJl8HirAAjknsAjzOuU2hQdL/h7V2o8QuwEPyKMkycLd4p1ttXddLJXYBiq7vXpD8HCjisbV2j8QuwGOt3T7XWkPf+EpytCiK1RK7AB8kAYw0CJIvnHMHJXYBnomJifUkb2l2GCBhxlp7UtogwAPgSGCQnB5oUZbzLEDRcjuAy/0V6FmC4xlpkwCP3j30js+zSRiVQcEsgDEsgRFJOQgWg8wJuPi3wRPSkkRoOjARqqJPhGyqqXDV/DD01Fq7X+YT5uMwF7wgos9KiiUxksdloWEuinI+y+KPoi+LmwYXI9prFP3FSDfFqzEA45rCGmPONbwcPSyLHebrceYGCYYnL+1pkcH/N0ndjL1Jajj1NrmhpBslFZL3km2VVYwxWwC8TLZZWtGE5892+d4J72rr2+X70VKUMWafc25HUh9MZDKZTCYjreAH6Fc/zScrkLcAAAAASUVORK5CYII=" />
                </button>
                <img src="main-img1.webp" alt="" />
              </div>
              <div className="slider-img">
                <button className="play-btn">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACmUlEQVR4nO2bv49NQRTHDxFEEIUfEaJDLKFQSfyqCCr/wCarUBLUEgmFdgtaodRtS+KFiEqzcb278/3OuInNRrF+JCJYwpUTb3gRsTtX3u7Onfkk072bl/vJzJkzZ84VyWQymUwm0wQAa51ze40xu4qiWC6pAGADgNsAPpGsdQB4C+BaWZZrpM0A2Epy0r/4X8aktfa0tBWS9//x8r8GgDHn3DZpEyR3z+Xl+8YHkpc6nc4yaQMkhwMF+NkwTvKAxA6AC00E9CR8I3mjqqp1EiskLzYV0Cfilc4kSVUAf4t4UJblTklVAH9K+EjyCoAVErsAAM80RwBwnuT7QBnPjTGHJPIZcNf/rtvtbgZwJ3A2fNdnNMuU2AV4jDGnSFaBs+GNtfZsXddLJHYBytTU1Cpd5yRnAkU8BDAksQvw6KkRwJNACV9IXq+qaqXELkDRad3LJl8HirAAjknsAjzOuU2hQdL/h7V2o8QuwEPyKMkycLd4p1ttXddLJXYBiq7vXpD8HCjisbV2j8QuwGOt3T7XWkPf+EpytCiK1RK7AB8kAYw0CJIvnHMHJXYBnomJifUkb2l2GCBhxlp7UtogwAPgSGCQnB5oUZbzLEDRcjuAy/0V6FmC4xlpkwCP3j30js+zSRiVQcEsgDEsgRFJOQgWg8wJuPi3wRPSkkRoOjARqqJPhGyqqXDV/DD01Fq7X+YT5uMwF7wgos9KiiUxksdloWEuinI+y+KPoi+LmwYXI9prFP3FSDfFqzEA45rCGmPONbwcPSyLHebrceYGCYYnL+1pkcH/N0ndjL1Jajj1NrmhpBslFZL3km2VVYwxWwC8TLZZWtGE5892+d4J72rr2+X70VKUMWafc25HUh9MZDKZTCYjreAH6Fc/zScrkLcAAAAASUVORK5CYII=" />
                </button>
                <img src="main-img2.webp" alt="" />
              </div>
            </Slider>
          </div>
        </div>
        <div className="content-container">
          <div className="top-5-container">
            <h1>현재 상영작 <span>TOP 5</span></h1>
            <ul className="top-5">
              {topRateScreeningMovieMap}
            </ul>
          </div>
          <div className="top-5-container">
            <h1>상영 예정작 <span>TOP 5</span></h1>
            <ul className="top-5">
              {topRateScheduledMovieMap}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}


export default Home;