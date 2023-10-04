from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# Configuration de la base de données
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "game"
}


@app.route("/")
def index():
    return "<h1 style='color:green'>Hello There!</h1>"


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
