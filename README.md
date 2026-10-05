# Movie Recommender

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://pranavkiruthikmani.github.io/movie-recommender/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-JS-blue.svg)](https://reactjs.org/)

A full stack, machine learning-powered web application that provides personalized movie recommendations based on natural language processing. 

This project bridges a data science backend with a modern, animated React frontend to create a seamless and responsive user experience. 

---

## Features
* **AI-Powered Recommendations:** Uses Natural Language Processing (TF-IDF vectorization and Cosine Similarity) to analyze movie plots and find the most relevant matches.
* **Live Search Integration:** Connects directly to the [TMDB API](https://developer.themoviedb.org/docs) to fetch real time movie data, high resolution posters, and metadata.
* **Modern UI/UX:** Built with React and Framer Motion for smooth page transitions, interactive hover states, and fully responsive design.
* **Cloud Deployed:** Frontend is hosted continuously via GitHub Pages, with the backend REST API served reliably via PythonAnywhere.

## Tech Stack
**Frontend:**
* React.js
* Framer Motion (Animations)
* HTML5 / CSS3

**Backend & Machine Learning:**
* Python & Flask (REST API architecture)
* Scikit-Learn (TF-IDF & Cosine Similarity algorithms)
* Pandas & NumPy (Data manipulation)
* Requests (External API polling)

## How the Algorithm Works
The recommendation engine is a **Content-Based Filtering** system.
1. It ingests a dataset of 5,000+ movies.
2. It processes the text from each movie's `overview` (plot summary) using a TF-IDF Vectorizer. This weighs the importance of specific contextual words while filtering out common English stop words.
3. It computes a Cosine Similarity matrix to mathematically score how closely related any two movies are based on their plot vectors.
4. When a user requests a recommendation, the Flask API instantly queries this pre computed matrix and returns the top 10 most mathematically similar movies in JSON format.

---

## Running it Locally

To run this project on your local machine, you will need a free API Read Access Token from [TMDB](https://www.themoviedb.org/settings/api).

### 1. Clone the repository
```bash
git clone https://github.com/pranavkiruthikmani/movie-recommender.git
cd movie-recommender