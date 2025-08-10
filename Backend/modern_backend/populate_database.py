#!/usr/bin/env python3
"""
Script to populate the modern backend's vector database with soccer rules data.
This script loads the markdown files from the legacy backend and creates embeddings
for the modern backend's Chroma vector database.
"""

import os
import sys
import shutil
from pathlib import Path

# Add the app directory to the Python path
sys.path.append(str(Path(__file__).parent / "app"))

from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from app.core.config import settings
from app.services.vector_service import vector_service

# Paths
LEGACY_DATA_PATH = "../data/soccer_referee_rules/"
CHROMA_PATH = "./chroma_new"

def load_documents():
    """Load markdown documents from the legacy data directory."""
    print(f"Loading documents from {LEGACY_DATA_PATH}...")
    
    if not os.path.exists(LEGACY_DATA_PATH):
        print(f"Error: Data directory not found at {LEGACY_DATA_PATH}")
        print("Please ensure the legacy backend data is available.")
        return []
    
    loader = DirectoryLoader(LEGACY_DATA_PATH, glob="*.md")
    documents = loader.load()
    print(f"Loaded {len(documents)} documents.")
    return documents

def split_text(documents: list[Document]):
    """Split documents into smaller chunks for better retrieval."""
    print("Splitting documents into chunks...")
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=215,
        chunk_overlap=50,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")
    return chunks

def save_to_chroma(chunks: list[Document]):
    """Save chunks to the Chroma vector database."""
    print(f"Saving {len(chunks)} chunks to vector database...")
    
    # Clear out the existing database first
    if os.path.exists(CHROMA_PATH):
        print(f"Removing existing database at {CHROMA_PATH}")
        shutil.rmtree(CHROMA_PATH)
    
    # Create a new database from the documents
    from langchain_community.vectorstores import Chroma
    from langchain_openai import OpenAIEmbeddings
    
    # Initialize embeddings
    embedding_function = OpenAIEmbeddings(api_key=settings.openai_api_key)
    
    try:
        # Create and persist the database
        db = Chroma.from_documents(
            chunks, 
            embedding_function, 
            persist_directory=CHROMA_PATH
        )
        
        print(f"Successfully saved {len(chunks)} chunks to {CHROMA_PATH}")
        return db
    except Exception as e:
        print(f"Error creating Chroma database: {e}")
        # Try alternative approach
        print("Trying alternative approach...")
        db = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_function,
            persist_directory=CHROMA_PATH
        )
        print(f"Successfully saved {len(chunks)} chunks to {CHROMA_PATH} (alternative method)")
        return db

def verify_database():
    """Verify that the database was created successfully."""
    print("Verifying database...")
    
    try:
        # Test the vector service
        test_query = "What is offside?"
        results = vector_service.search_similar_documents(test_query, k=3)
        
        if results:
            print(f"✅ Database verification successful! Found {len(results)} results for test query.")
            print(f"Sample result score: {results[0].score:.3f}")
            return True
        else:
            print("❌ Database verification failed: No results found.")
            return False
            
    except Exception as e:
        print(f"❌ Database verification failed: {e}")
        return False

def main():
    """Main function to populate the database."""
    print("🚀 Starting database population...")
    
    # Check if OpenAI API key is available
    if not settings.openai_api_key:
        print("❌ Error: OPENAI_API_KEY not found in environment variables.")
        print("Please set your OpenAI API key in the .env file or environment.")
        return False
    
    try:
        # Load documents
        documents = load_documents()
        if not documents:
            print("❌ No documents loaded. Exiting.")
            return False
        
        # Split into chunks
        chunks = split_text(documents)
        if not chunks:
            print("❌ No chunks created. Exiting.")
            return False
        
        # Save to Chroma
        db = save_to_chroma(chunks)
        
        # Verify the database
        if verify_database():
            print("✅ Database population completed successfully!")
            return True
        else:
            print("❌ Database verification failed.")
            return False
            
    except Exception as e:
        print(f"❌ Error during database population: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
