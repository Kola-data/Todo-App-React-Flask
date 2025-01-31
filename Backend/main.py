from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import pymysql.cursors


app = Flask(__name__)
CORS(app)
db_connection = pymysql.connect(
    host='127.0.0.1',
    user='root',
    password='',
    database='todo_react_flask'
)

cursor = db_connection.cursor(pymysql.cursors.DictCursor)

@app.route('/api/view_todo_list', methods=['GET'])
def view_all_todo_list():
    try:
        sql = "SELECT id, title, description, date FROM todo"
        cursor.execute(sql)
        all_todos = cursor.fetchall()  # Fetch all rows
        
        return jsonify(all_todos), 200  # Return proper JSON
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/add_todo', methods=['POST'])
def add_todo():
    if request.method == 'POST':
        try:
            title = request.json.get('title')
            description = request.json.get('description')
            date = request.json.get('date')

            if not title and not description and not date:
                return jsonify({'message': 'provide all inputs'}), 404
            
            sql = "INSERT INTO todo (`title`, `description`, `date`) VALUES (%s, %s, %s)"
            cursor.execute(sql, [title, description, date])
            db_connection.commit()
            return jsonify({"message": "Todo added successfully"}), 200
        except pymysql.MySQLError as error:
            return jsonify({"message": str(error)}), 500
    return jsonify({"message": "please send valid method"}), 404
        
@app.route('/api/edit_todo/<int:id>', methods=['GET', 'PUT'])
def edit_todo(id):
    sql = "SELECT * FROM todo WHERE id = %s"
    cursor.execute(sql, [id])
    todo = cursor.fetchone()

    if request.method == 'PUT':
        title = request.json.get('title')
        description = request.json.get('description')
        date = request.json.get('date')

        if not title and not description and not date:
            return jsonify({'message': 'provide all inputs'}), 1048

        try:
            cursor.execute("UPDATE todo SET title = %s, description = %s, date = %s WHERE id = %s",
                           (title, description, date, id))
            db_connection.commit()
            return jsonify({"message": "Todo updated successfully"}), 200
        except pymysql.MySQLError as e:
            return jsonify({"message":str(e)}), 500
        
    return jsonify(todo), 200

@app.route('/api/delete_todo/<int:id>', methods=['DELETE'])
def delete_todo(id):

    try:
        cursor.execute("DELETE FROM todo WHERE id = %s ", (id,))
        db_connection.commit()
        return jsonify({'message': 'Todo deleted successfully'}), 200
    except pymysql.MySQLError as e:
        return jsonify({'message': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8090)