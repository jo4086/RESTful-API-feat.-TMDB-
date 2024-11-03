// https://api.themoviedb.org/3/tv/{series_id}

const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDI3MjgxOS4wOTgzNTcyLCJzdWIiOiI2NzFhZTk0NzQ1NDJlMzcxZmUwYTZhZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1P7b2CLV4dp6Fml5OGVFCN_NLnwqovCZDY567Z_R_fM',
   },
}

// fetch('https://api.themoviedb.org/3/tv/124364/content_ratings', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// 'https://api.themoviedb.org/3/tv/series_id?language=ko-KR'

// fetch('https://api.themoviedb.org/3/tv/81329?language=ko-KR', options)
//    .then((res) => res.json())
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err))

const urlParams = new URLSearchParams(window.location.search)
const seriesId = urlParams.get('series_id')
// console.log(seriesId)

// 정보를 가져올 핵심 URL
const tvPopDetailUrl = `https://api.themoviedb.org/3/tv/${seriesId}?language=ko-KR`
const ratingUrl = `https://api.themoviedb.org/3/tv/${seriesId}}/content_ratings`
// console.log(popTvDetailUrl)
const getDetailPopTv = async (TvPopDetailUrl) => {
   try {
      const respones = await fetch(tvPopDetailUrl, options)
      const data = await respones.json()
      const release = new Date(data.first_air_date)
      const year = release.getFullYear()
      console.log(data)
      console.log(release)
      console.log(String(year))

      // console.log(TvPopDetailUrl)

      const rowHtml = `
         <div class="outline_1 row">
            <div class="poster col-sm-3">
               <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="${data.title} class="img" style="max-width:100%" />
            </div>
            <div class="overview col-sm-9">
               <h2>${data.title}<span>${year}</sapn></h2>
               <ul class="information">
                  <li><span class="rating"></span> ${data.genres.map((genre) => {
                     return genre.name
                  })} </li>
                   `

      await getRating(ratingUrl)
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}

const getRating = async (ratingUrl) => {
   try {
      const respones = await fetch(ratingUrl, options)
      const data = await respones.json()
      console.log(data)
      const results = data.results
      console.log(results)

      let rating = ''

      for (let i = 0; i < results.length; i++) {
         // console.log(results[i])
         // console.log(Object.keys(results[i]))
         // console.log(results[i].iso_3166_1)
         const country = results[i].iso_3166_1

         // switch (country) {
         //    case 'kr':
         //       rating = 'kr'
         //       break
         //    case 'us':
         //       rating = 'us'
         //       break
         //    default:
         //       rating = 'none'
         // }

         // if (country === 'KR') {
         //    rating = results[i].rating
         //    break
         // } else if (country === 'US') {
         //    rating = results[i].rating
         //    break
         // } else {
         //    rating = 'none'
         //    break
         // }
      }
      console.log(rating)
   } catch (error) {
      console.error('에러 발생', error)
   }
}

getDetailPopTv(tvPopDetailUrl)
