// 홈페이지

import { Component } from 'react'
import axios from 'axios'
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
      await axios.get()
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
