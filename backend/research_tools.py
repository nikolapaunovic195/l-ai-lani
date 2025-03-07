from groq import Groq
import json
import requests
import pymupdf4llm as p4llm

with open(".conf", "r") as file:
    config = json.load(file)
    groq_api_key = config["GROQ_API_KEY"]
    perplexity_api_key = config["PERPLEXITY_API_KEY"]

client = Groq(
    api_key=groq_api_key,
)

FILE_CONTENT = ""
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


def get_shallow_research(perplexity_prompt):
    print("Shallow researching with Perplexity...")
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "sonar",
        "messages": [
            {
                "role": "system",
                "content": "You are performing shallow research on the question provided. Explain the question as accurate as possible while ensuring that it is of reasonable length. Include citations within the text. Format the output using markdown. Output only the results of research.",
            },
            {"role": "user", "content": perplexity_prompt},
        ],
    }
    headers = {
        "Authorization": f"Bearer {perplexity_api_key}",
        "Content-Type": "application/json",
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        # print("Full API Response:", data)

        if "choices" in data and len(data["choices"]) > 0:
            response_dict = {
                "research_results": data["choices"][0]["message"]["content"],
                "citations": data["citations"]
            }    
            return response_dict

        elif "error" in data:
            return f"API Error: {data['error']}"
        else:
            return "Unexpected API response format."
    except requests.exceptions.RequestException as e:
        return f"API request error: {e}"
    except (KeyError, IndexError):
        return "Unexpected response structure from Perplexity API."
    
def get_deep_research(perplexity_prompt):
    print("Deep researching with Perplexity...")
    url = "https://api.perplexity.ai/chat/completions"
    payload = {
        "model": "sonar-deep-research",
        "messages": [
            {
                "role": "system",
                "content": "You are performing deep research on the question provided. Explain as much about the question as possible while being accurate and precise. Include citations within the text. Format the output using markdown. Do not include thinking, output only the results of research.",
            },
            {"role": "user", "content": perplexity_prompt},
        ],
    }
    headers = {
        "Authorization": f"Bearer {perplexity_api_key}",
        "Content-Type": "application/json",
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        # print("Full API Response:", data)  # Debugging: Print the entire response
        if "choices" in data and len(data["choices"]) > 0:
            response_dict = {
                "research_results": data["choices"][0]["message"]["content"],
                "citations": data["citations"]
            }
            return response_dict

        elif "error" in data:
            return f"API Error: {data['error']}"
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
                "role": "system",
                "content": f'Read the following text and give me a list of topics that are notable or I should research on. Write it in the form of a list with no further formatting. Do not include bullets, instead simply have a list where each topic is on a new line by itself. Do not preface the list with anything, just give answers. Do not say anything like \"Here is a list of notable topics:\"\n\n{md_text}',
            }
        ],
        model="llama3-8b-8192",
    )
    return response.choices[0].message.content


def get_flashcard(prompt):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f'You are creating the content for the back of flashcards. Given the prompt, return only the definition. Do not introduce the term or provide any context. Keep the definition concise and to the point. Do not include any formatting. Do not include the prompt in the response. Do not include any citations. Do not include any references to the prompt. Do not include any examples. Do not include any additional information. Do not include any additional context'
            },
            {
                "role": "user",
                "content": f"{prompt}"
            }
        ],
        model="llama3-8b-8192",
    )
    return response.choices[0].message.content