// 영화 상세정보

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../css/Detail.css';
import axios from 'axios';

function Detail() {
    const [query, setQuery] = useSearchParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(`/movie/${query.get('title')}`)
            .then(res => {
                setMovie(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <p>
            
        </p>
    );
}

export default Detail;