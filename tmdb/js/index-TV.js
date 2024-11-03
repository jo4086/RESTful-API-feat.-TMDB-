const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDA3NjA5Mi45MzE5NzksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zc24yS96Ag4F5c_wxry_xe0KnNsI0_1NTdqMs6_CulY',
   },
}


const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getPlayingPopularTvs = async (url) => {
   try {
      const respones = await fetch(url, options)
      console.log(respones)
      const data = await respones.json()
      console.log(data)
      const results = data.results
      
      console.log(data)
      // div 생성과정
      const container = document.querySelector('main .container') // 컨테이너 연결
      let rowsHtml = '<div class="cardbox" style="display: flex;overflow: hidden;">' // 누적시킬 변수
      let rowHtml = ''
      
      for (let i = 0; i < results.length; i++) {
         const tv = results[i]

         rowHtml += `
         <div class="slide_card col-3" style="margin: 1% ;height: 400px;background-color: tan;border: 1px solid;width:23%; box-sizing: border-box;">
               <a href="./indexTv_detail.html?series_id=${tv.id}">
                  <img src="https://image.tmdb.org/t/p/w400${tv.poster_path}" alt="${tv.title}"/>
               </a>
            </div>`
      }
      rowsHtml += rowHtml
      rowsHtml += '</div>'
      console.log(data.results)
      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}
getPlayingPopularTvs(url)


let progressSlideIndex = 0;
const totalSildes = 

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