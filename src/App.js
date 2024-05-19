import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MovieRouter from './components/movie/MovieRouter';
import UserRouter from './components/user/UserRouter';
import { Cookies } from "react-cookie";
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
        script2.async = true;
        document.body.appendChild(script2);


        // const authorizationCookie = cookies.get('authorization');

        // const accessToken = cookies.get('authorization').split('Bearer ')[1];

        // axios.get('/user/verify', { params: { token: accessToken } })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    return (
        <div id='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/user/*' element={<UserRouter />} />
                    <Route path='/movie/*' element={<MovieRouter />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;
