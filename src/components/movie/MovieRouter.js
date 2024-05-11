import { Routes, Route } from 'react-router-dom';
import Movie from './Movie';
import Detail from './Detail';

function MovieRouter() {
    return (
        <Routes>
            <Route path='/' element={<Movie />}></Route>
            <Route path='/detail' element={<Detail />}></Route>
        </Routes>
    )
}

export default MovieRouter;