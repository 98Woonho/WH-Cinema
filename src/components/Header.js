// 헤더

import {Component} from 'react';
import '../css/Header.css'

class Header extends Component{
  constructor(props){
    super(props)
    this.state={
      word:''
    }
  }

  searchMovie=()=>{
    const {word} = this.state
    window.location.href=`/search?title=${word}`
  }

  wordChange=(e)=>{
    this.setState({
      word:e.target.value
    })
  }

  render(){
    return(
      <div id='header'>
         <input type='text' placeholder='검색어입력' onChange={this.wordChange}/>
         <button onClick={this.searchMovie}>검색</button>
         <a href='/dailyBoxOffice'>일별 박스오피스</a>
      </div>
    )
  }
}
export default Header;
