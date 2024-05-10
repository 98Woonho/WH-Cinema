import {Component} from 'react';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';

class App extends Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  render(){
    return(
      <div id='App'>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/movie' element={<Movie/>}/>
              </Routes>
          </BrowserRouter>
      </div>
    )
  }
}
export default App;
