import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# Load data
df = pd.read_csv('data/bible_verses.csv')
moods = df['mood']
verses = df['verse']

# Vectorize moods
vectorizer = TfidfVectorizer()
x = vectorizer.fit_transform(moods)

# Nearest neighbor model
model = NearestNeighbors(n_neighbors=1, metric='cosine')
model.fit(x)

# Get user mood from command line
if len(sys.argv) > 1:
    user_mood = sys.argv[1]
    mood_vec = vectorizer.transform([user_mood])
    dist, idx = model.kneighbors(mood_vec)
    verse = verses.iloc[idx[0][0]]
    print(verse)
else:
    print("No mood provided")
