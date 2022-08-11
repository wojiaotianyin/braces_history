from flask import Flask, render_template, redirect, url_for, request
from flask_cors import CORS
from pos_mapper import PostgreConnect
import json


app = Flask(__name__, static_folder="./client/src/static",
            template_folder="./client/src/template/home")
CORS(app)

psql = PostgreConnect()
table_name = 'brace_history'
base_columns = 'id, visit_date, price, memo'


@app.route("/home", methods=["POST", "GET"])
def home():
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        psql.execute("insert into {0} values(default, TIMESTAMP '{1}', '{2}', '{3}', now(), now())".format(table_name, data['date'], data['expense'], data['detail']))
    return "hello"


@app.route("/get_history", methods=["POST", "GET"])
def getHistory():
    cur = psql.execute_query("select {0} from {1}".format(base_columns, table_name))
    data = {}
    for i in range(len(cur)):
        val = cur[i]
        data[i] = {
            "id": val[0],
            "datetime": val[1],
            "price": val[2],
            "detail": val[3],
        }
    return data

@app.route("/update", methods=["POST", "GET"])
def updateHistory():
   
    return "OK"

@app.route("/delete", methods=["POST", "GET"])
def deleteHistory():
    id = json.loads(request.get_data())
    psql.execute("delete from {0} where id = {1}".format(table_name, id))   
    return "OK"


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5050)
