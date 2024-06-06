import '../../css/user/MyPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyPage() {
    const handleMenu = (e) => {
        e.target.classList.add('selected');
    }

    return (
        <div id='myPage'>
            <div className="my-page-left">
                <div className='menu-container'>
                    <h2 className='menu-title'>회원</h2>
                    <p className='menu' onClick={handleMenu}>회원정보</p>
                    <p className='menu' onClick={handleMenu}>회원정보수정</p>
                    <p className='menu' onClick={handleMenu}>회원탈퇴</p>
                </div>
                <div className='menu-container'>
                    <h2 className='menu-title'>예매</h2>
                    <p className='menu' onClick={handleMenu}>예매현황</p>
                </div>
            </div>
            <div className="my-page-right">

            </div>
        </div>
    );
}

export default MyPage;