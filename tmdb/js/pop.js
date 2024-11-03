const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDA3NjA5Mi45MzE5NzksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zc24yS96Ag4F5c_wxry_xe0KnNsI0_1NTdqMs6_CulY',
   },
}
const options2 = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDYyNjA5Ni43ODQ2NTY1LCJzdWIiOiI2NzFhZTk0NzQ1NDJlMzcxZmUwYTZhZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CUNvgsU23VuadAM1haNd4VYmaLm84LmnFqcC6K9rYIM',
   },
}

const button = document.querySelector('.button1_text')
const dropdown = document.querySelector('.dropdown')
const option = document.querySelectorAll('.option')
const droplist = document.querySelector('#dropdown')
const selected = document.querySelector('.selected')
selected.innerHTML = option[0].innerText
// 좌측 버튼 onclick 이벤트
function button1() {
   // 클릭시 보이게 속성을 변경할 Id 연결
   const viewdiv = document.getElementById('drop-tab')
   // 클릭시 추가되는 div로 테두리의 스타일을 변경하여 자연스럽게 하나처럼 보이게
   const btn1 = document.getElementById('btn1')

   // 클릭시 조건 설정
   if (viewdiv.style.display === 'none') {
      // 안보이는 상태면 보이게하고 테두리스타일 변경
      viewdiv.style.display = 'block'
      viewdiv.style.boxShadow = '0px 3px 6px 0.5px rgb(116,116,116)'
      btn1.style.borderRadius = '8px 8px 0 0'
   } else {
      // 보이는 상태면 숨기고 테두리 원래대로
      viewdiv.style.display = 'none'
      btn1.style.borderRadius = '8px'
   }
}

// onclick이후 안의 드롭다운 펼치는 이벤트
droplist.addEventListener('click', () => {
   // 드롭다운 클릭시 속성을 변경할 ul태그의 id 변수로 지정
   const options = document.getElementById('options')

   // 조건에 따라 드롭다운이 보이거나 안보이게
   if (options.style.display === 'none') {
      // 안보일시 보이게하고
      options.style.display = 'block'
   } else {
      // 보이면 안보이게
      options.style.display = 'none'
   }
})

// 드롭다운 li태그들에 이벤트리스너 모두 연결
option.forEach(function (e) {
   // li태그에 클릭 이벤트 발생 추가
   e.addEventListener('click', function () {
      // 드롭다운 선택시 텍스트 변경
      selected.innerText = this.innerText
      // 드롭다운 선택시 드롭다운 숨김
      const options = document.getElementById('options')
      options.style.display = 'none'
   })
})

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'
const right = document.querySelector('.right')

const vote = () => {
   for (i = 0; i < 20; i++) {
      const voteElement = document.getElementById(`gauge${i}`)
      const votegauge = voteElement.querySelector('div').textContent.replace(/\s+/g, '').split('%')[0]
      votegauge >= 70? voteElement.style.background = `conic-gradient(#0af15f 0% ${votegauge}%, #032909 ${votegauge}% 0%)` : votegauge >= 40? voteElement.style.background = `conic-gradient(yellow 0% ${votegauge}%, #032909 ${votegauge}% 0%)` : votegauge >= 0 ? voteElement.style.background = `conic-gradient(red 0% ${votegauge}%, #032909 ${votegauge}% 0%)` : 'none'
   }
}

const getPlayingPopularTvs = async (url) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results
      // popularity 내림차순으로 인기 높은순 정렬
      results.sort((a, b) => b.popularity - a.popularity)
      // console.log(results[3].id)

      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 5) {
         let rowHtml = `<div class="row">`

         for (let j = 0; j < 5; j++) {
            const index = i + j
            const detailUrl = `https://api.themoviedb.org/3/tv/${results[index].id}?language=ko-KR`

            if (index >= results.length) break

            const tvPop = results[index]
            const openDate = tvPop.first_air_date.split('-')
            const date = `${Number(openDate[1])}월 ${openDate[2]}, ${openDate[0]}`
            const resonpnes = await fetch(detailUrl, options2)
            const details = await resonpnes.json()
            console.log(tvPop.id)

            rowHtml += `
            <div class="row__index col-12 col-sm-6 col-md-6 col-lg-3">
               <div class="card">
                  <a class="card__poster" href="./pop_detail.html?series_id=${tvPop.id}">
                     <img src="https://image.tmdb.org/t/p/w300${tvPop.poster_path}" class="poster" alt="${tvPop.title}" />
                  </a>
                  <div class="card__info" style="position:relative;">
                     <div class="vote" id="gauge${index}">
                        <div class="vote_in">
                           ${(Math.ceil(details.vote_average * 10) / 10) * 10} <sup>%</sup>
                        </div>
                     </div>
                     <p class="info__text info__title">${tvPop.name}</p>
                     <p class="info__text info__date">${date}</p>
                  </div>
               </div>
            </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      right.innerHTML = rowsHtml


      await vote()
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}
getPlayingPopularTvs(url)

/* 
     let test = `<ul style="width:100%; background-color:red; display:flex; justify-content:center;flex-direction: column;align-items:center;">
      <li style="font-size:20px">
      테스트
      </li>
      <li style="font-size:20px">
      테스트
      </li>
      <li style="font-size:20px">
      테스트
      </li>
      <li style="font-size:20px">
      테스트
      </li>
      <li style="font-size:20px">
      테스트
      </li>
      <li style="font-size:20px">
      테스트
      </li>
      <li style="font-size:20px">
      테스트
      </li>
      </ul>`
 */
