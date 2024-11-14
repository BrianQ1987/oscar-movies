filter_btn = document.getElementById("filter-btn");
filter_menu = document.getElementById("filter-menu");
filter_items = filter_menu.getElementsByClassName("menu-item");

sort_btn = document.getElementById("sort-btn");
sort_menu = document.getElementById("sort-menu");

// Filter button
filter_btn.onclick = function() {

    sort_menu.style.display = "none";

    filter_btn.classList.add("clicked");
    sort_btn.classList.remove("clicked");

    if (filter_menu.style.display == "block") {
        filter_menu.style.display = "none";
    } else {
        filter_menu.style.display = "block";
    }

    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }
    
}

// Sort button
sort_btn.onclick = function() {

    filter_menu.style.display = "none";

    filter_btn.classList.remove("clicked");
    sort_btn.classList.add("clicked");

    if (sort_menu.style.display == "block") {
        sort_menu.style.display = "none";
    } else {
        sort_menu.style.display = "block";
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

    showing.innerHTML = "Displaying <strong>" + Object.keys(movies).length + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies"

}

filter_show_all.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }
}

// Filter on duration
filter_duration = document.getElementById("filter-duration");

filter_duration.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    dur_div = document.createElement("div");
    dur_div.id = "duration-filters";

    durations = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        durations.push(movies[Object.keys(movies)[i]].duration);
    }

    max_length = Math.ceil(Math.max(...durations) / 30) * 30;

    for (let i = 30; i <= max_length; i ++) {

        if (i % 30 == 0) {

            d_div = document.createElement("div");
            d_div.classList.add("menu-item");

            if (i == 30) {
                d_div.textContent = "Under 30 mins";
            } else if (i == 60) {
                d_div.textContent = "Under 1 hour";
            } else if (i == 90) {
                d_div.textContent = "Under 1 hour 30 mins";
            } else if (i % 60 == 0) {
                d_div.textContent = "Under " + (i / 60) + " hours";
            } else {
                d_div.textContent = "Under " + ((i - 30) / 60) + " hours 30 mins"
            }

            dur_div.appendChild(d_div);

            d_div.onclick = function () {

                filter_menu.removeChild(dur_div);

                for (let i = 0; i < filter_items.length; i ++) {
                    filter_items[i].classList.remove("clicked")
                }
            
                filter_duration.classList.add("clicked");

                let count = 0;

                for (let j = 0; j < Object.keys(movies).length; j ++) {

                    movie = movies[Object.keys(movies)[j]];                
                    
                    if (movie.duration > i) {
                        document.getElementById(movie.id).style.display = "none";
                    } else {
                        document.getElementById(movie.id).style.display = "flex";
                        count += 1;
                    }
            
                }

                showing.innerHTML = "Displaying movies with a duration of <strong>"+ i + "</strong> minutes or shorter (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

                filter_menu.style.display = "none";
                filter_btn.classList.remove("clicked");
            }

        }
    }

    filter_menu.appendChild(dur_div);

}

// Filter on release date
filter_release = document.getElementById("filter-release");

filter_release.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    rel_div = document.createElement("div");
    rel_div.id = "release-filters";

    decades = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        if (movies[Object.keys(movies)[i]].released != "") {
            decades.push(movies[Object.keys(movies)[i]].released[0].slice(0, 3));
        }
    }

    first_decade = Math.min(...decades);
    last_decade = Math.max(...decades);

    for (let i = first_decade; i <= last_decade; i ++) {

        d_div = document.createElement("div");
        d_div.classList.add("menu-item");
        d_div.textContent = i + "0s";
        rel_div.appendChild(d_div);

        d_div.onclick = function () {

            filter_menu.removeChild(rel_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_release.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];                
                
                if (movie.released.slice(0, 3) != i) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            showing.innerHTML = "Displaying movies that were released in the <strong>"+ i + "0s</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");
        }


    }

    filter_menu.appendChild(rel_div);
}

// Filter on added year
filter_added = document.getElementById("filter-added");

filter_added.onmouseover = function() {
    
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "added-filters";

    for (let i = 2020; i <= current_year; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.textContent = "Added in " + i;
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_added.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];                
                
                if (movie.added != i) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            showing.innerHTML = "Displaying movies first added in <strong>"+ i + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");
        }
    }

    filter_menu.appendChild(years_div);

}

// Filter on watched
filter_watched = document.getElementById("filter-watched");

filter_watched.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "watched-filters";

    for (let i = 2020; i <= current_year; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.textContent = "Watched in " + i;
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_watched.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];
                
                if (!movie.watched.includes(i) || movie.watched.length == 0) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            showing.innerHTML = "Displaying movies watched in <strong>"+ i + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

            filter_menu.style.display = "none";
            filter_btn.classList.remove("clicked");
        }
    }

    filter_menu.appendChild(years_div);
}


