const moviesDiv = document.getElementById("movies");
buttons = document.getElementById("buttons");
button_load = document.getElementById("button-load");
showing = document.getElementById("showing");
back_btn = document.getElementById("back-btn");
back_link = document.getElementById("back-link");
sorting = document.getElementById("sorting");
can = document.getElementById("can");
sort_menu = document.getElementById("sort-menu");
filter_menu = document.getElementById("filter-menu");

let movies = [];
let current_year = 2020;

function loading_can() {
    let load_pct = 0;

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            load_pct += 1;
            can.style.clipPath = `polygon(0% 0%, ${load_pct}% 0%, ${load_pct}% 100%, 0% 100%)`;
        }, i * 10);
    }
}

async function renderMovies() {

    try {
        const response = await fetch("movies_full.json");
        const responseData = await response.json();
        movies = responseData;
    } catch (error) {
        
    }

    let year_added = [];
    
    for (let i = 0; i < Object.keys(movies).length; i ++) {

        let movie = movies[Object.keys(movies)[i]];

        year_added.push(movie.added);

    }

    current_year = Math.max(...year_added);
    

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
        poster_div.innerHTML = `<a href = "#top"><img src="${movie.poster_path}" class="img-fluid" ></img></a>`;

        moviesDiv.appendChild(poster_div);

        title_div = document.createElement("div");
        title_div.classList.add("poster-title");
        title_div.id = id + "-title";
        title_div.innerHTML = movie.title;
        title_div.style.display = "none";
        poster_div.appendChild(title_div);

        poster_div.onmouseover = function() {
            document.getElementById(id + "-title").style.display = "flex";
        }

        poster_div.onmouseout = function() {
            document.getElementById(id + "-title").style.display = "none";
        }       

        title_div.onmouseover = function () {
            document.getElementById(id).getElementsByTagName("img")[0].style.filter = "opacity(30%)";
        }

        title_div.onmouseout = function () {
            document.getElementById(id).getElementsByTagName("img")[0].removeAttribute("style");
        }

        poster_div.onclick = function() {
            moviesDiv.style.display = "none";
            back_btn.style.display = "block";
            buttons.style.display = "none";
            showing.style.display = "none";
            sorting.style.display = "none";
            sort_menu.style.display = "none";
            filter_menu.style.display = "none";
            document.getElementById("movie-info").style.display = "flex";

            back_link.href = "#" + movie.id;

            document.getElementById("info-title").textContent = movie.title;
            document.getElementById("info-poster").innerHTML = '<img src="' + movie.poster_path + '" class = "img-fluid">'

            duration = Math.floor(movie.duration / 60) + "h " + movie.duration % 60 + "m";

            document.getElementById("duration").textContent = duration;

            let ratings_div = document.getElementById("info-ratings");

            while (ratings_div.firstChild) {
                ratings_div.removeChild(ratings_div.firstChild)
            }

            score = Math.round(movie.vote_average * 10);
            colours = ["#DE3700", "#F85B00", "#E1FF00", "#92E000", "#2AA10F"];

            if (movie.hasOwnProperty("imdb_score")) {
                
                let imdb_score = movie.imdb_score[0]

                imdb_pie = document.createElement("div");
                imdb_pie.classList.add("pie");
                imdb_pie.classList.add("pie1");
                imdb_num = imdb_score.slice(0, imdb_score.indexOf("/"))

                if (imdb_num < 5) {
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(imdb_num / 10 * 4)] + '; transform: rotate(' + (imdb_num / 10 * 360) + 'deg);"></div>';
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(imdb_num / 10 * 4)] + ';"></div>';
                } else {
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(imdb_num / 10 * 4)] + '; transform: rotate(' + (imdb_num / 10 * 360) + 'deg);"></div>';
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(imdb_num / 10 * 4)] + ';"></div>';
                }

                imdb_pie.innerHTML = '<div class="outer-right mask">' +
                                    inner_right +
                                    '</div>' +
                                    '<div class="outer-left mask">' +
                                    inner_left +
                                    '</div>' +
                                    '<div class="content">' +
                                    '<span style = "font-size: 30px">' + imdb_score + '</span>' +
                                    '</div>' +
                                    '<div class="title">IMDb</div>';

                ratings_div.appendChild(imdb_pie);
            }

            
            if (movie.hasOwnProperty("rt_score")) {

                let rt_score = movie.rt_score[0];

                rt_pie = document.createElement("div");
                rt_pie.classList.add("pie");
                rt_pie.classList.add("pie1");
                rt_num = rt_score.slice(0, rt_score.indexOf("%"));

                if (rt_num < 50) {
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(rt_num / 100 * 4)] + '; transform: rotate(' + (rt_num / 100 * 360) + 'deg);"></div>';
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(rt_num / 100 * 4)] + ';"></div>';
                } else {
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(rt_num / 100 * 4)] + '; transform: rotate(' + (rt_num / 100 * 360) + 'deg);"></div>';
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(rt_num / 100 * 4)] + ';"></div>';
                }
        
                rt_pie.innerHTML =  '<div class="outer-right mask">' +
                                    inner_right +
                                    '</div>' +
                                    '<div class="outer-left mask">' +
                                    inner_left +
                                    '</div>' +
                                    '<div class="content">' +
                                    '<span>' + rt_score + '</span>' +
                                    '</div>' +
                                    '<div class="title">Rotten Tomatoes</div>';
        
                ratings_div.appendChild(rt_pie);
            }

            if (movie.hasOwnProperty("meta_score")) {

                let meta_score = movie.meta_score[0];

                meta_pie = document.createElement("div");
                meta_pie.classList.add("pie");
                meta_pie.classList.add("pie1");
                meta_num = meta_score.slice(0, meta_score.indexOf("/"))
            
                if (meta_num < 50) {
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(meta_num / 100 * 4)] + '; transform: rotate(' + (meta_num / 100 * 360) + 'deg);"></div>';
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(meta_num / 100 * 4)] + ';"></div>';
                } else {
                    inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(meta_num / 100 * 4)] + '; transform: rotate(' + (meta_num / 100 * 360) + 'deg);"></div>';
                    inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(meta_num / 100 * 4)] + ';"></div>';
                }
            
                meta_pie.innerHTML = '<div class="outer-right mask">' +
                                    inner_right +
                                    '</div>' +
                                    '<div class="outer-left mask">' +
                                    inner_left +
                                    '</div>' +
                                    '<div class="content">' +
                                    meta_num + '%' +
                                    '</div>' +
                                    '<div class="title">Metacritic</div>';
            
                ratings_div.appendChild(meta_pie);
            }

            tmdb_pie = document.createElement("div");
            tmdb_pie.classList.add("pie");
            tmdb_pie.classList.add("pie1");

            if (score < 50) {
                inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(score / 100 * 4)] + '; transform: rotate(' + (score / 100 * 360) + 'deg);"></div>';
                inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(score / 100 * 4)] + ';"></div>';
            } else {
                inner_left = '<div class="inner-left" style = "background-color:' + colours[Math.round(score / 100 * 4)] + '; transform: rotate(' + (score / 100 * 360) + 'deg);"></div>';
                inner_right = '<div class="inner-right" style = "background-color:' + colours[Math.round(score / 100 * 4)] + ';"></div>';
            }

            tmdb_pie.innerHTML = '<div class="outer-right mask">' +
                                        inner_right +
                                        '</div>' +
                                        '<div class="outer-left mask">' +
                                        inner_left +
                                        '</div>' +
                                        '<div class="content">' +
                                        '<span>' + score + '%</span>' +
                                        '</div>' +
                                        '<div class="title">TMDB</div>';      
                    
                    
            ratings_div.appendChild(tmdb_pie);

            document.getElementById("added-year").textContent = movie.added;

            watched_div = document.getElementById("info-watched");

            while (watched_div.firstChild) {
                watched_div.removeChild(watched_div.firstChild)
            }

            for (let j = movie.added[0]; j <= current_year; j ++) {
                if (movie.watched.includes(j)) {
                    emoji = "🎄"
                } else {
                    emoji = "❌"
                }
                watched_div.innerHTML += "<div class = 'row' style = 'margin-left: 15px; font-size: 16pt'><div style = 'width: 52px; margin-left: 5px'>" + j + ":</div><div style = 'width: 30px; text-align: center;'>" + emoji + "</div></div>"
            }
            
            platform_div = document.getElementById("info-platforms");

            while (platform_div.firstChild) {
                platform_div.removeChild(platform_div.firstChild)
            }

            if (movie.hasOwnProperty("platforms")) {
                for (let j = 0; j < movie.platforms.length; j ++) {
                    logo = "https://image.tmdb.org/t/p/original" + movie.logo_paths[j];
                    platform_div.innerHTML += "<div><img class = 'tv-logo' src = '" + logo + "'>" + movie.platforms[j] + "</div>"
                }
            }

            document.getElementById("info-plot").textContent = movie.overview;

            
                
            if (movie.genres.length > 1) {
                document.getElementById("genre-heading").innerHTML = "Genres";
            } else {
                document.getElementById("genre-heading").innerHTML = "Genre";
            }

            let genre_text = "";

            for (let j = 0; j < movie.genres.length; j ++) {
                genre_text += movie.genres[j] + ", ";
                
                if (j == movie.genres.length - 1) {
                    genre_text = genre_text.slice(0, -2);
                }
            }

            document.getElementById("info-genres").textContent = genre_text;

            director = movie.director;
                
            if (director.length == 1) {
                document.getElementById("director-heading").textContent = "Director";
                document.getElementById("info-director").textContent = director[0];
            } else if (director.length > 1) {
                document.getElementById("director-heading").textContent = "Directors";
                let director_text = "";
                for (let j = 0; j < director.length; j ++) {
                    director_text += director[j] + ", ";
                }
                director_text = director_text.slice(0, -2);
                document.getElementById("info-director").textContent = director_text;
            }

            actors = document.getElementById("info-cast");

            actors.style.display = "flex";
            actors.classList.add("row");
        
            while (actors.firstChild) {
                actors.removeChild(actors.firstChild)
            }


            for (let j = 0; j < Object.keys(movie.cast).length; j ++) {

                actors.innerHTML += "<div id = '" + movie.cast[Object.keys(movie.cast)[j]].id + "' class = 'col-4 col-lg-3 col-xl-2 cast'><img src = '" + movie.cast[Object.keys(movie.cast)[j]].profile_path + "' class = 'img-fluid'><div style = 'font-size: 14pt; font-weight: bold;'>" + Object.keys(movie.cast)[j] + "</div><div>" + movie.cast[Object.keys(movie.cast)[j]].character + "</div></div>";
            
            }   


            castLinks();

        }

        if (i == Object.keys(movies).length - 1) {

            setTimeout(() => {
                showing.innerHTML = "Displaying <strong>" + Object.keys(movies).length + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies";
                moviesDiv.style.display = "flex";
                document.getElementById("loading").style.display = "none";
                button_load.style.display = "flex";

                buttons.style.display = "flex";
                button_load.style.display = "none";
            }, 1000)
            
        }

    }

}

window.onload = function() {
    loading_can();
    renderMovies();
}

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

}

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