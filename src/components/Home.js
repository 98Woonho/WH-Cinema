// 홈페이지

import { Component } from 'react'
// import axios from 'axios'

// cheerio : html/xml을 파싱하고 쉽게 조작하게 해주는 js 라이브러리
// import cheerio from 'cheerio'
import '../css/Home.css'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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
