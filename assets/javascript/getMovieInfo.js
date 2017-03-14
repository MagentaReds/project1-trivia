function randomDate(start, end) {
  var date = +start + Math.floor(Math.random() * (end - start));
  return date;
}

function getMovieDetails(mYear) {
  // Constructing a URL to search 
  var year = mYear;
  movieYear = mYear;
  var x = 0;
  var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=1c916b5ee7a77ed6aa84e46c17622f72&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + year;
  //Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      //console.log(response);
      //Storing the data returned data from AJAX request
      var results = response.results;
      //generate random number to select random title from top 20 results
      var x = 1 + Math.floor(Math.random() * (20 - 1));
      //console log for testing
      //console.log("Random number " + x);
      movieTitle = (results[x].title);
      movieImg = (results[x].poster_path);
      movieImg = "https://image.tmdb.org/t/p/w500" + movieImg;

      //console log for testing
      //console.log("title " + movieTitle);
      //console.log("poster" + movieImg);
      getMoviePlot(movieTitle, results[x].release_date.substring(0, 4), false, true);
      main_game.jqReturnAnswer(movieTitle);
    });
}

function getMoviePlot(movieTitle, year, useFilm, useYear) {
  var queryTitle = movieTitle; //+ "_(film)";
  if (useYear)
    queryTitle += " (" + year + " film)";
  else if (useFilm)
    queryTitle += " (film)";
  console.log(queryTitle);

  var config = {
    action: "query",
    titles: queryTitle,
    prop: "revisions",
    rvprop: "content",
    format: "json"
  };

  $.ajax( {
    url: "https://en.wikipedia.org/w/api.php",
    jsonp: "callback", 
    dataType: 'jsonp', 
    data: config,
    xhrFields: { withCredentials: true },
    success: function(response) { 
      //console.log(response);
      var pages = response.query.pages
      var keys = Object.keys(pages);
      //console.log(keys);
      //if (keys[0]==="-1", then page was not found
      //if the next condition is true, then the reponse is a redirect and not the actual page we want
      if(keys[0]==="-1" || pages[keys[0]].revisions[0]['*'][0]==='#'){
        if(useYear)
          getMoviePlot(movieTitle, year, true, false);
        else if(!useYear && useFilm)
          getMoviePlot(movieTitle, year, false, false);
        else
          moviePlot = "No Wikipedia Entry";
      }
      else {
        var wikiText= pages[keys[0]].revisions[0]['*'];
        var object = wtf_wikipedia.parse(wikiText);
        //console.log(object);
        var plotObject = object.text.get("Plot");
        //console.log(plotObject);
        for (var i = 0; i < plotObject.length; i++) {
          moviePlot = moviePlot + "  " + plotObject[i].text;
        }

      }
    }
  });

}