// Filter on last watched
filter_last = document.getElementById("filter-last");

filter_last.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "last-filters";

    for (let i = 2020; i <= current_year; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
        year_div.textContent = "Last watched in " + i;
        years_div.appendChild(year_div);

        year_div.onclick = function() {

            filter_menu.removeChild(years_div);

            for (let i = 0; i < filter_items.length; i ++) {
                filter_items[i].classList.remove("clicked")
            }
        
            filter_last.classList.add("clicked");

            let count = 0;

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];
                
                last_watched = movie.watched[movie.watched.length - 1];
                
                if (last_watched != i || movie.watched.length == 0) {
                    document.getElementById(movie.id).style.display = "none";
                } else {
                    document.getElementById(movie.id).style.display = "flex";
                    count += 1;
                }
        
            }

            showing.innerHTML = "Displaying movies last watched in <strong>"+ i + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)";

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
        
        if (movie.watched.length != 0) {
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


}

filter_no_watch.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }
}

// Filter on platform
filter_platform = document.getElementById("filter-platform");

filter_platform.onmouseover = function () {
    if (document.getElementById("added-filters")) {
        filter_menu.removeChild(document.getElementById("added-filters"))
    }

    if (document.getElementById("watched-filters")) {
        filter_menu.removeChild(document.getElementById("watched-filters"))
    }

    if (document.getElementById("last-filters")) {
        filter_menu.removeChild(document.getElementById("last-filters"))
    }

    if (document.getElementById("duration-filters")) {
        filter_menu.removeChild(document.getElementById("duration-filters"))
    }

    if (document.getElementById("release-filters")) {
        filter_menu.removeChild(document.getElementById("release-filters"))
    }

    if (document.getElementById("platform-filters")) {
        filter_menu.removeChild(document.getElementById("platform-filters"))
    }

    years_div = document.createElement("div");
    years_div.id = "platform-filters";

    platforms = ["Plex", "Amazon Prime Video", "Netflix", "ITVX", "Disney Plus", "Apple TV Plus", 
        "Channel 4", "Paramount Plus", "BBC iPlayer", "My5", "Freevee"];

    platforms.push("Not available")

    for (let i = 0; i < platforms.length; i ++) {
        year_div = document.createElement("div");
        year_div.classList.add("menu-item");
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

//Sort by Released date
sort_release = document.getElementById("sort-release");

sort_release.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_release.classList.add("clicked");

    sort_menu.style.display = "none";

    let dates = [];

    for (let i = 0; i < Object.keys(movies).length; i ++) {
        dates.push(movies[Object.keys(movies)[i]].released);
    }    

    dates = [...new Set(dates)];
    dates = dates.sort();

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 0; j < dates.length; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.released == dates[j]) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from newest to oldest release date."

}

//Sort by date added
sort_added = document.getElementById("sort-added");

sort_added.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_added.classList.add("clicked");

    sort_menu.style.display = "none";

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 2020; j <= current_year; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.added == j) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from newest to oldest date added."

}

//Sort by last watched
sort_watched = document.getElementById("sort-watched");

sort_watched.onclick = function() {

    sort_items = sort_menu.getElementsByClassName("menu-item");
    for (let i = 0; i < sort_items.length; i ++) {
        sort_items[i].classList.remove("clicked")
    }

    sort_watched.classList.add("clicked");

    sort_menu.style.display = "none";

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 2020; j <= current_year; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            last_watched = movie.watched[movie.watched.length - 1];

            if (last_watched == j) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted by most recently watched."

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
        scores.push(movies[Object.keys(movies)[i]].imdb);
    }    

    scores = [...new Set(scores)];
    scores = scores.sort();

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 0; j < scores.length; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.imdb == scores[j]) {
                moviesDiv.insertBefore(document.getElementById(movie.id), document.getElementById(first));
                first = movie.id;
            }

        }

    }

    sorting.innerHTML = "sorted from highest to lowest IMDb score."

}

//Sort by IMDb score
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

        let rt_value = movies[Object.keys(movies)[i]].rt;
        rt_value = rt_value.slice(0, rt_value.indexOf("%"));

        scores.push(rt_value);
    }    

    scores = [...new Set(scores)];
    scores = scores.sort((a, b) => a - b);

    first = moviesDiv.getElementsByClassName("poster")[0].id;
    
    for (let j = 0; j < scores.length; j ++) {

        for (let i = 0; i < Object.keys(movies).length; i ++) {
        
            movie = movies[Object.keys(movies)[i]];        

            if (movie.rt == scores[j] + "%") {
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
