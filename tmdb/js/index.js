// 서버한테 같이 전달하는 요청리스트
const options = {
   method: 'GET', //Restful 방식 중 GET방식으로 요청
   headers: {
      accept: 'application/json', // Json 객체 형태로 데이터 서버에 요청
      //   보안을 위해서 서버에서 주는 인증키
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTcyOTgyNTUxOS4wNTI5MjksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l7xpbRkS6xjFmls9unXC7tEdZahQ4eiyYE22JoPU7HA',
   },
}

/* 
 fetch: 서버에 request를 요청하는 자바스크립트에서 제공하는 함수
 구조
 fetch(request주소, request 할 때 서버에 같이 전달하는 옵션)

 서버주소
 => api.themoviedb.org
 경로(물음표 전까지)
 => /3/movie/now_playing?
 쿼리스트링 : 보내는 값들(물음표 후부터)
 => language=ko-KR&page=1&region=KR
 => 세부분석
    => language = ko-KR  - 언어는 한국어
    => page = 1          - 페이지는 1페이지만
    => region = KR       - 지역은 한국
    세가지 정보를 포함함*/

//  header: 서버에 전달할 정보 (options값)
//  get은 주소로  // post는 숨겨서
// post 방식일 때 숨기는 위치 : body
// 오픈되서 보내는 get방식은 주소로 보낸다.

// fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR', options)
//    .then((res) => res.json())
//    .then((res) => console.log(res)) //respones 정보 + 데이터
//    .then((res) => console.log(res.json()))
//    .catch((err) => console.error(err))

// ▼ 원본
/* fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR', options)
   .then((res) => {
      console.log(res) // respones 정보 + 데이터
      return res.json() //실제 데이터만 리턴
   })
   .then((res) => console.log(res))
   .catch((err) => console.error(err)) //request할 때 문제 발생시 실행 */

// ■■■■■■■■■■■■■■■
// ▼ 수정 1
// ■■■■■■■■■■■■■■■

// const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

// const getPlayingMovies = (url) => {
//    return fetch(url, options)
// }

// fetch도 똑같이 promise 객체를 리턴해주기 때문에 async - await에서 await의 역할을 한다.
// getPlayingMovies(url)
//    .then((res) => {
//       console.log('%cResponse(console.log(res))\n', 'font-weight:bold;font-size:1.2em', res)
//       return res.json()
//    })
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err))

// ■■■■■■■■■■■■■■■
// ▼ 수정 1 End
// ■■■■■■■■■■■■■■■
// ▼ 수정 2 start
// ■■■■■■■■■■■■■■■

// Why? fetch는 promise를 사용하는지??
// => 서버에 장애가 있거나 네트워크 문제가 있거나... 등의 상황에서 동기적으로 실행이 된다면 사용자는 다른 작업을 할 수 없기 때문이다.
// 그래서 request는 비동기함수로 동작한다.

// 그리고 async

// await : 코드가 다 끝날때까지 기다리는 것.
// promise , async-await = 비동기 함수
// request 해주는 과정을 비동기로 동작시켜준다.
/* 
const getPlayingMovies = async (url) => {
   console.group("getPlayingMivoes <= getPlayingMovies(url)\nurl='https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR' => async의 [url]에 등록")
   try {
      const respones = await fetch(url, options) // promise 객체를 리턴.. 데이터를 가져올 때 까지 기다린다.
      console.log(respones) // resonpnes가 올 때까지 기다렸다가 실행.

      // await를 지정하는 이유 : fetch는 비동기적으로 실행되므로 서버에서 request를 해오는 딜레이 동안 실행한다.
      //    const data = respones.json()
      const data = await respones.json()
      data.results.forEach((result) => {
         console.groupCollapsed(result.title)
         console.log(result.id) // 영화를 구분하기 위한 고유id
         console.log(result.poster_path)
         console.log(result.vote_average)
         console.groupEnd()
      })
      //   console.log(data)
   } catch (error) {
      console.error('에러발생', error)
   }
}
// ■■■■■■■■■■■■■■■
// ▶ 수정2 End
// ■■■■■■■■■■■■■■■

getPlayingMovies(url) */

/* 
const getPlayingMovies = async (url) => {
   console.group('getPlayingMivoes <= getPlayingMovies(url)')
   try {
      const respones = await fetch(url, options) // promise 객체를 리턴.. 데이터를 가져올 때 까지 기다린다.
      console.log(respones) // resonpnes가 올 때까지 기다렸다가 실행.

      // await를 지정하는 이유 : fetch는 비동기적으로 실행되므로 서버에서 request를 해오는 딜레이 동안 실행한다.
      //    const data = await respones.json()
      const data = respones.json()
      console.log(data)
   } catch (error) {
   
      console.error(error)
   }
} */

// ■■■■■■■■■■■■■■■
// ▶ 수정3 start
// ■■■■■■■■■■■■■■■

/* ■■ 주석 제외 전체 코드 ■■
const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results

      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
         const index = i + j
         if (index >= results.length) break

         const movie = results[index]
         rowHtml += `
            <div class="col-12 col-sm-6 col-md-3 px-3 py-1 m-0" style="background-color: palegreen">
               <div class="card">
                  <a href="./detail.html?movie_id=${movie.id}">
                     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                  </a>
                  <div class="card-body">
                     <p class="card-text title">${movie.title}</p>
                     <p class="card-text average">${movie.vote_average.toFixed(1)}</p>
                  </div>
               </div>
            </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러발생', error)
   }
}

getPlayingMovies(url)      */

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results
      console.log(data)
      const container = document.querySelector('main .container')
      let rowsHtml = '' 

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break

            const movie = results[index]
            rowHtml += `
                <div class="col-12 col-sm-6 col-md-6 col-lg-3 px-3 py-1 m-0">
                    <div class="card">
                      <a href="./detail.html?movie_id=${movie.id}">
                         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                      </a>
                      <div class="card-body">
                         <p class="card-text title">${movie.title}</p>
                         <p class="card-text average">${movie.vote_average.toFixed(1)}</p>
                      </div>
                    </div>
                </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml //전체 row 문자열에 추가
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러발생', error)
   }
}

getPlayingMovies(url)

// TMDB 인기 있는 TV 프로그램 페이지, 상세 페이지 만들기
