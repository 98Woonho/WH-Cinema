# react와 yts.mx API를 활용한 영화 검색
react로 간단한 검색창을 만들어서, 영화 이름을 입력하고 검색을 누르면 해당 이름의 영화 목록이 나오도록 하는 기능이다.\
영화 데이터는 yts.mx에서 API로 제공을 해준다.\
`https://yts.mx/api/v2/list_movies.json?query_term={영화 이름}` 으로 get 요청을 보내면 영화 목록을 Array 형태로 응답해준다.

<br>

우선 코드를 받고, 터미널에 `cd react-router-practice2` 입력 후 `npm start`를 해주면 실행이 되고, 아래 페이지가 나타나게 된다.

![image](https://github.com/98Woonho/react-practice/assets/145889732/6dcc3364-4b52-482f-bb89-ddbf288f6ca2)

## SearchTab.js
위 검색 부분은 <b>SearchTab.js</b> 부분이다. 검색창에 글자가 입력될 때 마다, <b>SearchTab.js</b>의 <b>wordChange()</b> 가 실행이 되고, state에 word가 입력한 글자로 갱신이 된다.\
그 후 검색을 누르면, <b>searchMovie()</b>가 실행이 되고, state에 있는 word를 가져와 `/search?ie=utf-8&word=${word}` 경로로 이동하게 된다.

<br>

## SearchResult.js
<b>App.js</b>에서 `<Route path='/search' element={<SearchResult/>}/>` 로 설정을 해두었기 때문에, SearchResult Component로 렌더링 된다.\
그 후 <b>SearchResult.js</b> 에서 <b>componentDidMount()</b>가 실행된다. <b>componentDidMount()</b>는 렌더링이 완료된 후 실행되는 메서드이다. jQuery의 ready라고 생각하면 된다.\
<b>componentDidMount()</b>가 실행되면, queryString.parse를 이용하여 url에서 search에 있는 `?ie=utf-8&word=avatar` 부분을 `{ie:'utf-8',word:'avatar'}`로 변환해주고 searchMovie()에 word만 뽑아내서 전달해준다.

<br>

## SearchResult.js의 render()
searchMovie() 에서 받아온 word로 `axios.get(https://yts.mx/api/v2/list_movies.json?query_term={word})` 으로 요청을 보내고, 응답(response)으로 영화 목록을 배열로 받아온다.\
그 배열을 state에 movieList에 저장하고, `const movieMap=movieList.map( (data) => ( <Movie cover_image={data.medium_cover_image} title={data.title}/> ) )` 코드로 Movie Component Map을 생성하고 html에 return을 해주어서 화면에 영화 목록을 띄어준다.

<br>

## word = avatar 검색
![image](https://github.com/98Woonho/react-practice/assets/145889732/fb805421-a2b1-4c30-a7df-bce6d03f7f85)
