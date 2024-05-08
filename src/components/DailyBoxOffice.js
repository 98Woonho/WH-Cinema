import { Component } from 'react';
import '../css/DailyBoxOffice.css';
import axios from 'axios';
import Movie from './test.js';

class DailyBoxOffice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieList: []
        }
    }

    componentDidMount() {
        this.dailyBoxOffice()
    }

    dailyBoxOffice = async () => {

        await axios.get(`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e4c80909ed58cd90bfaa85912c33d371&movieNm=엑스맨`)
        .then(res => {
            console.log(res.data)
            });
        }

        // const today = new Date()

        // // 당일 날짜의 일별 박스오피스 데이터가 존재 하지 않아, 하루 전 날짜로 박스오피스 출력
        // const yesterday = new Date(today);
        // yesterday.setDate(today.getDate() - 1);

        // const year = yesterday.getFullYear().toString().padStart(4, '0');
        // const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
        // const day = yesterday.getDate().toString().padStart(2, '0');

        // const formattedDate = year + month + day;

        // await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=e4c80909ed58cd90bfaa85912c33d371&targetDt=${formattedDate}`)
        // .then(response => {
        //     console.log(response)
        //     const movieList = [];
        //     response.data.boxOfficeResult.dailyBoxOfficeList.forEach(dailyBoxOffice => {
        //         axios.get(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=FPWJ81L14L7X38342790&query=${dailyBoxOffice.movieNm}`)
        //         .then(response => {
        //             const movie = {
        //                 movieNm: dailyBoxOffice.movieNm,
        //                 poster: response.data.Data[0].Result.posters
        //             }
        //             movieList.push(movie)
        //         })
        //     });
        //     this.setState({
        //         movieList: movieList
        //     })
        // })
    

    render() {
        const { movieList } = this.state
        const movieMap = movieList.map(
            (data) => (<Movie title={data.movieNm} posters={data.poster}/>)
        )

        return (
            <div id='dailyBoxOffice'>
                {movieMap}
            </div>)
    }
}
 export default DailyBoxOffice;