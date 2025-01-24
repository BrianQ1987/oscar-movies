filter_btn = document.getElementById("filter-btn");
filter_menu = document.getElementById("filter-menu");
filter_items = filter_menu.getElementsByClassName("menu-item");

sort_btn = document.getElementById("sort-btn");
sort_menu = document.getElementById("sort-menu");

// Filter button
filter_btn.onclick = function(event) {

    event.stopPropagation();

    sort_menu.style.display = "none";

    filter_btn.classList.add("clicked");
    sort_btn.classList.remove("clicked");

    if (filter_menu.style.display == "block") {
        filter_menu.style.display = "none";
    } else {
        filter_menu.style.display = "block";
    }

    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("genre-filters")) {
        filter_menu.removeChild(document.getElementById("genre-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    // Add a click listener to the document to close the menu
    document.addEventListener("click", closeFilterMenu);
    
}

function closeFilterMenu(event) {
    // Check if the click occurred outside the filter_menu
    if (!filter_menu.contains(event.target) && event.target !== filter_btn) {
        filter_menu.style.display = "none";
        filter_btn.classList.remove("clicked");

        // Remove the event listener to avoid multiple bindings
        document.removeEventListener("click", closeFilterMenu);
    }
}

// Sort button
sort_btn.onclick = function(event) {

    event.stopPropagation();

    filter_menu.style.display = "none";

    filter_btn.classList.remove("clicked");
    sort_btn.classList.add("clicked");

    if (sort_menu.style.display == "block") {
        sort_menu.style.display = "none";
    } else {
        sort_menu.style.display = "block";
    }
    
    // Add a click listener to the document to close the menu
    document.addEventListener("click", closeSortMenu);
}

function closeSortMenu(event) {
    // Check if the click occurred outside the filter_menu
    if (!sort_menu.contains(event.target) && event.target !== sort_btn) {
        sort_menu.style.display = "none";
        sort_btn.classList.remove("clicked");

        // Remove the event listener to avoid multiple bindings
        document.removeEventListener("click", closeSortMenu);
    }
}

// Show all films
filter_show_all = document.getElementById("filter-show-all");

filter_show_all.onclick = function () {

    filter_menu.style.display = "none";
    filter_btn.classList.remove("clicked");

    for (let i = 0; i < Object.keys(movies).length; i ++) {

        movie = movies[Object.keys(movies)[i]];
        
        document.getElementById(movie.id).style.display = "flex";

    }

    for (let i = 0; i < filter_items.length; i ++) {
        filter_items[i].classList.remove("clicked")
    }

    filter_show_all.classList.add("clicked");

    showing.innerHTML = "Displaying <strong>" + Object.keys(movies).length + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies";

    movie_divs = document.getElementsByClassName("year-movies");
    headings = document.getElementsByClassName("year-heading");
    for (let j = 0; j < movie_divs.length; j ++) {
        movie_divs[j].style.display = "flex";
        headings[j].style.display = "flex";
    }

}

filter_show_all.onmouseover = function () {
    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    document.getElementById("duration-filters").style.display = "none";

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }
}

// Filter on duration
filter_duration = document.getElementById("filter-duration");

filter_duration.onmouseover = function () {

    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("genre-filters")) {
        filter_menu.removeChild(document.getElementById("genre-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    dur_div = document.getElementById("duration-filters");
    dur_div.style.display = "block";
    //dur_div.id = "duration-filters";

    durations = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        durations.push(movies[Object.keys(movies)[i]].duration);
    }

    max_length = Math.max(...durations);    
    min_length = Math.min(...durations);    

    let slider = document.getElementById("myRange");
    slider.min = min_length;
    slider.max = max_length;
    slider.value = max_length;

    let output = document.getElementById("demo");
    output.innerHTML = slider.value + " minutes"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value + " minutes";

        for (let i = 0; i < filter_items.length; i ++) {
            filter_items[i].classList.remove("clicked")
        }

        filter_duration.classList.add("clicked");

        let count = 0;

        for (let i = 0; i < Object.keys(movies).length; i ++) {

            movie = movies[Object.keys(movies)[i]];
            
            if (movie.duration > this.value) {
                document.getElementById(movie.id).style.display = "none";
            } else {
                document.getElementById(movie.id).style.display = "flex";
                count += 1;
            }
    
        }

        showing.innerHTML = "Displaying movies with a duration of <strong>"+ this.value + "</strong> minutes or shorter (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

        const value = (this.value - this.min) / (this.max - this.min) * 100; // Normalize value to 0-100%
        this.style.setProperty('--value', `${value}%`);
    }

    document.getElementById("ok").onclick = function () {
        filter_menu.style.display = "none";
        movie_divs = document.getElementsByClassName("year-movies");
        headings = document.getElementsByClassName("year-heading");
        for (let j = 0; j < movie_divs.length; j ++) {
            movie_divs[j].style.display = "flex";
            headings[j].style.display = "flex";
        }
    }

}



// Filter on nominated year
filter_nominated = document.getElementById("filter-nominated");

filter_nominated.onmouseover = function() {
    
    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    document.getElementById("duration-filters").style.display = "none";

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("genre-filters")) {
        filter_menu.removeChild(document.getElementById("genre-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "nominated-filters";

    for (let i = 2022; i <= current_year; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.textContent = "Nominated in " + i;
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_nominated.classList.add("clicked");

            for (let j = 0; j < Object.keys(movies).length; j ++) {
                movie = movies[Object.keys(movies)[j]];
                document.getElementById(movie.id).style.display = "flex";
            }

            movie_divs = document.getElementsByClassName("year-movies");
            headings = document.getElementsByClassName("year-heading");

            for (let j = 0; j < movie_divs.length; j ++) {
                if (movie_divs[j].id != i + "-movies") {
                    movie_divs[j].style.display = "none";
                    headings[j].style.display = "none";
                } else {
                    movie_divs[j].style.display = "flex";
                    headings[j].style.display = "flex";
                    count = movie_divs[j].getElementsByTagName("div").length / 2;
                }
            }


            showing.innerHTML = "Displaying movies nominated in <strong>"+ i + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");
        }
    }

    filter_menu.appendChild(years_div);

}




// Filter on never watched
filter_no_watch = document.getElementById("filter-no-watch");

filter_no_watch.onclick = function () {

    filter_menu.style.display = "none";
    filter_btn.classList.remove("clicked");

    let count = 0;

    for (let i = 0; i < Object.keys(movies).length; i ++) {

        movie = movies[Object.keys(movies)[i]];

        if (movie.watched) {
            document.getElementById(movie.id).style.display = "none";
        } else {
            document.getElementById(movie.id).style.display = "flex";
            count += 1;
        }

    }

    for (let i = 0; i < filter_items.length; i ++) {
        filter_items[i].classList.remove("clicked")
    }

    filter_no_watch.classList.add("clicked");

    showing.innerHTML = "Displaying movies that have never been watched (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)"

    movie_divs = document.getElementsByClassName("year-movies");
    headings = document.getElementsByClassName("year-heading");
    for (let j = 0; j < movie_divs.length; j ++) {
        movie_divs[j].style.display = "flex";
        headings[j].style.display = "flex";
    }

}

filter_no_watch.onmouseover = function () {
    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    document.getElementById("duration-filters").style.display = "none";

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("genre-filters")) {
        filter_menu.removeChild(document.getElementById("genre-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }
}

// Filter on platform
filter_platform = document.getElementById("filter-platform");

filter_platform.onmouseover = function () {
    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    document.getElementById("duration-filters").style.display = "none";

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("genre-filters")) {
        filter_menu.removeChild(document.getElementById("genre-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "platform-filters";

    platforms = ["Plex", "Amazon Prime Video", "Netflix", "ITVX", "Disney Plus", "Apple TV Plus", 
        "Channel 4", "Paramount Plus", "BBC iPlayer", "My5", "Freevee"];

    platforms.push("Not available")

    for (let i = 0; i < platforms.length; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.style.width = "220px";
        year_div.textContent = platforms[i];
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_platform.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];

                if (!movie.hasOwnProperty("platforms")) {
                    movie.platforms = "Not available";
                }
                
                if (!movie.platforms.includes(platforms[i])) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            if (platforms[i] == "Not available") {
                showing.innerHTML = "Displaying movies that are <strong>not available</strong> on any platform (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";
            } else {
                showing.innerHTML = "Displaying movies available on <strong>"+ platforms[i] + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";
            }

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");

            movie_divs = document.getElementsByClassName("year-movies");
            headings = document.getElementsByClassName("year-heading");
            for (let j = 0; j < movie_divs.length; j ++) {
                movie_divs[j].style.display = "flex";
                headings[j].style.display = "flex";
            }
        }
    }

    filter_menu.appendChild(years_div);
}

// Filter on genre
filter_genre = document.getElementById("filter-genre");

filter_genre.onmouseover = function () {
    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    document.getElementById("duration-filters").style.display = "none";

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("genre-filters")) {
        filter_menu.removeChild(document.getElementById("genre-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "genre-filters";

    genres = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {

        let movie_genres = movies[Object.keys(movies)[i]].genres;

        if (!Array.isArray(movie_genres)) {
            movie_genres = [movie_genres];
        }

        for (let j = 0; j < movie_genres.length; j ++) {
            if (!genres.includes(movie_genres[j])) {
                genres.push(movie_genres[j])
            }
        }        

    }

    genres.sort()

    for (let i = 0; i < genres.length; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.style.width = "220px";
        year_div.textContent = genres[i];
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_genre.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];
                
                if (!movie.genres.includes(genres[i])) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            showing.innerHTML = "Displaying <strong>"+ genres[i] + "</strong> movies (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";       

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");

            movie_divs = document.getElementsByClassName("year-movies");
            headings = document.getElementsByClassName("year-heading");
            for (let j = 0; j < movie_divs.length; j ++) {
                movie_divs[j].style.display = "flex";
                headings[j].style.display = "flex";
            }
        }
    }

    filter_menu.appendChild(years_div);
}

// Filter on categories
filter_categories = document.getElementById("filter-categories");

filter_categories.onmouseover = function () {
    if (document.getElementById("nominated-filters")) {
        filter_menu.removeChild(document.getElementById("nominated-filters"))
    }

    document.getElementById("duration-filters").style.display = "none";

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    if (document.getElementById("categories-filters")) {
        filter_menu.removeChild(document.getElementById("categories-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "categories-filters";

    categories = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {

        let movie_categories = movies[Object.keys(movies)[i]].categories;

        if (!Array.isArray(movie_categories)) {
            movie_categories = [movie_categories];
        }

        for (let j = 0; j < movie_categories.length; j ++) {
            if (!categories.includes(movie_categories[j])) {
                categories.push(movie_categories[j])
            }
        }        

    }

    categories.sort()

    for (let i = 0; i < categories.length; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.style.width = "220px";
        year_div.textContent = categories[i];
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_categories.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];
                
                if (!movie.categories.includes(categories[i])) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            showing.innerHTML = "Displaying movies nominated for <strong>"+ categories[i] + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";       

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");
        }
    }

    filter_menu.appendChild(years_div);
}

// Sorting
sort_az = document.getElementById("sort-az");

sort_az.onclick = function () {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_az.classList.add("clicked");

    sort_menu.style.display = "none";

    first = moviesDiv.getElementsByClassName("poster")[0].id;

    for (let i = Object.keys(movies).length - 1; i >= 0 ; i --) {
        
        movie = movies[Object.keys(movies)[i]];        
        
        moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
        first = movie.id;
        
    }

    sorting.innerHTML = "";

}

//Sort by Duration
sort_duration = document.getElementById("sort-duration");

sort_duration.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_duration.classList.add("clicked");

    sort_menu.style.display = "none";

    let durations = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        durations.push(movies[Object.keys(movies)[i]].duration);
    }    

    durations = [...new Set(durations)];
    durations = durations.sort((a, b) => b - a);

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 0; j < durations.length; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.duration == durations[j]) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from shortest to longest duration."

}

//Sort by date nominated
sort_nominated = document.getElementById("sort-nominated");

sort_nominated.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_nominated.classList.add("clicked");

    sort_menu.style.display = "none";

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 2020; j <= current_year; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.nominated == j) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from newest to oldest date nominated."

}

