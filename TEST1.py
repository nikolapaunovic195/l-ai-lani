import requests


url1 = 'http://localhost:5000/get_topics/C:\projects\hackhayward\hackhayward25-snailpace\CH03-CompSec5e_accessible - Tagged.pdf'
url2 = 'http://localhost:5000/request_result'

response = requests.get(url1)
topics = response.json()
req = {
    "option": "flashcards",
    "topics": topics
}

response = requests.post(url2, json=req)
print(response.text)