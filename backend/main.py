from flask import Flask, request, jsonify
from flask_cors import CORS
from research_tools import get_text_from_pdf, get_list_of_topics, get_flashcard, get_deep_research, get_perplexity_prompt, get_shallow_research
import json


app = Flask(__name__)
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

"""
List of selected topics example:
{
    "option": "flashcards",
    "topics": [
        "Symmetric Encryption Algorithms",
        "Asymmetric Encryption Algorithms"
    ]
}
"""

# Original topics from pdf
@app.route("/get_topics")
def topic_list():
    try:
        md_text = get_text_from_pdf(f"{app.config['UPLOAD_FOLDER']}/file.pdf")
        topics = get_list_of_topics(md_text)
        return jsonify(topics.split("\n"))
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    if file:
        # Process the PDF file as needed
        file.save(f"{app.config['UPLOAD_FOLDER']}/file.pdf")
        return jsonify({"message": "File uploaded successfully"}), 200
    return jsonify({"error": "No file provided"}), 400



@app.route("/send_selected", methods=["POST"])
def send_flashcards():
    data = json.loads(request.data)
    option = data["option"]
    topics = data["topics"]
    if option == "flashcards":
        res = []
        for topic in topics:
            res.append({"side_a": topic, "side_b": get_flashcard(topic)})
        response = jsonify(res)
        return response
    elif option == "research":
        prompt = get_perplexity_prompt(topics)
        message = get_shallow_research(prompt)
        response = jsonify({"message": message})
        return response

    elif option == "deep":
        prompt = get_perplexity_prompt(topics)
        message = get_deep_research(prompt)
        response = jsonify({"message": message})
        return response
    else:
        return "Invalid option", 400
