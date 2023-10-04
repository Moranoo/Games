from flask import Flask, jsonify
import mysql.connector as mysql
import base64
import csv
import io

from flask_cors import CORS, cross_origin
import pandas as pd
from matplotlib import pyplot as plt

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Configuration de la base de données
db_config = mysql.connect(
  host="localhost",
  user="root",
  password="filou2002",
)

cursor = db_config.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS game")

db_config = mysql.connect(host="localhost", user="root", passwd="filou2002", database="game")

cursor = db_config.cursor()

cursor.execute(
  "CREATE TABLE IF NOT EXISTS video_games (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, popularite INT, title VARCHAR(255), genre VARCHAR(255), note_utilisateur VARCHAR(100), nombre_vote VARCHAR(100), histoire TEXT)")

with open("imdb_video_games.csv", "r", encoding="utf-8") as file:
  df = pd.read_csv(file)
  df["popularite"] = df["Popularity"].astype(int)
  df["note_utilisateur"] = df["User Rating"]
  df["titre"] = df["Title"]
  df["genre"] = df["Genre"]
  df["nombre_vote"] = df["Number of Votes"]
  df["histoire"] = df["Summary"]

  df.to_csv("imdb_video_games1.csv", index=False)

  dfCsv = csv.DictReader(open("imdb_video_games1.csv", "r", encoding="utf-8"))

  row_count = len(df.index)
  print(row_count)
  i = 0

  cursor.execute("SELECT count(*) FROM video_games")

  result = cursor.fetchone()

  if result[0] != 14682:
    cursor.execute("TRUNCATE TABLE video_games")
    for row in dfCsv:
      if "," in row["nombre_vote"]:
        row["nombre_vote"] = row["nombre_vote"].replace(",", "")
      if row["nombre_vote"] == "":
        row["nombre_vote"] = 0
      cursor.execute(
        "INSERT INTO video_games (popularite, title, genre, note_utilisateur, nombre_vote, histoire) VALUES (%s, %s, %s, %s, %s, %s)",
        (row["popularite"], row["titre"], row["genre"], row["note_utilisateur"], row["nombre_vote"],
         row["histoire"]))
      db_config.commit()
      percentage_done = round((i / row_count) * 100, 2)
      print(percentage_done, "% réalisé")
      i += 1

    print("Records inserted successfully into video_games table")


@app.route("/api/games")
@cross_origin()
def index():
  cursor.execute("SELECT * FROM video_games ORDER BY popularite ASC LIMIT 50")
  result = cursor.fetchall()
  data = []
  for row in result:
    data.append({
      "id": row[0],
      "popularite": row[1],
      "titre": row[2],
      "genre": row[3],
      "note_utilisateur": row[4],
      "nombre_vote": row[5],
      "histoire": row[6]
    })
  data_df = pd.DataFrame(data)

  data_df["nombre_vote"] = data_df["nombre_vote"].astype(int)

  df_trie = data_df.sort_values(by=["nombre_vote"], ascending=True)

  fig, ax = plt.subplots(figsize=(10, 10))
  ax.bar(df_trie["titre"], df_trie["nombre_vote"])
  ax.set_title("Nombre de votes par jeu vidéo")
  ax.set_xlabel("Jeu vidéo")
  ax.set_ylabel("Nombre de votes")
  plt.xticks(rotation=90)
  plt.tight_layout()
  imgdata = io.BytesIO()
  fig.savefig(imgdata, format='png')
  imgdata.seek(0)

  image_nb_vote = base64.b64encode(imgdata.read())

  df_trie = data_df.sort_values(by=["note_utilisateur"], ascending=True)

  fig, ax = plt.subplots(figsize=(10, 10))
  ax.bar(df_trie["titre"], df_trie["note_utilisateur"])
  ax.set_title("Note utilisateur par jeu vidéo")
  ax.set_xlabel("Jeu vidéo")
  ax.set_ylabel("Note utilisateur")
  plt.xticks(rotation=90)
  plt.tight_layout()
  imgdata = io.BytesIO()
  fig.savefig(imgdata, format='png')
  imgdata.seek(0)

  image_note_utilisateur = base64.b64encode(imgdata.read())

  return {
    "data": data,
    "image_nb_vote": image_nb_vote.decode('utf-8'),
    "image_note_utilisateur": image_note_utilisateur.decode('utf-8')
  }


@app.route("/get_data/<string:table_name>/", methods=["GET"])
def get_data(table_name):
  try:
    # Connexion à la base de données
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    # Exécution de la requête SQL
    cursor.execute(f"SELECT * FROM jeux LIMIT 10 OFFSET 10;")
    rows = cursor.fetchall()

    # Fermeture des connexions
    cursor.close()
    conn.close()

    # Retour des données au format JSON
    return jsonify(rows)

  except mysql.connector.Error as err:
    # Gestion des erreurs de la base de données
    print("Erreur de la base de données:", err)
    return jsonify({"error": "Database error"}), 500
  except Exception as e:
    # Gestion des autres erreurs
    print("Erreur:", e)
    return jsonify({"error": "An error occurred"}), 500


if __name__ == "__main__":
  app.run(debug=True)
