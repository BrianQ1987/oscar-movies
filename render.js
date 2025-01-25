const moviesDiv = document.getElementById("movies");
buttons = document.getElementById("buttons");
button_load = document.getElementById("button-load");
showing = document.getElementById("showing");
back_btn = document.getElementById("back-btn");
next_btn = document.getElementById("next-btn");
prev_btn = document.getElementById("prev-btn");
back_link = document.getElementById("back-link");
sorting = document.getElementById("sorting");
can = document.getElementById("can");
// sort_menu = document.getElementById("sort-menu");
filter_menu = document.getElementById("filter-menu");
back_to_start = document.getElementById("back-to-start");

let movies = [];
let current_year = 2020;


let load_pct = 0;

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        load_pct += 1;
        can.style.clipPath = `polygon(0% 0%, ${load_pct}% 0%, ${load_pct}% 100%, 0% 100%)`;
    }, i * 10);
}

async function renderMovies() {

    try {
        const response = await fetch("movies_full.json");
        const responseData = await response.json();
        movies = responseData;
    } catch (error) {
        
    }

    let year_nominated = [];
    
    for (let i = 0; i < Object.keys(movies).length; i ++) {

        let movie = movies[Object.keys(movies)[i]];

        if (!year_nominated.includes(movie.nominated)) {
            year_nominated.push(movie.nominated);
        }

    }

    year_nominated.sort();

    current_year = Math.max(...year_nominated);

    for (let i = 0; i < year_nominated.length; i ++) {
        year_div = document.createElement("div");
        year_div.id = year_nominated[i] + "-movies";
        year_div.classList.add("row")
        year_div.classList.add("no-gutters");
        year_div.classList.add("year-movies");
        year_div.style.display = "flex";

        let total_watched = 0;
        let total_movies = 0;

        for (let j = 0; j < Object.keys(movies).length; j ++) {
            let watched = movies[Object.keys(movies)[j]].watched;
            let nominated = movies[Object.keys(movies)[j]].nominated;

            if (nominated == year_nominated[i]) {
                total_movies += 1;
            }
            if (nominated == year_nominated[i] & watched) {
                total_watched += 1;
            }
        }

        let pct_watched = Math.round(total_watched / total_movies * 100);

        moviesDiv.innerHTML += `<p class = "year-heading">${year_nominated[i]}<span class = 'year-watched'> - ${total_watched}/${total_movies} watched (${pct_watched}%)</span></p>`;
        moviesDiv.appendChild(year_div);
    }

    for (let i = 0; i < Object.keys(movies).length; i ++) {

        let movie = movies[Object.keys(movies)[i]];
        let id = movie.id;

        let poster_div = document.createElement("div");
        poster_div.classList.add("col-4");
        poster_div.classList.add("col-lg-3");
        poster_div.classList.add("col-xl-2");
        poster_div.classList.add("p-1");
        poster_div.classList.add("poster")
        poster_div.id = id;        

        document.getElementById(movie.nominated + "-movies").appendChild(poster_div);

        title_div = document.createElement("div");
        title_div.classList.add("poster-title");
        title_div.id = id + "-title";
        if (movie.watched) {
            title_div.innerHTML = "Watched";
            poster_div.innerHTML = `<img src="${movie.poster_path}" class="img-fluid" ></img>`;
        } else {
            title_div.innerHTML = "Not watched";
            title_div.classList.add("unwatched");
            poster_div.innerHTML = `<img src="${movie.poster_path}" class="img-fluid unwatched" ></img>`;
        }     


        poster_div.appendChild(title_div);

        poster_div.onclick = function() {

            document.getElementById("top").scrollIntoView({ behavior: "smooth" });

            moviesDiv.style.display = "none";
            back_btn.style.display = "block";
            next_btn.style.display = "block";
            prev_btn.style.display = "block";

            back_btn.onclick = function() {
                moviesDiv.style.display = "flex";
                
                infos = document.getElementsByClassName("info");
            
                for (let i = 0; i < infos.length; i ++) {
                    infos[i].style.display = "none";
                }
            
                back_btn.style.display = "none";
                buttons.style.display = "flex";
                showing.removeAttribute("style");
                sorting.removeAttribute("style");
            
                if ([...filter_show_all.classList].includes("clicked")) {
                    filter_show_all.click();
                }
            
                document.getElementById(movie.id).scrollIntoView({ behavior: "smooth"});
            
            }

            buttons.style.display = "none";
            showing.style.display = "none";
            sorting.style.display = "none";
            // sort_menu.style.display = "none";
            filter_menu.style.display = "none";
            document.getElementById("movie-info").style.display = "flex";

            document.getElementById("info-title").innerHTML = `${movie.title} <span style = "font-size: 12pt;">(${movie.released.slice(0, 4)})</span>`;
            document.getElementById("info-poster").innerHTML = '<img src="' + movie.poster_path + '" class = "img-fluid">'

            duration = Math.floor(movie.duration / 60) + "h " + movie.duration % 60 + "m";

            document.getElementById("duration").textContent = duration;

            let ratings_div = document.getElementById("info-ratings");

            ratings_div.style.paddingLeft = (ratings_div.clientWidth - 280) / 2 + "px";

            while (ratings_div.firstChild) {
                ratings_div.removeChild(ratings_div.firstChild)
            }

            colours = ["#DC1E33", "#Bd4b1a", "#046852", "#1C4F90", "#5C2B85"];
            
            function draw_pie (site_score, title) {

                let score = movie[site_score];

                let pie = document.createElement("div");
                pie.classList.add("pie");
                pie.classList.add("pie1");

                let num;
                let scale;

                if (score.indexOf("%") > -1) {
                    num = score.slice(0, score.indexOf("%"));
                    scale = 100;
                } else if (score.indexOf("/100") > -1) {
                    num = score.slice(0, score.indexOf("/"));
                    score = num + "%";
                    scale = 100;
                } else if (score.indexOf("/10") > -1) {
                    num = score.slice(0, score.indexOf("/"));
                    scale = 10;
                } else {
                    num = score;
                    scale = 10;
                    score = Math.round(num * 10) + "%";
                }

                

                if (num < scale / 2) {
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(num / scale * 4)] + '; transform: rotate(' + (num / scale * 360) + 'deg);"></div>';
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(num / scale * 4)] + ';"></div>';
                } else {
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(num / scale * 4)] + '; transform: rotate(' + (num / scale * 360) + 'deg);"></div>';
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(num / scale * 4)] + ';"></div>';
                }

                pie.innerHTML =  '<div class="outer-right mask">' +
                                inner_right +
                                '</div>' +
                                '<div class="outer-left mask">' +
                                inner_left +
                                '</div>' +
                                '<div class="content">' +
                                '<span>' + score + '</span>' +
                                '</div>' +
                                '<div class="title">' + title + '</div>';

                ratings_div.appendChild(pie);
                
            }


            if (movie.hasOwnProperty("imdb_score")) {
                draw_pie("imdb_score", "IMDb");              
            }

            
            if (movie.hasOwnProperty("rt_score")) {
                draw_pie("rt_score", "Rotten Tomatoes");
            }

            if (movie.hasOwnProperty("meta_score")) {
                draw_pie("meta_score", "Metacritic");
            }

            draw_pie("vote_average", "TMDB")

            document.getElementById("nominated-year").textContent = movie.nominated;

            watched_div = document.getElementById("info-watched");

            if (movie.watched) {
                emoji = "🌟"
            } else {
                emoji = "❌"
            }
            watched_div.innerHTML = "<div style = 'font-size: 16pt'>🍿 Watched:" + emoji + "</div>"

            let info_categories = document.getElementById("info-categories");

            while (info_categories.firstChild) {
                info_categories.removeChild(info_categories.firstChild)
            }

            if (!Array.isArray(movie.categories)) {
                movie.categories = [movie.categories]
            }

            for (let j = 0; j < movie.categories.length; j ++) {
                category = movie.categories[j]
                if (category == "Best Picture" | category.indexOf("Feature") > - 1) {
                    emoji = "🎥"
                } else if (category.indexOf("Act") > -1) {
                    emoji = "🎭"
                } else if (category.indexOf("Screenplay") > -1) {
                    emoji = "📝"
                } else if (category == "Best Director") {
                    emoji = "🎬"
                }
                info_categories.innerHTML += '<div>' + emoji + ' ' + category + '</div>'
            }
            
            platform_div = document.getElementById("info-platforms");

            while (platform_div.firstChild) {
                platform_div.removeChild(platform_div.firstChild)
            }

            if (movie.hasOwnProperty("platforms")) {
                if (Array.isArray(movie.platforms)) {
                    for (let j = 0; j < movie.platforms.length; j ++) {
                        logo = "https://image.tmdb.org/t/p/original" + movie.logo_paths[j];
                        platform_div.innerHTML += "<div><img class = 'tv-logo' src = '" + logo + "'>" + movie.platforms[j] + "</div>"
                    }
                } else {
                    logo = "https://image.tmdb.org/t/p/original" + movie.logo_paths;
                    platform_div.innerHTML += "<div><img class = 'tv-logo' src = '" + logo + "'>" + movie.platforms + "</div>"
                }
                document.getElementById("watch-it-on").innerHTML = "📺 Watch it on:";
                document.getElementById("watch-it-on").removeAttribute("style");
            } else {
                document.getElementById("watch-it-on").innerHTML = "Not available to watch 📵";
                document.getElementById("watch-it-on").style.paddingLeft = "12px";
            }

            document.getElementById("info-plot").textContent = movie.overview;

            
                
            if (movie.genres.length > 1) {
                document.getElementById("genre-heading").innerHTML = "🎭 Genres";
            } else {
                document.getElementById("genre-heading").innerHTML = "🎭 Genre";
            }

            let genre_text = "";

            for (let j = 0; j < movie.genres.length; j ++) {
                genre_text += movie.genres[j] + "; ";
                
                if (j == movie.genres.length - 1) {
                    genre_text = genre_text.slice(0, -2);
                }
            }

            document.getElementById("info-genres").textContent = genre_text;

            if (Array.isArray(movie.director)) {
                director = movie.director
            } else {
                director = [movie.director]
            }
                
            if (director.length == 1) {
                document.getElementById("director-heading").textContent = "🎬 Director";
                document.getElementById("info-director").textContent = director;
            } else if (director.length > 1) {
                document.getElementById("director-heading").textContent = "🎬 Directors";
                let director_text = "";
                for (let j = 0; j < director.length; j ++) {
                    director_text += director[j] + ", ";
                }
                director_text = director_text.slice(0, -2);
                document.getElementById("info-director").textContent = director_text;
            }

            actors = document.getElementById("info-cast");
        
            while (actors.firstChild) {
                actors.removeChild(actors.firstChild)
            }

            if (Object.keys(movie.cast).length < 6) {
                for (let j = 0; j < Object.keys(movie.cast).length; j ++) {
                    actors.innerHTML += "<div id = '" + movie.cast[Object.keys(movie.cast)[j]].id + "' class = 'col-4 col-lg-3 col-xl-2 cast'><img src = '" + movie.cast[Object.keys(movie.cast)[j]].profile_path + "' class = 'img-fluid'><div style = 'font-size: 14pt; font-weight: bold;'>" + Object.keys(movie.cast)[j] + "</div><div>" + movie.cast[Object.keys(movie.cast)[j]].character + "</div></div>";
                }   
            } else {
                for (let j = 0; j < 6; j ++) {
                    actors.innerHTML += "<div id = '" + movie.cast[Object.keys(movie.cast)[j]].id + "' class = 'col-4 col-lg-3 col-xl-2 cast'><img src = '" + movie.cast[Object.keys(movie.cast)[j]].profile_path + "' class = 'img-fluid'><div style = 'font-size: 14pt; font-weight: bold;'>" + Object.keys(movie.cast)[j] + "</div><div>" + movie.cast[Object.keys(movie.cast)[j]].character + "</div></div>";
                }
                actors.innerHTML += "<div id = 'see-more'>See more cast <i class='fa-solid fa-user-plus'></i></div>";

                document.getElementById("see-more").onclick = function() {

                    document.getElementById("see-more").style.display = "none";
                    
                    for (let j = 6; j < Object.keys(movie.cast).length; j ++) {
                        actors.innerHTML += "<div id = '" + movie.cast[Object.keys(movie.cast)[j]].id + "' class = 'col-4 col-lg-3 col-xl-2 cast'><img src = '" + movie.cast[Object.keys(movie.cast)[j]].profile_path + "' class = 'img-fluid'><div style = 'font-size: 14pt; font-weight: bold;'>" + Object.keys(movie.cast)[j] + "</div><div>" + movie.cast[Object.keys(movie.cast)[j]].character + "</div></div>";
                    }
    
                    castLinks();
                }  
                
            }

            castLinks();

                      
            
            if (i == Object.keys(movies).length - 1) {
                next_btn.style.display = "none";
            } else {
                let next_id  = movies[Object.keys(movies)[i + 1]].id;

                next_btn.onclick = function() {
                    document.getElementById(next_id).click()
                }
            }

            if (i == 0) {
                prev_btn.style.display = "none";
            } else {
                let prev_id  = movies[Object.keys(movies)[i - 1]].id;

                prev_btn.onclick = function() {
                    document.getElementById(prev_id).click()
                }
            }

        }

        if (i == Object.keys(movies).length - 1) {

            showing.innerHTML = "Displaying <strong>" + Object.keys(movies).length + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies";
            moviesDiv.style.display = "flex";
            document.getElementById("loading").style.display = "none";
            button_load.style.display = "flex";

            buttons.style.display = "flex";
            button_load.style.display = "none";
            
        }

    }

}

