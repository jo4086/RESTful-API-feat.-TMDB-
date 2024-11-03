const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTcyOTgyNTUxOS4wNTI5MjksInN1YiI6IjY3MWFlOTQ3NDU0MmUzNzFmZTBhNmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l7xpbRkS6xjFmls9unXC7tEdZahQ4eiyYE22JoPU7HA',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'
const imgsq = document.querySelectorAll('.card-img-top.poster')

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

            let posterImg = !movie.poster_path ? `./images/No_poster.png` : `https://image.tmdb.org/t/p/w200${movie.poster_path}`

            rowHtml += `
                <div class="col-12 col-sm-6 col-md-6 col-lg-3 px-3 py-1 m-0">
                    <div class="card">
                      <a href="./detail.html?movie_id=${movie.id}">
                         <img src="${posterImg}" class="card-img-top poster" alt="${movie.title}" />
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
imgsq.forEach((e, i) => {
   const news = e.addEventListener
})

getPlayingMovies(url)