//Sort by IMDb score
sort_imdb = document.getElementById("sort-imdb");

sort_imdb.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_imdb.classList.add("clicked");

    sort_menu.style.display = "none";

    let scores = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        if (movies[Object.keys(movies)[i]].hasOwnProperty("imdb_score")) {
            scores.push(movies[Object.keys(movies)[i]].imdb_score);
        } else {
            scores.push("0/10")
        }
    }    

    scores = [...new Set(scores)];
    scores = scores.sort();

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 0; j < scores.length; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.imdb_score == scores[j]) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from highest to lowest IMDb score."

}

//Sort by Rotten Tomatoes score
sort_rt = document.getElementById("sort-rt");

sort_rt.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_rt.classList.add("clicked");

    sort_menu.style.display = "none";

    let scores = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {

        let rt_value = "";

        if (movies[Object.keys(movies)[i]].hasOwnProperty("rt_score")) {

            rt_value = movies[Object.keys(movies)[i]].rt_score;
            rt_value = rt_value.slice(0, rt_value.indexOf("%"));

        } else {
            rt_value = "0";
        }

        

        scores.push(rt_value);
    }    

    scores = [...new Set(scores)];
    scores = scores.sort((a, b) => a - b);

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 0; j < scores.length; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.rt_score == scores[j] + "%") {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from highest to lowest Rotten Tomatoes score."

}

random_btn = document.getElementById("random-btn");

random_btn.onclick = function() {

    let ids = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        ids.push(movies[Object.keys(movies)[i]].id);
    }

    let randomMovie = ids[Math.floor(Math.random() * ids.length)];

    document.getElementById(randomMovie).click();

}
