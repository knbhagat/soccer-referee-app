from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
import openai 
from dotenv import load_dotenv
import os
import shutil
# import nltk


# Only download if not already present
# for resource in ['punkt', 'punkt_tab', 'averaged_perceptron_tagger_eng]:
#     try:
#         nltk.data.find(f'tokenizers/{resource}')
#     except LookupError:
#         nltk.download(resource)


# Load environment variables. Assumes that project contains .env file with API keys
load_dotenv()
#---- Set OpenAI API key 
# Change environment variable name from "OPENAI_API_KEY" to the name given in 
# your .env file.
openai.api_key = os.environ['OPENAI_API_KEY']

CHROMA_PATH = "chroma"
DATA_PATH = "data/soccer_referee_rules/"


def main():
    generate_data_store()


"""
Generates a data store by performing the following steps:
1. Loads documents from a specified source.
2. Splits the loaded documents into smaller chunks.
3. Saves the processed chunks into a Chroma database.

This function orchestrates the process of preparing and storing data
for further use in applications such as information retrieval or
machine learning pipelines.
"""
def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)


def load_documents():
    loader = DirectoryLoader(DATA_PATH, glob="*.md")
    documents = loader.load()
    return documents

"""
Splits a list of Document objects into smaller chunks using a RecursiveCharacterTextSplitter.
Args: documents (list[Document]): A list of Document objects to be split into smaller chunks.
Returns: list[Document]: A list of smaller Document chunks created from the input documents.
The function uses a RecursiveCharacterTextSplitter with the following parameters:
    - chunk_size: 200 characters
    - chunk_overlap: 50 characters
    - length_function: len (to calculate the length of text)
    - add_start_index: True (to include the start index in metadata)
Example:
    Given a list of documents, the function splits them into smaller chunks and prints:
    - The number of input documents and resulting chunks.
    - The content and metadata of the 11th chunk (if it exists).
"""
def split_text(documents: list[Document]):
    # With current API plan, I can currently process 40,000 tokens per minute
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=215,
        chunk_overlap=50,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

    # ensure that that the 11th chunk is created properly and exists
    # document = chunks[10]
    # print(document.page_content)
    # print(document.metadata)
    return chunks


def save_to_chroma(chunks: list[Document]):
    # Clear out the database first.
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    # Create a new DB from the documents. Db will automatically be persisted
    Chroma.from_documents(
        chunks, OpenAIEmbeddings(), persist_directory=CHROMA_PATH
    )
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")


if __name__ == "__main__":
    main()
