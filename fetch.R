# Load necessary libraries
library(jsonlite)
library(httr)
library(dplyr)

# Configuration
api_key <- '85341e3acb2ca904010924317b75aecc'
api_base_url <- 'https://api.themoviedb.org/3/'
image_base_url <- 'https://image.tmdb.org/t/p/w1280'

services <- c("Amazon Prime Video", "Netflix", "ITVX", "Disney Plus", "Apple TV+", 
              "Channel 4", "Paramount Plus", "BBC iPlayer", "My5", "Freevee")

# Function to sort objects by title
sort_object <- function(o) {
  sorted <- list()
  keys <- names(o)
  
  # Adjust keys for sorting (remove prefixes)
  adjust_key <- function(key) {
    if (startsWith(key, "A ")) {
      return(substring(key, 3))
    } else if (startsWith(key, "An ")) {
      return(substring(key, 4))
    } else if (startsWith(key, "The ")) {
      return(substring(key, 5))
    } else {
      return(key)
    }
  }
  
  sorted_keys <- sapply(keys, adjust_key)
  sorted_keys <- sort(sorted_keys)
  
  for (key in sorted_keys) {
    original_key <- keys[sapply(keys, adjust_key) == key]
    sorted[[original_key]] <- o[[original_key]]
  }
  
  return(sorted)
}

# Load and process movies
movies <- list()

# Read movies from a JSON file
tryCatch({
  movies <- fromJSON("movies.json")
}, error = function(e) {
  cat("Error loading movies.json:\n", e$message, "\n")
})

movies <- sort_object(movies)

for (movie_name in names(movies)) {
  movie <- movies[[movie_name]]
  id <- movie$id
  
  # Fetch movie details from TMDB
  data <- list()
  tryCatch({
    response <- GET(paste0(api_base_url, "movie/", id, "?api_key=", api_key))
    data <- content(response, as = "parsed")
  }, error = function(e) {
    cat("Error fetching movie details:\n", e$message, "\n")
  })
  
  movie$poster_path <- paste0(image_base_url, data$poster_path)
  movie$title <- data$title
  movie$released <- data$release_date
  movie$duration <- data$runtime
  movie$imdb_id <- data$imdb_id
  movie$vote_average <- as.character(round(data$vote_average, 1))
  movie$overview <- data$overview
  
  movie$genres <- c()
  for (genre in data$genres) {
    movie$genres <- c(movie$genres, genre$name)
  }


  # Fetch ratings from OMDB
  tryCatch({
    response_i <- GET(paste0("https://www.omdbapi.com/?i=", movie$imdb_id, "&apikey=f10fad26"))
    ratings <- content(response_i, as = "parsed")$Ratings
  }, error = function(e) {
    cat("Error fetching OMDB ratings:\n", e$message, "\n")
  })
  
  if (!is.null(ratings)) {
    for (rating in ratings) {
      if (rating$Source == "Internet Movie Database") {
        movie$imdb_score <- rating$Value
      } else if (rating$Source == "Rotten Tomatoes") {
        movie$rt_score <- rating$Value
      } else if (rating$Source == "Metacritic") {
        movie$meta_score <- rating$Value
      }
    }
  }

  # Fetch watch providers from TMDB
  tryCatch({
    response2 <- GET(paste0(api_base_url, "movie/", id, "/watch/providers?api_key=", api_key))
    GB <- content(response2, as = "parsed")$results$GB
  }, error = function(e) {
    cat("Error fetching watch providers:\n", e$message, "\n")
  })
  
  platforms <- c()
  logo_paths <- c()

  if (!is.null(GB)) {
    if (!is.null(GB$free)) {
      for (provider in GB$free) {
        if (provider$provider_name %in% services) {
          platforms <- c(platforms, provider$provider_name)
          logo_paths <- c(logo_paths, provider$logo_path)
        }
      }
    }
    if (!is.null(GB$flatrate)) {
      for (provider in GB$flatrate) {
        if (provider$provider_name %in% services) {
          platforms <- c(platforms, provider$provider_name)
          logo_paths <- c(logo_paths, provider$logo_path)
        }
      }
    }
    if (!is.null(GB$ads)) {
      for (provider in GB$ads) {
        if (provider$provider_name %in% services) {
          platforms <- c(platforms, provider$provider_name)
          logo_paths <- c(logo_paths, provider$logo_path)
        }
      }
    }
  }
  if (movie$plex) {
    platforms <- c(platforms, "Plex")
    logo_paths <- c(logo_paths, "https://image.tmdb.org/t/p/original/swMyOSh6p3ZOTr76yPV6EyQFTik.jpg")
  }

  movie$platforms <- platforms
  movie$logo_paths <- logo_paths

  # Fetch credits from TMDB
  tryCatch({
    response3 <- GET(paste0(api_base_url, "movie/", id, "/credits?api_key=", api_key))
    credits <- content(response3, as = "parsed")
  }, error = function(e) {
    cat("Error fetching movie credits:\n", e$message, "\n")
  })

  director <- c()
  if (!is.null(credits$crew)) {
    for (crew_member in credits$crew) {
      if (crew_member$job == "Director") {
        director <- c(director, crew_member$name)
      }
    }
  }

  movie$director <- director

  movie$cast <- list()
  if (!is.null(credits$cast)) {
    for (cast_member in credits$cast) {
      cast_name <- cast_member$name
      movie$cast[[cast_name]] <- list(
        id = cast_member$id,
        character = cast_member$character,
        profile_path = ifelse(is.null(cast_member$profile_path), movie$poster_path, paste0(image_base_url, cast_member$profile_path))
      )
    }
  }

  movies[[movie_name]] <- movie
}

# Write the processed movies to a new JSON file
write_json(movies, "movies_full.json", auto_unbox = TRUE, pretty = TRUE)

cat("Movies have been successfully written to movies_full.json\n")

