import { useState, useRef } from 'react';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MovieRouter from './components/movie/MovieRouter';

function App() {

  
    return(
      <div id='App'>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/movie/*' element={<MovieRouter/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </div>
    )
}
export default App;
