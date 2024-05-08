// 홈페이지

import { Component } from 'react'
import axios from 'axios'

// cheerio : html/xml을 파싱하고 쉽게 조작하게 해주는 js 라이브러리
import cheerio from 'cheerio'
import '../css/Home.css'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.movieUpdate()
  }

  movieUpdate = async () => {
    await axios.get(`https://www.kobis.or.kr/kobis/business/stat/boxs/findRealTicketList.do`)
      .then(res => {
        console.log(res.data);

        const html = res.data;
        const $ = cheerio.load(html);

        const reservationRate = [];
        $('.tbl_comm tbody tr').each((element) => {
          const rate = $(element).find('.tar').first().text().trim();
          reservationRate.push(rate);
        });

        console.log(reservationRate);
      })
      .catch(err => {
        console.log(err)
      })

    // await axios.get(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=FPWJ81L14L7X38342790&releaseDts=20240308&ratedYn=y&releaseDte=20240508&listCount=500`)
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  render() {
    return (
      <div id='home'>
        홈
      </div>
    )
  }
}


export default Home;
