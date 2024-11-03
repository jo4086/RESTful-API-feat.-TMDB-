const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDA3NjA5Mi45MzE5NzksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zc24yS96Ag4F5c_wxry_xe0KnNsI0_1NTdqMs6_CulY',
   },
}

// fetch('https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1', options)
//    .then((res) => res.json())
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err))

/* 
  <a id="set" target="_blank">shinyks.com</a>

  <button onclick="demo()">Set Attribute</button>

  <script>
    function demo() {
      document.getElementById("set").setAttribute("href", "https://shinyks.com");
      document.getElementById("set").style.color = "red";
    }
  </script> */

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

const getPlayingPopularTvs = async (url) => {
   try {
      const respones = await fetch(url, options)
      const data = await respones.json()
      const results = data.results
      console.log(data)
      // popularity 내림차순으로 인기 높은순 정렬
      results.sort((a, b) => b.popularity - a.popularity)
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = `<div>hi</div>`
         console.log(rowHtml)
         rowsHtml += rowHtml
      }

      for (let i = 0; i < results.length; i++) {
         // console.group(i)
         // console.log('인기도: ',data.results[i].popularity,'제목: ',data.results[i].name)
         // console.groupEnd()
      }
      console.log(data.results)
      // rowsHtml += rowHtml
      right.innerHTML += rowsHtml
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
