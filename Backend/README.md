# Langchain RAG Setup

## Install dependencies

1. Do the following before installing the dependencies found in `requirements.txt` 

    - first install `onnxruntime` dependency for `chromadb` using:

    ```python
     conda install onnxruntime -c conda-forge
    ```


2. Now run this command to install dependenies in the `requirements.txt` file. 

```python
pip install -r requirements.txt
```

3. Install markdown depenencies with: 

```python
pip install "unstructured[md]"
```

## Create database

Create the Chroma DB.

```python
python create_database.py
```

    - follow commented code if you experience nltk errors

## Query the database

Query the Chroma DB.

```python
python query_data.py "How high does a flagpost need to be?"
```

### Note, you will need OpenAI key for the project to work

# Project Description

This project demonstrates a **Retrieval-Augmented Generation (RAG)** pipeline using **LangChain**, **Chroma**, and **OpenAI's GPT models**. The goal is to process and store textual data from the pdf *Laws-of-the-game-2024-2025* into a vector database and enable efficient retrieval of relevant information for answering user queries. The project showcases how to preprocess documents, split them into manageable chunks, and store them in a vector database for downstream tasks like question answering.

---

### Key Features:
1. **Document Loading**:
   - The project uses the `DirectoryLoader` from `langchain_community.document_loaders` to load `.md` files from the `data/books` directory.
   - The loader processes the *Laws-of-the-game-2024-2025* markdown file, preparing it for further transformations.

2. **Text Splitting**:
   - The `RecursiveCharacterTextSplitter` is used to split the loaded documents into smaller, overlapping chunks.
   - **Parameters**:
     - `chunk_size=215`: Each chunk contains up to 215 characters.
     - `chunk_overlap=50`: Overlapping regions of 50 characters ensure context continuity between chunks.
     - `add_start_index=True`: Metadata includes the starting index of each chunk for traceability.
   - This step ensures that the text is broken into manageable pieces suitable for embedding generation while maintaining semantic coherence.

3. **Vector Database Creation**:
   - The project uses **Chroma**, a high-performance vector database, to store the document embeddings.
   - **Steps**:
     - The `OpenAIEmbeddings` class generates embeddings for each chunk using OpenAI's GPT model.
     - The embeddings, along with metadata, are stored in a Chroma database located in the `chroma` directory.
   - The database is automatically persisted, eliminating the need for manual persistence calls.

4. **Environment Configuration**:
   - The project uses a `.env` file to securely store the OpenAI API key, which is loaded using the `dotenv` library.
   - This ensures that sensitive information is not hardcoded into the script.

5. **Scalability and Token Management**:
   - The script is designed to handle OpenAI's API token limits (40,000 tokens per minute) by carefully managing chunk sizes.
   - This ensures that the pipeline remains efficient and avoids rate-limiting errors.

6. **Extensibility**:
   - The modular design of the code allows for easy extension to other datasets or use cases.
   - By simply replacing the input files in the `data/soccer_referee_rules` directory, the pipeline can process and store new documents.

---

### Workflow:
1. **Document Loading**:
   - The `load_documents()` function reads all `.md` files from the `data/books` directory and returns a list of `Document` objects.

2. **Text Splitting**:
   - The `split_text()` function takes the loaded documents and splits them into smaller chunks using the `RecursiveCharacterTextSplitter`.
   - The function prints the number of input documents and resulting chunks for verification.

3. **Vector Database Creation**:
   - The `save_to_chroma()` function clears any existing Chroma database and creates a new one using the generated chunks.
   - The embeddings are generated using `OpenAIEmbeddings` and stored in the Chroma database.

4. **Execution**:
   - The `main()` function orchestrates the entire process by calling `generate_data_store()`, which sequentially loads documents, splits them, and saves them to the Chroma database.

---

### Technical Highlights:
- **LangChain Integration**:
  - The project leverages LangChain's modular components for document loading, text splitting, and embedding generation.
- **Chroma Database**:
  - Chroma is used as the vector database for efficient storage and retrieval of document embeddings.
- **OpenAI GPT Models**:
  - OpenAI's GPT models are used to generate embeddings, enabling semantic search capabilities.
- **Environment Management**:
  - The use of `dotenv` ensures secure and flexible configuration of API keys.

---

### Use Case:
This project is a foundational implementation of a **RAG pipeline**. It can be extended to:
- Build a question-answering system for any dataset.
- Enable semantic search over large document collections.
- Serve as a backend for chatbots or virtual assistants.

By processing *Laws-of-the-game-2024-2025*, the project demonstrates how to handle real-world text data and prepare it for advanced AI applications.

