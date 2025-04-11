import argparse
# from dataclasses import dataclass
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os
import openai

load_dotenv()
openai.api_key = os.environ['OPENAI_API_KEY']

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""


"""
This script provides a command-line interface (CLI) for querying a Chroma database using a natural language query. 
It retrieves the most relevant results based on similarity scores, formats the results into a prompt, and generates 
a response using an OpenAI language model. The script also outputs the sources of the retrieved results.

Main function to handle the query process.
Steps:
1. Parses the query text from the command-line arguments.
2. Initializes the Chroma database with an embedding function.
3. Searches the database for the most relevant results based on the query text.
4. Formats the retrieved results into a prompt using a predefined template.
5. Invokes an OpenAI language model to generate a response based on the prompt.
6. Outputs the response and the sources of the retrieved results.

Returns:
    None if no relevant results are found or if the similarity score is too low.
    if results are Found, it prints the formatted response and sources. the format can be highlighted in the
    prompt template.
"""

def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text

    # Prepare the DB.
    embedding_function = OpenAIEmbeddings(openai_api_key=openai.api_key)
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    if not results or results[0][1] < 0.7:
        print(f"Unable to find matching results or results are too low ({results[0][1]}).")
        return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    print(prompt)

    model = ChatOpenAI(openai_api_key=openai.api_key)
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = f"Response: {response_text.content}\n\nSources: {sources}"
    print(formatted_response)


if __name__ == "__main__":
    main()
