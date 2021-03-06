
var posterDisplay = document.getElementById("DisplayPoster")

// //Initial set of arrays, to be added to later
var filmArray1 = [];
var filmArray2 = [];
var finalResults = [];
userResponse1 = ""
userResponse2 = ""


function checkFirstActor() {
    posterDisplay.innerHTML = ""
    filmArray1.length = 0
    filmArray2.length = 0
    finalResults.length = 0
//     //user responses, set as defined strings currently but will be set to take in values based on what the user types in
userResponse1 = document.querySelector('.EnterActor1').value

//     //inital fetch request for the first actor, retrieves Imdb ID data to then be used 
    fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse1 + "/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        }



    })
        .then(function (response) {
            return response.json();
        })
//         //taking that initial fetch, logging data as a variable and then passing it to the next fetch request
        .then(function (response) {
            var ActorID = response.Actors[0].imdb_id
            console.log(response)


            fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + ActorID + "/all_roles/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }


            })
                .then(response => {
                    return response.json();
                })
//                 //build an array from the desired data for the first actor, to be checked with the next array
                .then(function (response) {

                    for (var i = 0; i < response.Roles.movies.length; i++) {
                        if (filmArray1.includes(response.Roles.movies[i][0].title) === false) {
                            filmArray1.push(response.Roles.movies[i][0].title)
                            console.log(filmArray1)

                        }
                    }
                    checkSecondActor();
                })

                .catch(err => {
                    console.error(err);
                });

        })
        .catch(err => {
            console.error(err);

        });

    console.log(filmArray1)

}

function checkSecondActor() {
    finalResults.length = 0
    userResponse2 = document.querySelector('.EnterActor2').value

//     //Second series of fetch requests for the second entered actor
    fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse2 + "/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        }
    })
        .then(function (response) {
            return response.json();
        })

//         //same as the previous fetch request where we store the relevant data to then be used
        .then(function (response) {
            var ActorID = response.Actors[0].imdb_id
            console.log(response)


            fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + ActorID + "/all_roles/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }


            })
                .then(response => {
                    return response.json();
                })
//                 //build an array from the desired data for the second actor, to be checked with the first array
                .then(function (response) {
                    finalResults.length = 0


                    for (var i = 0; i < response.Roles.movies.length; i++) {
                        if (filmArray2.includes(response.Roles.movies[i][0].title) === false) {
                            filmArray2.push(response.Roles.movies[i][0].title)
                        }


                    }
//                     //pushes the films the two actors have in common to a new array
                    for (var j = 0; j < filmArray2.length; j++) {

                        if (filmArray1.includes(filmArray2[j])) {
                            finalResults.push(filmArray2[j])




                        }
                        else {
                            console.log("no match")
                        }
                    }

                    console.log(filmArray1)
                    console.log(filmArray2)
                    console.log(finalResults)


//                     //for loop to iterate through this created array and retrieve the poster data from a new API
                    for (i = 0; i < finalResults.length; i++) {

                        matchedMovie = finalResults[i]
                        fetch(
                            "http://www.omdbapi.com/?s=" + matchedMovie + "&apikey=d86e2804"
                        )
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (response) {
                                    
                                var poster = response.Search[0].Poster
                                var posterImg = document.createElement("img")
                                posterImg.setAttribute("src", poster)
                                posterDisplay.appendChild(posterImg)
                                console.log(poster)


                            });
                    };
                })

        })

        .catch(err => {
            console.error(err);
        });

} 

function getCastList() {

    userResonse3 = document.querySelector('.EnterFilm').value

    fetch(
        "http://www.omdbapi.com/?t=" + userResonse3 + "&apikey=d86e2804"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
})
}




document.getElementById("search").addEventListener("click", checkFirstActor)
document.getElementById("FilmSearch").addEventListener("click", getCastList)

