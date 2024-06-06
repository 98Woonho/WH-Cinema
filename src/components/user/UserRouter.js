import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Join from './Join';
import MyPage from './MyPage';
import Certification from './Certification';

function UserRouter() {
    return (
        <Routes>
            <Route path='/certification' element={<Certification />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/myPage' element={<MyPage />} />
        </Routes>
    );
}

export default UserRouter;