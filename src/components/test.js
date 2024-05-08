// 영화 목록

import '../css/Movie.css';

function Movie (props) {
    return(
        <div id='movie'>
            <div id='title'>
                {props.title}
            </div>
            <a href='/'>
                <img src={props.posters}/>
            </a>
        </div>
    )
}

export default Movie;