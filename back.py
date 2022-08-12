from flask import Flask, render_template, redirect, url_for, request
from flask_cors import CORS
from pos_mapper import PostgreConnect
import json
from datetime import datetime
from dateutil import tz
JST = tz.gettz('Asia/Tokyo')


app = Flask(__name__, static_folder="./client/src/static",
            template_folder="./client/src/template/home")
CORS(app)

psql = PostgreConnect()
table_name = 'brace_history'
base_columns = 'id, visit_date, price, memo'


@app.route("/post_data", methods=["POST", "GET"])
def post_data():
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        psql.execute("INSERT INTO {0} VALUES(default, TIMESTAMP '{1}', '{2}', '{3}', now(), now())"
                     .format(table_name,
                             data['date'],
                             data[
                                 'expense'],
                             data[
                                 'detail']))
    return "hello"


@app.route("/get_history", methods=["POST", "GET"])
def get_history():
    cur = psql.execute_query(
        "SELECT {0} FROM {1}".format(base_columns, table_name))
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


def convertDateformat(visit_date):
    date_time_obj = datetime.strptime(visit_date, '%Y-%m-%dT%H:%M:%S.%f%z')
    newDate = date_time_obj.astimezone(JST).isoformat()
    return newDate


@app.route("/update", methods=["POST", "GET"])
def update_history():
    print(request.method)
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        id = data['id']
        new_date = convertDateformat(data['date'])
        new_price = data['price']
        new_memo = data['memo']
        psql.execute("UPDATE {0} SET visit_date = TIMESTAMP '{1}', price = '{2}', memo = '{3}', update_date = now() WHERE id = {4}"
                     .format(table_name,
                             new_date,
                             new_price,
                             new_memo,
                             id))
    return "OK"


@app.route("/delete", methods=["POST", "GET"])
def delete_history():
    id = json.loads(request.get_data())
    psql.execute("DELETE FROM {0} WHERE id = {1}".format(table_name, id))
    return "OK"


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5050)
