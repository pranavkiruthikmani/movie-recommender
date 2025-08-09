import requests
import pandas as pd

HEADER = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDI0NGMxZDU3MDBkMDFhMjU0YTIxMTNiNWJhZTYxOCIsIm5iZiI6MTc1NDQ3MjUzNC43Mjk5OTk4LCJzdWIiOiI2ODkzMjA1NmQxOGI5OWEzYjVmM2YyMjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4jecF26Vd1wII79cLjnB4DcuKSf72MEhXBr51pkWRfc"}

def search_movie(movie_input):
    response = requests.get(f'https://api.themoviedb.org/3/search/movie?query={movie_input}', headers=HEADER).json()
    df_raw = pd.DataFrame(response['results'])
    df = df_raw[['id', 'title', 'popularity', 'genre_ids', 'release_date']]
    return df

def get_movie(id):
    response = requests.get(f'https://api.themoviedb.org/3/movie/{str(id)}', headers=HEADER).json()
    return response

def find_movies(genres):
    if genres: #Check if the input is not empty
        arg = ''
        for i in genres:
            arg += str(i)
            arg += ','
        arg = arg[:-1] 
        response = requests.get(f'https://api.themoviedb.org/3/discover/movie?with_genres={arg}', headers=HEADER).json()
        df_raw = pd.DataFrame(response['results'])
        # print(df_raw.columns)
        df = df_raw[['id', 'title', 'popularity', 'genre_ids']]
        df = df.sort_values(by='popularity', ascending=False)
        return(df)
    else:
        return(None)

def get_genres(movie):
    genre = []
    genre_list = movie['genres']
    for i in genre_list:
        genre.append(i['id'])
    return genre

matrix = get_movie(603)
genres = get_genres(matrix)
print(find_movies(genres))