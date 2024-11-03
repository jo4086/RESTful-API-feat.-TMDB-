/* 
https://api.themoviedb.org/3/movie/{movie_id}
=> movie_id로 정볼르 주겠다는 뜻

저번에 만들었던 카드 div에
 <a href="./detail.html?movie_id=${movie.id}"> 라고 적어놨고
영화를 구분하기 위해 만들어 놓은것
*/

// 물음표 뒤쪽에 쿼링~
// 패스파라 : 물음표 앞
/* 
fetch('https://api.themoviedb.org/3/movie/1184918?language=ko-KR', options)
여기 보면 movie/ 뒤쪽 [1184918?language=ko-KR]이 정보를 주는것으로
패스형식으로 준다해서 패스파라미터라고 부름
*/

/* 쿼리스트링 방식
fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR', options)
 */

const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDA3NjA5Mi45MzE5NzksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zc24yS96Ag4F5c_wxry_xe0KnNsI0_1NTdqMs6_CulY',
   },
}

/* ■■■■■■■■■■■■원래 패치로 가져오는 코드■■■■■■■■■■■
   ■ fetch('https://api.themoviedb.org/3/movie/1184918?language=ko-KR', options)
   ■    .then((res) => res.json())
   ■    .then((res) => console.log(res))
   ■    .catch((err) => console.error(err))
   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■   */
// ■■■■■■■■■■■■ ▼ 수정한 코드 ▼ ■■■■■■■■■■■■■■■■■■■

/* ▼ [location.search] 설명
    [location.search]를 콘솔에 입력하면 주소의 쿼리 스트링을 가져옴
    => 결과 값 'movie_id=1184918'
    
    => 이 가져올 주소로 링크 클릭시 변동하는 movie_id 값을 가져오는게 1차 목표*/

// 현재 페이지의 url을 사용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

// 특정 쿼리 스트링 값 가져오기 (예: ?movie_id=573435)
// 'movie_id=1184918'에서  'movie_id'를 입력함으로써 해당의 값을 가져옴
// movie_id [=] 1184918 이기 때문에 저장된 값인 숫자를 가져온다
const movieId = urlParams.get('movie_id')
console.log(urlParams.get('movie_id'))
// => urlParams.get('가져올 문자')를 입력함으로써 movie_id는 항상 고정으로 가져오고

/*  ▼ 원래 가져왔던 고정주소
    const movieDetailUrl = 'https://api.themoviedb.org/3/movie/1184918?language=ko-KR'

    ▼ movie_id를 수정한 주소   */

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()
      console.log(data)

      // ▼ [w300] : poster의 width를 300으로 지정
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
         <div class="Poster row">
            <div class="poster col-sm-3" style="text-align:center">
               <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%" />
            </div>
            <div class="col-sm-9 movie-datail">
               <h2>${data.title}</h2>
               <ul class="movie-info">
                  <li>개봉일 : ${data.release_date}</li>
                  <li>장르 : ${data.genres.map((genre) => {
                     return genre.name
                  })}</li>
                  <li>상영시간: ${data.runtime}분</li>
               </ul>
               <p>평점 : ${Number(data.vote_average.toFixed(1)) === 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
               <p>${data.overview}</p>
            </div>
         </div>
      `
      // 위에서 평점이 0.0이면 미반영 출력, 그렇지 않으면 평점 출력 삼항연산자 사용
      mainContainer.innerHTML += rowHtml
      //   console.log(data)
      await getCreditsMovie(movieCreditsUrl)
   } catch (error) {
      console.log('에러 발생: ', error)
   }
}

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)

      const data = await response.json()
      // let castRowHtml = `<div class="row" style="margin-top:30px; justify-content: flex-start;">`
      let castRowHtml = `<div class="Credits row" style="margin-top:30px">`
      console.log(data)
      console.log(data.cast.length)

      for (let i = 0; i < data.cast.length; i++) {
         if (i == 6) break


         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHtml += `
            <div class='Credits col-12 col-sm-3 col-md-3 col-lg-2 p-3'>
                <div class="detail card">
                    <img src="${profileImg}" class="card-img-top" alt="${data.cast[i].name}">
                    <div class="card-body">
                        <p class="card-text">${data.cast[i].name}</p>
                    </div>
                </div>
            </div>`
      }
       castRowHtml += `</div>`
       
       mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)
