import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import os
# Import Chroma and instantiate a client. The default Chroma client is ephemeral, meaning it will not save to disk.
import chromadb
from langchain.text_splitter import RecursiveCharacterTextSplitter 
import sys
from chromadb.config import Settings
from langchain_chroma import Chroma

RECREATE_CHROMA = False



PERSIST_DIRECTORY = "db"  # Directory to store the Chroma database
collection_name = "json_documents"


client = chromadb.Client()


settings = Settings(
    persist_directory=PERSIST_DIRECTORY,
)
client = chromadb.PersistentClient(path=PERSIST_DIRECTORY, settings=settings)
db = Chroma(
    client=client,
    # embedding_function=embedding_function,
    client_settings=settings,
    persist_directory=PERSIST_DIRECTORY
)

if RECREATE_CHROMA:
    try:
        client.delete_collection(name=collection_name)
    except chromadb.errors.CollectionNotFoundError:
        pass  # Collection didn't exist, no need to delete
    collection = client.create_collection(name=collection_name)
else:
    collection = client.get_or_create_collection(name=collection_name)


# Embed Documents (Only If Needed)
def embed_documents(data_dir="data"):
    if collection.count() == 0:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=50)
        for ind, filename in enumerate(os.listdir(data_dir)):
            if filename.endswith(".json"):
                with open(os.path.join(data_dir, filename), "r", encoding="utf-8") as f:
                    data = json.load(f)
                    text = data['analyzeResult']['content']  # Extracting the relevant text
                    chunks = text_splitter.split_text(text)
                    for chunkInd, chunk in enumerate(chunks):
                        collection.add(
                            ids=[str(ind) + "-" + str(chunkInd)],
                            documents=[chunk],
                            metadatas=[{"filename": filename}],
                        )

# Check if embedding is necessary and proceed accordingly
embed_documents()



app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load OpenAI configurations from JSON file
with open('openai_configs.json', 'r') as f:
    openai_configs = json.load(f)['openAIConfigs']

# Store conversation history
conversation_history = []


def get_openai_chat_response(prompt):
    for config in openai_configs:
        try:
            client = openai.AzureOpenAI(
                api_key=config['apiKey'],
                azure_endpoint=config['azureEndpoint'],
                api_version=config['apiVersion']
            )
            response = client.chat.completions.create(
                model=config['model'],
                messages=[{"role": "user", "content": prompt}],
                max_tokens=150
            )
            content = response.choices[0].message.content
            # role_and_content = f"{response.choices[0].message.role}: {response.choices[0].message.content}"
            # return response.choices[0].message['content'].strip()
            # return role_and_content.strip()
            return content.strip()
        except Exception as e:
            print(f"Error with config {config['configName']}: {e}")
            continue
    return "Sorry, all configurations failed."


# Returns 
@app.route('/api/get_numeric_answer_list', methods=['POST'])
def get_numeric_answer_list():
    user_message = request.json.get('message', '')
    # Perform Chroma search
    results = collection.query(
        query_texts=[user_message],
        # maybe return just one for this case?
        n_results=3  # Number of relevant documents to retrieve
    )
    print(f" chroma results  {results=}")
    context = "\n".join(results['documents'][0])  
    numeric_prompt = f"Rules: Only respond with a list of numbers! Start your answer with '[' and end it with ']'. Separate different entries with commas. Dont put anything before or after it! \n\n"
    numeric_prompt += f"Context (retrieved chunks from database):\n{context} \n\n"
    numeric_prompt += f"User: {user_message}"
    ai_response = get_openai_chat_response(numeric_prompt)

    # Convert the AI response to a Python list
    try:
        numeric_list = json.loads(ai_response)
        if not isinstance(numeric_list, list):
            raise ValueError("Response is not a list")
    except (json.JSONDecodeError, ValueError) as e:
        return jsonify({'response': 'Failed to parse AI response', 'details': str(e)}), 400
    
    # Return the list in the JSON response
    return jsonify({'response': numeric_list})
    
@app.route('/api/get_numeric_answer_single', methods=['POST'])
def get_numeric_answer_single():
    user_message = request.json.get('message', '')
    # Perform Chroma search
    results = collection.query(
        query_texts=[user_message],
        # maybe return just one for this case?
        n_results=3  # Number of relevant documents to retrieve
    )
    print(f" chroma results  {results=}")
    context = "\n".join(results['documents'][0])  
    numeric_prompt = f"Rules: Only respond with a single number! Don't put anything before or after it! \n\n"
    numeric_prompt += f"Context (retrieved chunks from database):\n{context} \n\n"
    numeric_prompt += f"User: {user_message}\n\n"
    ai_response = get_openai_chat_response(numeric_prompt)
    print(f"{ai_response=}")
    try:
        # numeric = json.loads(ai_response)
        numeric = float(ai_response.replace(',', '.'))

        if not isinstance(numeric, float):
            raise ValueError("Response is not a float")
    except (json.JSONDecodeError, ValueError) as e:
        print(f"{str(e)=}")
        return jsonify({'response': 'Failed to parse AI response', 'details': str(e)}), 400
    
    return jsonify({'response': numeric})
    

# Enhanced Chat Route with Chroma Search
@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    conversation_history.append({'role': 'user', 'content': user_message})

    # Perform Chroma search
    results = collection.query(
        query_texts=[user_message],
        n_results=3  # Number of relevant documents to retrieve
    )
    print(f" chroma results  {results=}")
    # Construct a context string from relevant documents
    context = "\n".join(results['documents'][0])  
    print(f"{context=}")
    # Create the full prompt with context
    full_prompt = f"Context (retrieved chunks from database):\n{context}\n\nConversation:\n" + "\n".join([f"{entry['role']}: {entry['content']}" for entry in conversation_history])
    
    ai_response = get_openai_chat_response(full_prompt)
    conversation_history.append({'role': 'assistant', 'content': ai_response})
    
    # check if its numeric

    # return something else... not only response, but also 'numeric'
    return jsonify({'response': ai_response})




if __name__ == '__main__':
    app.run(debug=True)