window.onload = renderMovies();

function castLinks () {

    castDivs = document.getElementsByClassName("cast");

    for (let i = 0; i < castDivs.length; i ++) {

        castDivs[i].onclick = function() {

            actor = Number(this.id.slice(this.id.indexOf("-") + 1));
            actor_name = this.getElementsByTagName("div")[0].textContent;

            moviesDiv.style.display = "flex";
            infos = document.getElementsByClassName("info");
    
            for (let k = 0; k < infos.length; k ++) {
                infos[k].style.display = "none";
            }
    
            back_btn.style.display = "none";
            next_btn.style.display = "none";
            prev_btn.style.display = "none";
            buttons.style.display = "flex";
            showing.removeAttribute("style");
            sorting.removeAttribute("style");
            filter_btn.classList.add("clicked");

            let count = 0;

            let movies_to_show = [];

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];

                for (let k = 0; k < Object.keys(movie.cast).length; k ++) {
                    if (movie.cast[Object.keys(movie.cast)[k]].id == actor) {
                        
                        movies_to_show.push(movie.id)
                        count += 1;
                    } 
                }
            }

            for (let j = 0; j < Object.keys(movies).length; j ++) {

                movie = movies[Object.keys(movies)[j]];

                if (movies_to_show.includes(movie.id)) {
                    document.getElementById(movie.id).style.display = "flex";
                } else {
                    document.getElementById(movie.id).style.display = "none";
                }

            }            

            showing.innerHTML = "Displaying movies starring <strong>" + actor_name + "</strong> (<strong>" + count + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies)"

        }

    }

}

// Scroll to top ribbon
let buttonVisibleOnPX = 200;

goStart = function () {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
}

const scrollElement = () => {
    return document.documentElement || document.body;
}
const handleOnScroll = () => {
    if (scrollElement().scrollTop > buttonVisibleOnPX) {
        back_to_start.classList.remove("hidden");
    } else {
        back_to_start.classList.add("hidden");
    }
    
    if (scrollElement().scrollTop > 0) {
        filter_menu.style.display = "none";
        sort_menu.style.display = "none";
    }
}

back_to_start.onclick = goStart;

window.onscroll = handleOnScroll;

let snowflakes = document.getElementById("snowflakes");

for (let i = 0; i < 12; i ++) {
    snowflakes.innerHTML += '<div class="snowflake"><div class="inner">★</div></div>'
}

