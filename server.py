from flask import Flask, render_template, jsonify, request
from random import choice

app = Flask(__name__, static_folder='static', template_folder='templates')

# Route to serve the main page (index)
@app.route('/')
def index():
    return render_template('index.html')

# Route to serve the AI page
@app.route('/ai')
def ai():
    return render_template('ai.html')

# Route to serve the notes page
@app.route('/notes')
def notes():
    return render_template('notes.html')

# Route to serve the todo page
@app.route('/todo')
def todo():
    return render_template('todo.html')

# Route to handle AI chatbot responses
@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message')
    responses = [
        "Hello! How can I assist you?",
        "I can create questions or help you with tasks!",
        "Feel free to ask me anything!"
    ]
    
    # Return a random response for now
    return jsonify({"response": choice(responses)})

# Route to handle saving notes
@app.route('/save-note', methods=['POST'])
def save_note():
    note_title = request.json.get('title')
    note_content = request.json.get('content')
    
    # Logic to save the note (e.g., save to file or database) can be added here
    # For now, we're just returning a success response
    return jsonify({"message": "Note saved successfully!"})

# Static route for serving images from the static folder
@app.route('/images/<path:filename>')
def images(filename):
    return app.send_static_file('images/' + filename)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
