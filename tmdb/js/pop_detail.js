const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRkOWI5ZTUwZjA1MDg4OWU5OGU0Mzk4ODlkODNlMCIsIm5iZiI6MTczMDYyNjA5Ni43ODQ2NTY1LCJzdWIiOiI2NzFhZTk0NzQ1NDJlMzcxZmUwYTZhZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CUNvgsU23VuadAM1haNd4VYmaLm84LmnFqcC6K9rYIM'
    }
  };

const urlParams = new URLSearchParams(window.location.search)
console.log(urlParams)
const seriesId = urlParams.get('series_id')
console.log(seriesId)