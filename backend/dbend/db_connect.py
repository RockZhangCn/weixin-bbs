import pymysql
import json

db = pymysql.connect("localhost", "root", "wxfmgjaa", "vivolog")
cursor = db.cursor()

def get_articles(catagory):

    sql = "select * from log_testdata;"
    return_data = {}
    results = []
    try:
        cursor.execute(sql)
        dbresult = cursor.fetchall()

        for row in dbresult:
            entry = dict()
            entry['id'] = row[0]
            entry['name'] = row[1]
            entry["age"] = row[2]
            print(row[0], row[1])
            results.append(entry)
    except:
        print("Error: unable to fetch data")
        return_data['article'] = []

    return_data['article'] = results
    print(results)
    return return_data
