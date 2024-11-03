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

// getPlayingMovies(url)
let style1 = ['font-weight:bold', 'font-size:1.2em', 'background-color:#f3ee53', 'border:1px solid black', 'display:flex', 'text-align:cetner', 'line-height:30px', 'text-shadow: 2px -2px 3px rgba(0,0,0,0.3)'].join(';')

let style2 = ['font-size:0.95em', 'display:block', 'line-height:16px'].join(';')

console.groupCollapsed('%c<script>', style1)
console.log(
   `%c const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'       \n const getPlayingMovies = async (url) =>  {\n       try {\n           const respones = await fetch(url, options)\n           const data = await respones.json()\n           const results = data.results\n\n           const container = document.querySelector('main .container)\n           let rowsHtml = ''\n\n           for (let i = 0; i< results.length; i += 4) {\n               let rowHtml = '<div class="row">\n\n               for (let j = 0; j < 4; j++) {\n                   const index = i + j\n\n                   if (index >= results.length) break\n\n                   const movie = results[index]\n                   rowHtml +=\n                         '<div class="~~">'\n                              <div class="card">\n                                  반복내용\n                              </div>\n                          </div>'\n               }\n               rowHtml += '</div>'\n               rowsHtml += rowHtml\n           }\n           container.innerHTML = rowsHtml\n       } catch (error) {\n          console.error('에러발생',error)\n    }\n}\n\ngetPlayingMovies(url)`,
   style2
)
console.groupEnd()

const getPlayingMovies = async (url) => {
   console.group("const getPlayingMivoes =async (url) <= [url] 매개변수명에\n 매개변수 값으로 getPlayingMovies(url)의 [url] 저장\nconst url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR' 을 선언하였으므로\n\n최종적으로 async의 매개변수명(url)에는 위 링크가 저장")
   console.log('실험 결과확인\nconsole.log(url): ', url)
   console.groupEnd()
   try {
      // console.lop로 기록
      console.group(`try문 분석하기`)
      console.log(`const respones = await fetch(url, options)에서 url은 async의 매개변수명인 url이고 이에 저장된 링크를 뜻함\n(외부 const url이 아닌 매개변수명 url,, 이는 매개변수명을 달리해도 동작한다는 뜻)\n실험을 통하여 async(url)을 (ss)로 바꾸고 동작한 결과 정상 작동...\n=> 예상한 결과 나옴`)

      console.group(`const = await respones.json()에서 await를 사용한 이유\n`)
      console.log(`▶ 위에서 선언한 const respones = awiat fetch(url, options)은 서버에서 데이터값을 불러오는데 약간의 시간이 걸림\n  => 내부는 동기적으로 가동하나 외부로 보면 비동기 함수\n  => 즉 밑에 다른 함수가 있으면 독립된 관계이므로 바로 실행시킴`)
      console.log(`▶ cosnt data 부분에서는 코드를 즉각 실행시킬 수 있으므로 fetch에서 데이터를 불러오는 시간보다 먼저 계산이 완료됌`)
      console.log(`▶ data는 respones.json() 형식으로 불러온 데이터에서 속성을 불러와야 하는데\n  => 이게 완료되기 전에 읽어냄`)
      console.groupEnd()

      const respones = await fetch(url, options)

      // await를 사용하는 이유
      console.log('▼ 아래와 같이 promise 오브젝트 형태로 출력\n  ▶ %cPromise {<pending>}', 'font-style:italic;font-weight:500;color:#a1a1a1;background-color:#a6ffdb;font-size:11px')
      const data = await respones.json()
      console.log('▼ 아래는 await를 사용시 출력 형태\n', data)
      console.groupEnd()
      // console.groupEnd()

      const results = data.results
      // console => 20개의 card생성 설명
      console.group('results = data.results로 불러올 포스터들\nresults.length = 20개존재\n')
      console.log(results)

      const container = document.querySelector('main .container')
      let rowsHtml = '' //모든 row를 담을 문자열 변수

      for (let i = 0; i < results.length; i += 4) {
         //    각 row는 4개의 card
         let rowHtml = '<div class="row">'

         // console => row작동 원리
         console.groupCollapsed(`${i / 4 + 1}번(${i}) row`)

         for (let j = 0; j < 4; j++) {
            //  console => col 작동 원리
            console.groupCollapsed(`${i + j + 1}번째 index = ${i}+${j} = ${i + j}`)
            console.log(`${j}`)
            console.groupEnd()
            const index = i + j
            // 순서 [0] 1 2 3 => [4] 5 6 7 => [8] 9 10 11 => [12] 13 14 15 => [16] 17 18 19
            // 여기까지 총 20개가 생성되고 index가 20이 되는순간은 21개째니까 중단시킴
            if (index >= results.length) break // results 배열을 벗어나면 중단 (즉 내용물이 20개가 되면 끝)
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
         console.groupEnd()
         rowHtml += '</div>'
         rowsHtml += rowHtml //전체 row 문자열에 추가
      }
      console.groupEnd()

      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러발생', error)
   }
}

getPlayingMovies(url)

// TMDB 인기 있는 TV 프로그램 페이지, 상세 페이지 만들기
