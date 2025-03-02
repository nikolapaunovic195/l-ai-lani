from flask import Flask, request
from research_tools import get_text_from_pdf, get_list_of_topics, get_flashcard
import json

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"  

@app.route("/about")
def about_page():
    return "This is our about page."

# Original topics from pdf 
@app.route("/get_topics/<path:filepath>")
def topic_list(filepath):
    md_text = get_text_from_pdf(filepath)
    list_of_topics = get_list_of_topics(md_text).split("\n")
    list_of_topics = [topic for topic in list_of_topics if topic != ""]
    return json.dumps(list_of_topics)

'''
List of selected topics example:
{
    "option": "flashcards",
    "topics": [
        "Symmetric Encryption Algorithms",
        "Asymmetric Encryption Algorithms"
    ]
}
'''
@app.route("/send_selected", methods=["POST"])
def send_flashcards():
    data = json.loads(request.data)
    option = data["option"]
    topics = data["topics"]
    if option == "flashcards":
        res = []
        for topic in topics:
            res.append({"side_a": topic, "side_b": get_flashcard(topic)})
        return json.dumps(res)
    elif option == "research":
        return json.dumps(topics)
    elif option == "deep":
        return json.dumps(topics)
    else:
        return "Invalid option", 400

