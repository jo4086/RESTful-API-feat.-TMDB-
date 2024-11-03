const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDA3NjA5Mi45MzE5NzksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zc24yS96Ag4F5c_wxry_xe0KnNsI0_1NTdqMs6_CulY',
   },
}
/* const fetchData = async (url, section) => {
   try {
      const response = await fetch(url, options)
      const data = await response.json()
      const results = data.results

      createPoster(results, section)
      slidePosters(results, section)
   } catch (error) {
      console.error('에러 발생: ', error)
   }
} */

const popUrl = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'
const todayUrl = 'https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=1'
const on_the_air = 'https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=1'
// https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=1
// https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=1
// https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1
const container = document.querySelector('main .container') // 컨테이너 연결

// ---인기있는 TV 슬라이딩 포스터
const getPlayingPopularTvs = async (url, section) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results
      console.log(results)

      popPoster(results)
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}

const popPoster = (results) => {
   let rowsHtml = '<div class="cardbox popLayer" style="display: flex;">' // 누적시킬 변수
   let rowHtml = ''

   for (let i = 0; i < results.length; i++) {
      const tv = results[i]

      rowHtml += `
         <div class="slide_card col-3" style="">
               <a href="./indexTv_detail.html?series_id=${tv.id}">
                  <img src="https://image.tmdb.org/t/p/w400${tv.poster_path}" alt="${tv.title}"/>
               </a>
            </div>`
   }
   rowsHtml += rowHtml
   rowsHtml += '</div>'
   container.innerHTML += rowsHtml

   const slideBox = document.querySelector('.popLayer')

   slideBox.addEventListener('mouseover', () => {
      slideBox.style.animationPlayState = 'paused' // 애니메이션 멈춤
   })

   slideBox.addEventListener('mouseout', () => {
      slideBox.style.animationPlayState = 'running' // 애니메이션 재개
   })
}

// ---오늘 방영 슬라이딩 포스터

const getAiringToday = async (url, section) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results
      console.log(results)

      todayPoster(results)
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}

const todayPoster = (results) => {
   let rowsHtml = '<div class="cardbox todayLayer" style="display: flex;">' // 누적시킬 변수
   let rowHtml = ''

   for (let i = 0; i < results.length; i++) {
      const tv = results[i]

      rowHtml += `
         <div class="slide_card col-3" style="">
               <a href="./indexTv_detail.html?series_id=${tv.id}">
                  <img src="https://image.tmdb.org/t/p/w400${tv.poster_path}" alt="${tv.title}"/>
               </a>
            </div>`
   }
   rowsHtml += rowHtml
   rowsHtml += '</div>'
   container.innerHTML += rowsHtml

   const slideBox = document.querySelector('.todayLayer')

   slideBox.addEventListener('mouseover', () => {
      slideBox.style.animationPlayState = 'paused' // 애니메이션 멈춤
   })

   slideBox.addEventListener('mouseout', () => {
      slideBox.style.animationPlayState = 'running' // 애니메이션 재개
   })
}

// ---지금 방영 중

const getOnTheAir = async (url, section) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results
      console.log(results)

      onTheAirPoster(results)
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}

const onTheAirPoster = (results) => {
   let rowsHtml = '<div class="cardbox todayLayer" style="display: flex;">' // 누적시킬 변수
   let rowHtml = ''

   for (let i = 0; i < results.length; i++) {
      const tv = results[i]

      rowHtml += `
         <div class="slide_card col-3" style="">
               <a href="./indexTv_detail.html?series_id=${tv.id}">
                  <img src="https://image.tmdb.org/t/p/w400${tv.poster_path}" alt="${tv.title}"/>
               </a>
            </div>`
   }
   rowsHtml += rowHtml
   rowsHtml += '</div>'
   container.innerHTML += rowsHtml

   const slideBox = document.querySelector('.todayLayer')

   slideBox.addEventListener('mouseover', () => {
      slideBox.style.animationPlayState = 'paused' // 애니메이션 멈춤
   })

   slideBox.addEventListener('mouseout', () => {
      slideBox.style.animationPlayState = 'running' // 애니메이션 재개
   })
}

const init = async () => {
   await getPlayingPopularTvs(popUrl, 'popular')
   await getAiringToday(todayUrl, 'today-airings')
   await getOnTheAir(on_the_air, 'airing-now')
   // await getTopRated(topRatedUrl)
}

init()

/* 
               <div style="display: flex;">
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
                     <div class="col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width: 260px; box-sizing: border-box;">a</div>
               </div>
 */
