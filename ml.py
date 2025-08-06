import tmdbsimple as tmdb
import pandas as pd

tmdb.API_KEY = '24244c1d5700d01a254a2113b5bae618'
tmdb.REQUESTS_TIMEOUT = (2, 5)  # seconds, for connect and read specifically 

movie_in = input("Enter movie: ")
search = tmdb.Search()

def search_movie(movie_input):
    response = search.movie(query=movie_input)
    for r in response['results']:
        return {'title': r['title'], 'id': r['id']}
    
