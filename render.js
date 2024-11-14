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

        load_pct = (i + 1) / Object.keys(movies).length * 100;
        can.style.clipPath = "polygon(0% 0%, " + load_pct + "% 0%, " + load_pct + "% 100%, 0% 100%)"

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

        info_div = document.createElement("div");
        info_div.id = `${id}-info`;
        info_div.classList.add("info");

        info_title = document.createElement("h2");
        info_title.textContent = movie.title +  " (" + movie.released[0].slice(0, 4) + ")";

        info_div.appendChild(info_title);

        info_row = document.createElement("div");
        info_row.classList.add("row");

        info_div.appendChild(info_row);

        info_poster = document.createElement("div");
        info_poster.classList.add("info-poster");
        info_poster.classList.add("col-12");
        info_poster.classList.add("col-sm-12");
        info_poster.classList.add("col-md-5");
        info_poster.classList.add("col-lg-5");
        info_poster.classList.add("col-xl-5");

        info_poster.innerHTML = `<img src="${movie.poster_path}" class="img-fluid" ></img>`

        info_row.appendChild(info_poster);

        info_facts = document.createElement("div");
        info_facts.classList.add("info-facts");
        info_facts.classList.add("col-12");
        info_facts.classList.add("col-sm-12");
        info_facts.classList.add("col-md-7");
        info_facts.classList.add("col-lg-7");
        info_facts.classList.add("col-xl-7");

        duration = Math.floor(movie.duration / 60) + "h " + movie.duration % 60 + "m";
        score = Math.round(movie.vote_average * 10);
        
        colours = ["#DE3700", "#F85B00", "#E1FF00", "#92E000", "#2AA10F"];

        let ratings_div = document.createElement("div");
        ratings_div.id = id + "-ratings";

        info_facts.innerHTML =  "<div style = 'margin-bottom: 15px;'>Duration: <span style = 'font-size: 16pt'>" + duration + "</span></div>" +
                                "<div>Ratings:</div>";

        info_facts.appendChild(ratings_div);

        added_div = document.createElement("div");
        added_div.classList.add("row");
        added_div.style.marginTop = "10px";
        added_div.style.marginLeft = "0px";
        added_div.innerHTML = "<div>Added: <span class = 'added-year'>" + movie.added + "</span></div>";
        if (movie.added == current_year) {
            added_div.innerHTML += "<div class = 'new-entry'>New</div>"
        }

        info_facts.appendChild(added_div);

        watched_div = document.createElement("div");
        watched_div.style.marginTop = "15px";

        watched_div.innerHTML = "<div>Watched:</div>";

        for (let j = movie.added[0]; j <= current_year; j ++) {
            if (movie.watched.includes(j)) {
                emoji = "🎄"
            } else {
                emoji = "❌"
            }
            watched_div.innerHTML += "<div class = 'row' style = 'margin-left: 15px; font-size: 16pt'><div style = 'width: 52px; margin-left: 5px'>" + j + ":</div><div style = 'width: 30px; text-align: center;'>" + emoji + "</div></div>"
        }

        info_facts.appendChild(watched_div);

        info_row.appendChild(info_facts);

        document.getElementById("movie-info").appendChild(info_div);

        poster_div.onclick = function() {
            moviesDiv.style.display = "none";
            back_btn.style.display = "block";
            buttons.style.display = "none";
            showing.style.display = "none";
            sorting.style.display = "none";
            sort_menu.style.display = "none";
            filter_menu.style.display = "none";
            document.getElementById(`${id}-info`).style.display = "flex";

            back_link.href = "#" + movie.id;
            
        }

        overview = document.createElement("div");
        overview.innerHTML = "<h2>Plot summary</h2>" + movie.overview;

        info_div.appendChild(overview);

        genre = document.createElement("div");
        if (movie.genres.length > 1) {
            genre.innerHTML = "<h2>Genres</h2>";
        } else {
            genre.innerHTML = "<h2>Genre</h2>";
        }

        for (let j = 0; j < movie.genres.length; j ++) {
            genre.innerHTML += movie.genres[j] + ", ";
            
            if (j == movie.genres.length - 1) {
                genre.innerHTML = genre.innerHTML.slice(0, -2);
            }
        }

        info_div.appendChild(genre);
        
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

        document.getElementById(movie.id + "-info").getElementsByClassName("info-facts")[0].innerHTML += "<div style = 'margin-top: 25px;'>Watch it on:</div>";

        if (movie.hasOwnProperty("platforms")) {
            for (let j = 0; j < movie.platforms.length; j ++) {
                logo = "https://image.tmdb.org/t/p/original" + movie.logo_paths[j];
                document.getElementById(movie.id + "-info").getElementsByClassName("info-facts")[0].innerHTML += "<div><img class = 'tv-logo' src = '" + logo + "'>" + movie.platforms[j] + "</div>"
            }
        }

        if (movie.plex[0] == true) {
            document.getElementById(id + "-info").getElementsByClassName("info-facts")[0].innerHTML += "<div><img class = 'tv-logo' src = 'https://image.tmdb.org/t/p/original/swMyOSh6p3ZOTr76yPV6EyQFTik.jpg'>Plex</div>";
            if (movie.hasOwnProperty("platforms")) {
                movie.platforms.push("Plex");
            } else {
                movie.platforms = ["Plex"];
            }
        }

        directorDiv = document.createElement("div");

        director = movie.director;
                
        if (director.length == 1) {
            directorDiv.innerHTML = "<h2>Director</h2>" + director[0]
        } else if (director.length > 1) {
            directorDiv.innerHTML = "<h2>Directors</h2>"
            for (let k = 0; k < director.length; k ++) {
                directorDiv.innerHTML += director[k] + ", ";
            }
            directorDiv.innerHTML = directorDiv.innerHTML.slice(0, -2);
        }

        document.getElementById(movie.id + "-info").appendChild(directorDiv);

        starring = document.createElement("div");
        starring.innerHTML = "<h2>Starring</h2>";
        
        actors = document.createElement("div");
        actors.style.display = "flex";
        actors.classList.add("row");
        actors.id = movie.id + "-cast";

        for (let j = 0; j < Object.keys(movie.cast).length; j ++) {

            actors.innerHTML += "<div id = '" + movie.id + "-" + movie.cast[Object.keys(movie.cast)[j]].id + "' class = 'col-4 col-lg-3 col-xl-2 cast'><img src = '" + movie.cast[Object.keys(movie.cast)[j]].profile_path + "' class = 'img-fluid'><div style = 'font-size: 14pt; font-weight: bold;'>" + Object.keys(movie.cast)[j] + "</div><div>" + movie.cast[Object.keys(movie.cast)[j]].character + "</div></div>";
            
        }

        starring.appendChild(actors);
        document.getElementById(movie.id + "-info").appendChild(starring);

        if (i == Object.keys(movies).length - 1) {
            showing.innerHTML = "Displaying <strong>" + Object.keys(movies).length + "</strong> of <strong>" + Object.keys(movies).length + "</strong> movies";
            moviesDiv.style.display = "flex";
            document.getElementById("loading").style.display = "none";
            button_load.style.display = "flex";

            buttons.style.display = "flex";
            button_load.style.display = "none";

            castLinks();
        }

    }

}

window.onload = renderMovies;

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