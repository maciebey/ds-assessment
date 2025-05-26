from flask import Flask, request
from flask_cors import CORS
import pandas as pd
from dateutil import parser

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# import csv file
df = pd.read_csv("src/ds_flask_api/data/Steel_industry_data.csv")
# Convert 'date' column to datetime format
df["date"] = pd.to_datetime(df["date"], format="%d/%m/%Y %H:%M").dt.date


@app.route("/")
def helloworld():
    start_date_str = request.args.get("start_date")
    end_date_str = request.args.get("end_date")

    if not start_date_str or not end_date_str:
        return (
            "Please provide both start_date and end_date in the format YYYY-MM-DD",
            400,
        )

    start_date = parser.parse(request.args.get("start_date")).date()
    end_date = parser.parse(request.args.get("end_date")).date()

    filtered_df = df[(df["date"] >= start_date) & (df["date"] <= end_date)]

    return filtered_df.to_json(orient="records")


if __name__ == "__main__":
    app.run()
