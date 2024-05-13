import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Join from './Join';
import Certification from './Certification';

function UserRouter() {
    return (
        <Routes>
            <Route path='/certification' element={<Certification />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
        </Routes>
    );
}

export default UserRouter;