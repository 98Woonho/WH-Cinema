// 홈페이지

import { useState, useEffect } from 'react';
// import { Cookies } from "react-cookie";
// import axios from 'axios';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../css/Home.css';

function Home() {
  useEffect(() => {
    const playBtns = document.querySelectorAll('.play-btn');
    const trailers = document.querySelectorAll('.trailer');

    playBtns.forEach((playBtn, index) => {
      playBtn.addEventListener('click', function () {
        trailers[index].classList.add('visible');
      })
    })
  }, []);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false
  }

  return (
    <>
      <div className="video-dialog">
        <iframe className="trailer" width="1000px" height="700px" src="https://www.youtube.com/embed/4ycxumdqUnY"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <div className="video-dialog">
        <iframe className="trailer" width="1000px" height="700px" src="https://www.youtube.com/embed/oGbkEBrqUAs"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <main id="homeMain">
        <div className="content-container">
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
          </div>
        </div>
      </main>
    </>
  )
}


export default Home;