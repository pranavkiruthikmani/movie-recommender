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
from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()
token = os.environ.get('TMDB_BEARER_TOKEN')

reqheaders = {
    "Authorization": f"Bearer {token}"
}

session = requests.Session()
retries = Retry(
    total=3,                
    backoff_factor=1,       
    status_forcelist=[502, 503, 504, 429]
)
session.mount("https://", HTTPAdapter(max_retries=retries))

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, 'tmdb_5000_movies.csv')

df_movie = pd.read_csv(csv_path)

tfidf = TfidfVectorizer(stop_words='english') #Remove stop words
df_movie['overview'] = df_movie['overview'].fillna('')
tfidf_matrix = tfidf.fit_transform(df_movie['overview']) #Represents how often a word appears in the overview and the entire document

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix) #Finds similar overviews based on how often a word appears and how rare it is in the rest of the document

indices = pd.Series(df_movie.index, index=df_movie['title']).drop_duplicates() #Makes it easy to look up an id using the title of movie

@app.route('/recommend/<movie>')
def recommendations(movie):
    try:
        index = indices[movie]
    except:
        return jsonify('Error')

    scores = list(enumerate(cosine_sim[index]))
    scores = sorted(scores, key= lambda x: x[1], reverse=True)
    scores = scores[1:11]
    
    df_index = []    
    for i in scores:
        df_index.append(i[0])

    movies = list()
    for index, title in df_movie['title'].iloc[df_index].items():
        movies.append({index: title})

    return jsonify(movies)

@app.route('/search/<movie>')
def search_movie(movie):
    try:
        movie = str(movie)
    except Exception as e:
        print('Movie entered not a string', e)
        return jsonify({'error': str(e)})
    params = {"query" : movie}
    try:
        response = session.get(url="https://api.themoviedb.org/3/search/movie", headers=reqheaders, params=params, timeout=10)
        return jsonify(response.json()['results'])
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

