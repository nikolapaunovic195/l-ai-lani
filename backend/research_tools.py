from groq import Groq
import json
import requests
import pymupdf4llm as p4llm

# Loading API key from config file
with open(".conf", "r") as file:
    config = json.load(file)
    groq_api_key = config["GROQ_API_KEY"]
    perplexity_api_key = config["PERPLEXITY_API_KEY"]


client = Groq(
    api_key=groq_api_key,
)

FILE_CONTENT = ""

"""
!!! WRITE FUNCTIONS BELOW !!!
VVVVVVVVVVVVVVVVVVVVVVVVVVVVV
"""


def get_perplexity_prompt(subject):
    print("Generating prompt for Perplexity...")
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f'Write a simple prompt for Perplexity AI to do research on "{subject}". Write it in the form of a question with no further formatting.',
            }
        ],
        model="llama3-8b-8192",
    )
    return response.choices[0].message.content


def get_deep_research(perplexity_prompt):
    print("Deep researching with Perplexity...")
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "sonar",
        "messages": [
            {
                "role": "system",
                "content": "You are performing deep research on the topic provided. Explain as much about the topic as possible while being accurate and precise.",
            },
            {"role": "User", "content": perplexity_prompt},
        ],
    }

    headers = {
        "Authorization": f"Bearer {perplexity_api_key}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raises an error if status code is 4xx/5xx
        
        data = response.json()
        print("Full API Response:", data)  # Debugging: Print the entire response

        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]
        elif "error" in data:
            return f"API Error: {data['error']}"  # If API returned an error message
        else:
            return "Unexpected API response format."

    except requests.exceptions.RequestException as e:
        return f"API request error: {e}"
    except (KeyError, IndexError):
        return "Unexpected response structure from Perplexity API."


def get_text_from_pdf(pdf_path):
    text = p4llm.to_markdown(pdf_path)
    return text


def get_list_of_topics(md_text):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f'Read the following text and give me a list of topics that are notable or I should research on. Write it in the form of a list with no further formatting. Do not include bullets, instead simply have a list where each topic is on a new line by itself. Do not preface the list with anything, just give answers. Do not say anything like "Here is a list of notable topics:"\n\n{md_text}',
            }
        ],
        model="llama3-8b-8192",
    )
    return response.choices[0].message.content


def get_flashcard(prompt):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f'If "{prompt}" is the front side of a flashcard, what would be the back side of the flashcard? Write it in the form of a single sentence with no further formatting.',
            }
        ],
        model="llama3-8b-8192",
    )
    return response.choices[0].message.content


"""
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
!!! WRITE FUNCTIONS ABOVE !!!
"""


"""
!!! CODE TESTING AREA !!!
VVVVVVVVVVVVVVVVVVVVVVVVV
"""

# perplexity_prompt = get_perplexity_prompt("Symmetric Encryption Algorithms")
# print(perplexity_prompt)
# print(get_deep_research(perplexity_prompt))

# md_text = get_text_from_pdf("CH03-CompSec5e_accessible - Tagged.pdf")
# print(get_list_of_topics(md_text))

"""
^^^^^^^^^^^^^^^^^^^^^^^^^
!!! CODE TESTING AREA !!!
"""
