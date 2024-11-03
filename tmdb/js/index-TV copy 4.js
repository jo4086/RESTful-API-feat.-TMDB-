const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDA3NjA5Mi45MzE5NzksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zc24yS96Ag4F5c_wxry_xe0KnNsI0_1NTdqMs6_CulY',
   },
}

const fetchUrl = async (url, section, title) => {
   try {
      const response = await fetch(url, options)
      const data = await response.json()
      const results = data.results
      // console.log(results, section)

      if (section === 'popular') {
         results.sort((a,b) => b.popularity - a.popularity)

      }
      console.log(results, section, title)

      createPoster(results, section, title)
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}

const createPoster = (results, section, title) => {
   const container = document.querySelector(`main .container`)
   let rowsHtml = `
   <div class="menu ${section}"><h3>${title}</h3>
      <div class="cardbox" style="display: flex;">` // 누적시킬 변수
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
   rowsHtml += '</div></div>'
   container.innerHTML += rowsHtml

   const slideBox = document.querySelectorAll('.cardbox')

   slideBox.forEach((e) => {
      e.addEventListener('mouseover', () => {
         e.style.animationPlayState = 'paused'
      })
   })
   slideBox.forEach((e) => {
      e.addEventListener('mouseout', () => {
         e.style.animationPlayState = 'running'
      })
   })
}

// ---오늘 방영 슬라이딩 포스터

const init = async () => {
   const popUrl = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'
   const todayUrl = 'https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=1'
   const on_the_air = 'https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=1'
   const topRate = 'https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1'

   // '인기있는 TV 프로그램', '오늘 방영할 TV 프로그램', '현재 방영 중인 TV 프로그램', '높은 평점의 TV 프로그램'
   fetchUrl(popUrl, 'popular', '인기있는 TV 프로그램')
   fetchUrl(todayUrl, 'today-airings', '오늘 방영할 TV 프로그램')
   fetchUrl(on_the_air, 'on-the-air', '현재 방영 중인 TV 프로그램')
   fetchUrl(topRate, 'top-rate', '높은 평점의 TV 프로그램')
}

init()
