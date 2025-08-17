import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import requests

reqheaders = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDI0NGMxZDU3MDBkMDFhMjU0YTIxMTNiNWJhZTYxOCIsIm5iZiI6MTc1NDQ3MjUzNC43Mjk5OTk4LCJzdWIiOiI2ODkzMjA1NmQxOGI5OWEzYjVmM2YyMjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4jecF26Vd1wII79cLjnB4DcuKSf72MEhXBr51pkWRfc"
}

session = requests.Session()
retries = Retry(
    total=3,                
    backoff_factor=1,       
    status_forcelist=[502, 503, 504, 429]
)
session.mount("https://", HTTPAdapter(max_retries=retries))

df_movie = pd.read_csv('/root/movie/tmdb_5000_movies.csv')

tfidf = TfidfVectorizer(stop_words='english') #Remove stop words
df_movie['overview'] = df_movie['overview'].fillna('')
tfidf_matrix = tfidf.fit_transform(df_movie['overview']) #Represents how often a word appears in the overview and the entire document

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix) #Finds similar overviews based on how often a word appears and how rare it is in the rest of the document

indices = pd.Series(df_movie.index, index=df_movie['title']).drop_duplicates() #Makes it easy to look up an id using the title of movie

def recommendations(movie):
    index = indices[movie]

    scores = list(enumerate(cosine_sim[index]))
    scores = sorted(scores, key= lambda x: x[1], reverse=True)
    scores = scores[1:11]
    
    df_index = []    
    for i in scores:
        df_index.append(i[0])

    return df_movie['title'].iloc[df_index]

def search_movie(movie):
    try:
        movie = str(movie)
    except Exception as e:
        print('Movie entered not a string' + e)
        return None
    params = {"query" : movie}
    try:
        response = session.get(url="https://api.themoviedb.org/3/search/movie", headers=reqheaders, params=params, timeout=10)
        return response.json()['results']
    except Exception as e:
        print(e)
        return None
        

print(search_movie('Jack Reacher'))
