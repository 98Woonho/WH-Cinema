// 영화 검색

import { Component } from 'react'
import '../css/Search.css'
import queryString from 'query-string'
import axios from 'axios'
import Movie from './test.js'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: []
    }
  }

  componentDidMount() {
    const queryObj = queryString.parse(window.location.search)
    this.search(queryObj.title)
  }

  search = async (title) => {
    // // DB에 검색한 영화 데이터가 있는지 확인하기 위한 get 요청
    // await axios.get(`/search/${title}`)
    //   .then(res => {
    //     // DB에 검색한 영화 데이터가 없을 때
    //     if (res.data.length === 0) {
    //       // kmdb open api를 통해 검색어와 관련된 영화 데이터를 가져옴
    //       axios.get(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=FPWJ81L14L7X38342790&sort=title,0&listCount=1000`)
    //         .then(res => {
    //           console.log(res)
    //           // kmdb open api에서 가져온 영화 데이터 중 관련 없는 영화 데이터, TV용 데이터, 정보가 부족한 데이터는 삭제
    //           const searchResult = res.data.Data[0].Result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()) && movie.use !== 'TV용');
    //           // 2024-05-07 : 일단 대표 개봉일이 없는 데이터는 제외시켜서 전체 데이터를 db에 저장해보도록 할 생각임.

    //           console.log(searchResult)

    //           searchResult.forEach(movie => {
    //             // 영화 제목에 !HS, !HE가 포함되어 있어서 제거
    //             movie.title = movie.title.replace(/!HS/g, '') // !HS 제거
    //               .replace(/!HE/g, '') // !HE 제거
    //               .trim() // 공백 제거

    //             // 영화 포스터 url이 여러개로 되어있는 데이터 split
    //             movie.posters = movie.posters.split('|')[0];
                
    //             // 영화 줄거리에 있는 따옴표(') -> 공백 으로 변경
    //             movie.plots.plot[0].plotText = movie.plots.plot[0].plotText.replace(/'/g, '');

    //             const movieObj = {
    //               title: movie.title,
    //               genre: movie.genre,
    //               posters: movie.posters,
    //               releaseDate: movie.repRlsDate,
    //               runtime: movie.runtime,
    //               plot: movie.plots.plot[0].plotText,
    //               rating: movie.rating
    //             }

    //             // 영화 정보 db에 저장
    //             axios.post('/movie', movieObj)
    //               .then(res => {
    //               })
    //               .catch(err => {
    //                 console.log(err)
    //               })
    //           })

    //           this.setState({
    //             movieList: searchResult
    //           })
    //         })
    //         .catch(error => {
    //           console.log(error)
    //         })
    //     } else {
    //       // DB에 영화 데이터가 있을 때, get 요청으로 영화 데이터를 가져옴
    //       axios.get(`/search/${title}`)
    //         .then(res => {
    //           this.setState({
    //             movieList: res.data
    //           })
    //         })
    //         .catch(err => {
    //           console.log(err)
    //         })
    //     }
    //   }
    //   )
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
  render() {
    const { movieList } = this.state
    const movieMap = movieList.map(
      (data) => (<Movie title={data.title} posters={data.posters} />)
    )

    return (
      <div id='movieList'>
        {movieMap}
      </div>
    )
  }
}
export default Search;
