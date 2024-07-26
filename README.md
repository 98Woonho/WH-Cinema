WH-Cinema Project
=

## ▶️ 개발 목표
<strong>
    <p>영화 예매 웹 서비스 개발</p>
</strong>
<br/>
<br/>

## ▶️ 개발 환경
##### IDE : Visual Studio Code
##### Mysql Server
##### Mysql Workbench
<br/>
<br/>

## ▶️ 사용 API
|용도|제공|API 문서|
|---------------|----------------|------------------------|
|결제|아임포트|[링크](https://developers.portone.io/docs/ko/readme?v=v1)|
|인증|아임포트|[링크](https://developers.portone.io/docs/ko/readme?v=v1)|
|영화 데이터|KMDB|[링크](https://www.kmdb.or.kr/eng/main)|
|영화 데이터|TMDB|[링크](https://www.themoviedb.org/?language=ko)|
<br/>
<br/>

## ▶️ 시연영상
https://www.youtube.com/watch?v=uxvdwvAKuI0&t=16s
<br/>
<br/>

## ▶️ SKILLS
#### BACKEND
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-373737?style=for-the-badge&logo=Express&logoColor=white)
---

#### FRONTEND
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge)
---

#### DATABASE
![MySQL](https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=Mysql&logoColor=white)
---

#### DEVOPS
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-2C2C32.svg?style=for-the-badge&logo=visual-studio-code&logoColor=22ABF3)
<br/>
<br/>

## ▶️ 주요 기능
|서비스|주요 기능|
|---------------|----------------|
|회원 서비스|<ul><li>JWT 로그인</li><li>회원가입</li></ul>|
|영화 목록|<ul><li>현재 상영작 및 상영 예정작 영화 목록 제공</li><li>영화 상세정보 제공</li></ul>|
|예매 서비스|<ul><li>영화 예매</li></ul>|
|사용자 마이페이지|<ul><li>회원정보 관리</li><li>예약 현황 관리</li></ul>|
<br/>
<br/>

## ▶️ ERD
![WHCinemaERD](https://github.com/98Woonho/WH-Cinema/assets/145889732/436bdc7d-b5e2-40f5-8dc5-3f8335974777)
<br/>
<br/>
---

## ▶️ 주요 END POINT DOC
### 회원 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /user         | GET            | 유저를 조회합니다. |
| /user         | PATCH           | 유저 정보를 변경합니다. |
| /user         | DELETE         | 유저 정보를 삭제합니다. |
| /user/verify     | GET         | 유저의 accessToken과 refreshToken을 통해 유효성 검증을 합니다. |
| /user/accessVerify     | GET              | 현재 로그인 한 유저의 accessToken을 검증합니다. |
| /user/refreshVerify    | GET              | 현재 로그인 한 유저의 refreshToken을 검증합니다. |
| /user/refreshToken     | GET              | 현재 로그인 한 유저의 refreshToken을 조회합니다. |
| /user/accessTokenPayload     | POST               | 현재 로그인 한 유저의 accessToken의 Payload 정보를 조회합니다. |
| /user/login    | POST               | 로그인을 합니다. |
| /user/join     | POST               | 회원가입을 합니다. |
| /user/logout    | POST             | 로그아웃을 합니다. 동시에 쿠키에 있는 accessToken과 refreshToken가 삭제 됩니다. |
| /user/certification    | POST             | 본인인증을 합니다. |
---
<br/>


### 영화 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /movie | GET         | 영화 목록을 조회합니다. | 
| /movie/topRate | GET           | TOP 5 영화 목록을 조회합니다. |
| /theater | GET           | 영화관을 조회합니다. |
| /screenHall | GET        | 상영관을 조회합니다. |
| /theater | GET           | 상영정보를 조회합니다. |
---
<br/>

### 예매 서비스
| URI                | REQUEST METHOD | DESCRIPTION                  |
|--------------------|----------------|------------------------------|
| /ticketing       | GET                | 예매 목록을 조회합니다. |
| /ticketing       | POST               | 예매를 합니다. |
| /ticketing       | DELETE                | 예매를 취소 합니다. |
---
<br/>

### 결제 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /payment         | POST              | 결제를 합니다. |

---
<br/>

📃: File Tree
---
```
WH-Cinema
├─ .env
├─ .git
│  ├─ config
│  ├─ description
│  ├─ fsmonitor--daemon
│  │  └─ cookies
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           └─ HEAD
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-817468a2b5e2d63b4013c477eaaea52c8decd06f.idx
│  │     ├─ pack-817468a2b5e2d63b4013c477eaaea52c8decd06f.pack
│  │     └─ pack-817468a2b5e2d63b4013c477eaaea52c8decd06f.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ architecture
│  └─ SQL
│     └─ WHCinema.sql
├─ express
│  ├─ config
│  │  └─ db.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ movieRoutes.js
│  │  ├─ paymentRoutes.js
│  │  ├─ theaterRoutes.js
│  │  ├─ ticketingRoutes.js
│  │  └─ userRoutes.js
│  └─ server.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ app_KAKAO.png
│  ├─ app_KAKAOBANK.png
│  ├─ app_PASS.png
│  ├─ app_PAYCO.png
│  ├─ app_TOSS.png
│  ├─ check-icon.png
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ loading.png
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ main-img1.webp
│  ├─ main-img2.webp
│  ├─ manifest.json
│  ├─ payco.png
│  ├─ robots.txt
│  ├─ tosspay.png
│  └─ x-icon.png
├─ README.md
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ components
   │  ├─ CustomArrow.js
   │  ├─ Footer.js
   │  ├─ Header.js
   │  ├─ Home.js
   │  ├─ Loading.js
   │  ├─ movie
   │  │  ├─ Detail.js
   │  │  ├─ Movie.js
   │  │  └─ MovieRouter.js
   │  ├─ Pagination.js
   │  ├─ Ticketing.js
   │  └─ user
   │     ├─ Certification.js
   │     ├─ Join.js
   │     ├─ Login.js
   │     ├─ MyPage.js
   │     └─ UserRouter.js
   ├─ css
   │  ├─ Footer.css
   │  ├─ Header.css
   │  ├─ Home.css
   │  ├─ Loading.css
   │  ├─ movie
   │  │  ├─ Detail.css
   │  │  └─ Movie.css
   │  ├─ Pagination.css
   │  ├─ Ticketing.css
   │  └─ user
   │     ├─ Certification.css
   │     ├─ Join.css
   │     ├─ Login.css
   │     └─ MyPage.css
   ├─ data
   │  └─ seatsData.json
   ├─ index.css
   ├─ index.js
   ├─ logo.svg
   ├─ reportWebVitals.js
   ├─ setupTests.js
   └─ utils
      └─ tokenUtils.js

```