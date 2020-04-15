$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        var searchText = ($('#searchText').val());
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=15e133ea'+ '&s='+searchText)
    .then((response) => {
        console.log(response);
        var movies = response.data.Search;
        var output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-2">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>                
      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
                `;
        });

        $('#movies').html(output);
    });
    
    
};
