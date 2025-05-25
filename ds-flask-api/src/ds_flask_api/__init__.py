from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# import csv file
df = pd.read_csv("src/ds_flask_api/data/Steel_industry_data.csv")


@app.route("/")
def helloworld():
    return df.head().to_json()


if __name__ == "__main__":
    app.run()
